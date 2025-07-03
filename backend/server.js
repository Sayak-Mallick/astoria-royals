import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import { initDb, openDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting (100 requests per 15 min per IP)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit request body size

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize DB
initDb().then(() => console.log('DB initialized'));

// Helper: Validate lead input
function validateLead(body) {
  const errors = [];
  if (!body.FirstName || typeof body.FirstName !== 'string' || !body.FirstName.trim()) errors.push('FirstName is required.');
  if (!body.MobileNo || !/^\d{10}$/.test(body.MobileNo)) errors.push('Valid 10-digit MobileNo required.');
  if (!body.Email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.Email)) errors.push('Valid Email required.');
  if (!body.Preferences || typeof body.Preferences !== 'string') errors.push('Preferences required.');
  return errors;
}

// POST /api/leads
app.post('/api/leads', async (req, res) => {
  const { FirstName, MobileNo, Email, Preferences, Remark = '' } = req.body;
  const errors = validateLead(req.body);
  if (errors.length) {
    return res.status(400).json({ code: 400, status: 'failed', message: errors.join(' ') });
  }
  try {
    // Store in DB
    const db = await openDb();
    await db.run(
      'INSERT INTO leads (FirstName, MobileNo, Email, Preferences, Remark) VALUES (?, ?, ?, ?, ?)',
      [FirstName, MobileNo, Email, Preferences, Remark]
    );

    // Prepare data for CRM
    const today = new Date().toISOString().slice(0, 10);
    const payload = new URLSearchParams({
      DataFrom: 'T',
      ApiKey: process.env.MDOC_API_KEY,
      EnquiryDate: today,
      Salutation: '',
      FirstName,
      MiddleName: '',
      LastName: '',
      MobileNo,
      Email,
      Preferences,
      Source: 'Digitals',
      SourceDetail: 'WebSite',
      AgeRange: '',
      CurrentLivingPlace: '',
      NativePlace: '',
      Industry: '',
      CompanyName: '',
      Budget: '',
      PossessionReq: '',
      BuyingPurpose: '',
      BookingPlanWithin: '',
      PreferredBankForLoan: '',
      Country: '',
      State: '',
      City: '',
      PinCode: '',
      DOB: '',
      PanNo: '',
      PreferredLocation: '',
      AlternativeMobileNo: '',
      WhatsAppNo: '',
      Remark: Remark || '',
    });

    // Push to CRM
    const crmRes = await axios.post(
      process.env.MDOC_API_URL,
      payload,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 10000 }
    );
    if (crmRes.data && crmRes.data.status === 'success') {
      return res.json({ code: crmRes.data.code, status: crmRes.data.status, message: crmRes.data.message });
    } else {
      return res.status(400).json({ code: crmRes.data?.code || 400, status: 'failed', message: crmRes.data?.message || 'CRM submission failed.' });
    }
  } catch (err) {
    // Only log error message, not stack or sensitive info
    console.error('Lead submission error:', err?.message || err);
    return res.status(500).json({ code: 500, status: 'failed', message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
