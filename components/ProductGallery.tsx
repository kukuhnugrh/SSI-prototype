
import React, { useState, useMemo } from 'react';
import { Product } from '../types';

const CATEGORIES = ['Semua', 'Executive', 'Task', 'Lounge', 'Meeting'];

interface ProductGalleryProps {
  products: Product[];
  onViewDetail: (id: string) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products, onViewDetail }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Koleksi Kursi Kantor</h2>
          <p className="text-slate-600 mb-6">Pilih dari berbagai kategori yang sesuai dengan kebutuhan ruang Anda.</p>
          
          <div className="relative w-full max-w-md">
            <input 
              type="text"
              placeholder="Cari kursi (e.g. Ergonomic, Executive)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => onViewDetail(product.id)}
              className="group cursor-pointer bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-blue-600 flex items-center gap-1">
                  {product.category}
                  {product.stock <= 5 && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-1"></span>}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 0 ? `${product.stock} Tersedia` : 'Stok Habis'}
                   </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Mulai dari</p>
                    <p className="text-lg font-bold text-blue-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl transition-colors ${product.stock > 0 ? 'bg-slate-900 text-white group-hover:bg-blue-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak ditemukan hasil</h3>
          <p className="text-slate-500">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
