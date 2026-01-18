
import React from 'react';
import ProductGallery from './ProductGallery';
import { Product } from '../types';

interface ProductListPageProps {
  products: Product[];
  onViewDetail: (id: string) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ products, onViewDetail }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 mb-12 py-16">
        <div className="container mx-auto px-6">
          <nav className="flex mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest gap-2">
            <span className="hover:text-blue-600 cursor-pointer">Beranda</span>
            <span>/</span>
            <span className="text-slate-900">Katalog Produk</span>
          </nav>
          <h1 className="text-5xl font-black text-slate-900">Produk <span className="text-blue-600">Terbaik</span> SSI</h1>
        </div>
      </div>
      
      <ProductGallery products={products} onViewDetail={onViewDetail} />
    </div>
  );
};

export default ProductListPage;
