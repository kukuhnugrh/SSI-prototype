import React from "react";

interface FooterProps {
  onAdminClick?: () => void;
  onHomeClick?: () => void;
  onKatalogClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onAdminClick,
  onHomeClick,
  onKatalogClick,
}) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8 col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1656/1656850.png"
                  alt="SSI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                SSI
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Penyedia solusi furnitur kantor B2B terpercaya di Indonesia.
              Menghadirkan kenyamanan ergonomis untuk setiap profesional.
            </p>
          </div>

          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.2em]">
              Navigasi Utama
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <button
                  onClick={onHomeClick}
                  className="hover:text-blue-600 transition-colors"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={onKatalogClick}
                  className="hover:text-blue-600 transition-colors"
                >
                  Katalog Produk
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Kontak Bisnis
                </a>
              </li>
              <li>
                <button
                  onClick={onAdminClick}
                  className="hover:text-blue-600 transition-colors"
                >
                  Dashboard Admin
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.2em]">
              Hubungi Kami
            </h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <span>b2b@ssiseating.id</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <span>+62 (21) 5000-8888</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase text-[10px] tracking-[0.2em]">
              Berlangganan
            </h4>
            <p className="text-sm text-slate-500 mb-6">
              Dapatkan penawaran eksklusif dan update katalog terbaru.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Alamat Email"
                className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all shadow-md">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2024 SSI SEATING. PREMIUM SOLUTIONS FOR MODERN WORKSPACES.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privasi
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Syarat
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
