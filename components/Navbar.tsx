import React from "react";

interface NavbarProps {
  isScrolled: boolean;
  onAdminClick: () => void;
  onHomeClick: () => void;
  onProductsClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  onAdminClick,
  onHomeClick,
  onProductsClick,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass py-4 shadow-sm border-b border-slate-200/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src="../resources/logo-transparan-putih.png"
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

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={onHomeClick}
            className="hover:text-blue-600 transition-colors"
          >
            Beranda
          </button>
          <button
            onClick={onProductsClick}
            className="hover:text-blue-600 transition-colors"
          >
            Produk
          </button>
          <button
            onClick={onAdminClick}
            className="text-slate-500 hover:text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 border border-slate-200 rounded-md"
          >
            Admin
          </button>
          <a
            href="#contact"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
