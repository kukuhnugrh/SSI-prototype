
import React from 'react';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onContact: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onContact }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-6 py-8">
        <nav className="flex mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest gap-2">
          <button onClick={onBack} className="hover:text-blue-600">Produk</button>
          <span>/</span>
          <span className="text-slate-400">{product.category}</span>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[40px] overflow-hidden border border-slate-100 shadow-xl bg-slate-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-blue-600 transition-colors opacity-50 hover:opacity-100">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                {product.category} Seating
              </span>
              <h1 className="text-5xl font-black text-slate-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-blue-600">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <div className={`px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 ${
                  product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {product.stock > 0 ? `Ready Stock: ${product.stock} Unit` : 'Out of Stock'}
                </div>
              </div>
            </div>

            <div className="prose prose-slate">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Deskripsi Produk</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description} Kursi {product.name} dirancang khusus untuk memenuhi standar ergonomi internasional. Material premium memastikan kenyamanan luar biasa bahkan saat digunakan lebih dari 8 jam sehari.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Fitur Utama</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={onContact}
                className="flex-grow px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Pesan Sekarang
              </button>
              <button 
                onClick={onBack}
                className="px-8 py-5 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Kembali ke Katalog
              </button>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <p className="font-bold text-lg">Garansi 10 Tahun</p>
                <p className="text-slate-400 text-sm">SSI menjamin kualitas struktur dan mekanisme mekanis setiap produk kami.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
