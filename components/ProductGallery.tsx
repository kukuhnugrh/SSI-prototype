import React, { useState, useMemo } from "react";
import { Product } from "../types";

const CATEGORIES = ["Semua", "Executive", "Task", "Lounge", "Meeting"];

interface ProductGalleryProps {
  products: Product[];
  onViewDetail: (id: string) => void;
  hideFilters?: boolean;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  onViewDetail,
  hideFilters = false,
}) => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "Semua" || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="container mx-auto">
      {!hideFilters && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Cari kursi idaman Anda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-lg"
            />
            <svg
              className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onViewDetail(product.id)}
              className="group cursor-pointer bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                    {product.category}
                  </span>
                </div>
                {product.stock <= 5 && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse shadow-sm">
                      Stok Terbatas
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Mulai dari
                    </p>
                    <p className="text-xl font-black text-slate-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${product.stock > 0 ? "bg-slate-50 text-slate-900 group-hover:bg-blue-600 group-hover:text-white" : "bg-slate-100 text-slate-300"}`}
                  >
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <svg
              className="w-10 h-10 text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Tidak ditemukan hasil
          </h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("Semua");
            }}
            className="mt-8 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
