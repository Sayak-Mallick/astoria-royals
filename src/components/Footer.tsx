const Footer = () => {
  return (
    <footer className="bg-[#231f20] text-white py-8 px-4 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left: Logos */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src="/logo.png" alt="Astoria Royals" className="h-12 md:h-16" />
        </div>

        {/* Center: Addresses */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 text-xs md:text-sm">
          <div>
            <span className="font-semibold text-sm md:text-base">SITE ADDRESS</span><br />
            Astoria Royals, Aundh-Ravet BRTS Road, Ravet, Pimpri-Chinchwad,<br />
            Maharashtra - 412101
          </div>
          <div className="mt-4">
            <span className="font-semibold text-sm md:text-base">CORPORATE OFFICE</span><br />
            Amar Business Zone, B Wing, Office No. 902 S. No. 87/1A & 87 (Part),<br />
            Baner, Pune - 411045
          </div>
        </div>

        {/* Right: Contact, QR, Social */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl">📞</span>
            <span className="text-base md:text-lg tracking-widest font-semibold">00000 00000</span>
          </div>

          <div className="flex gap-2">
            <img src="/rera.png" alt="RERA QR" className="h-12 md:h-16" />
            <img src="/rera.png" alt="RERA QR" className="h-12 md:h-16" />
          </div>

          <span className="text-xs text-center">MAHA RERA NO. | P52100049229, P52100049230</span>

          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram text-xl md:text-2xl"></i></a>
            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube text-xl md:text-2xl"></i></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook text-xl md:text-2xl"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin text-xl md:text-2xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
