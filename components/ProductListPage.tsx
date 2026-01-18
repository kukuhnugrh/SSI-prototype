import React from "react";
import ProductGallery from "./ProductGallery";
import { Product } from "../types";

interface ProductListPageProps {
  products: Product[];
  onViewDetail: (id: string) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({
  products,
  onViewDetail,
}) => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <nav className="flex mb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] gap-3 items-center">
            <span className="hover:text-blue-600 cursor-pointer">Beranda</span>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <span className="text-slate-900">Katalog Produk</span>
          </nav>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Telusuri Solusi <br />
            <span className="text-blue-600">Seating</span> Kami
          </h1>
          <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
            Gunakan filter di bawah untuk menemukan kursi kantor yang paling
            sesuai dengan kebutuhan ergonomi dan estetika ruang kerja Anda.
          </p>
        </div>
      </div>

      <div className="relative">
        <ProductGallery products={products} onViewDetail={onViewDetail} />
      </div>

      <div className="container mx-auto px-6 mt-32">
        <div className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 rounded-l-full blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl font-black mb-6">Pemesanan Skala Besar?</h2>
            <p className="text-slate-400 text-lg mb-10">
              Kami menawarkan skema harga khusus untuk pengadaan kantor, hotel,
              dan ruang komersial lainnya. Hubungi tim B2B kami untuk konsultasi
              gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all text-center"
              >
                Hubungi Sales
              </a>
              <div className="flex items-center gap-4 px-6 py-4 border border-slate-700 rounded-2xl">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span className="font-bold">+62 21 5000 8888</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
