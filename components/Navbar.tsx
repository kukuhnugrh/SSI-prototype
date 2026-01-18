import React from "react";
import logo from "../resources/images/logo-transparan-putih.png";

interface NavbarProps {
  isScrolled: boolean;
  onAdminClick: () => void;
  onHomeClick: () => void;
  onKatalogClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  onAdminClick,
  onHomeClick,
  onKatalogClick,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass py-3 shadow-sm border-b border-slate-200/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={logo}
              alt="SSI Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className={`text-2xl font-black tracking-tighter text-slate-900`}
          >
            SSI
          </span>
        </button>

        <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={onHomeClick}
            className="hover:text-blue-600 transition-colors hidden sm:block"
          >
            Beranda
          </button>
          <button
            onClick={onKatalogClick}
            className="hover:text-blue-600 transition-colors font-bold text-slate-900"
          >
            Katalog
          </button>
          <button
            onClick={onAdminClick}
            className="text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 border border-slate-200 rounded-lg hidden md:block"
          >
            Admin
          </button>
          <a
            href="#contact"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 text-xs font-bold uppercase tracking-wider"
          >
            Kontak
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
