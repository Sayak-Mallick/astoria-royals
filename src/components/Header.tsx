type HeaderProps = {
  onScheduleClick?: () => void;
};

const Header = ({ onScheduleClick }: HeaderProps) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/banner.png"
        alt="Banner"
        className="w-full h-full object-cover"
      />
      {/* Transparent Navbar */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-10">
        <img src="/logo.png" alt="Logo" className="h-12" />
        <button
          className="px-6 py-2 border-2 border-gray-400 border-solid bg-transparent text-white font-semibold hover:bg-white/10 transition capitalize"
          onClick={onScheduleClick}
        >
          Schedule A Site Visit
        </button>
      </nav>
    </div>
  );
};

export default Header
