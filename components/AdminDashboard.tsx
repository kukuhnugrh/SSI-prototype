
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product } from '../types';
import { getStoredProducts, saveProducts } from '../constants';

interface AdminDashboardProps {
  onExit: () => void;
  onUpdate: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit, onUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Password salah! (Hint: admin123)');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = filterCategory === 'Semua' || p.category === filterCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, filterCategory, searchQuery]);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    let updated: Product[];
    if (isAddingNew) {
      updated = [...products, { ...editingProduct, id: Date.now().toString() }];
    } else {
      updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
    }

    setProducts(updated);
    saveProducts(updated);
    setEditingProduct(null);
    setIsAddingNew(false);
    onUpdate();
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
      onUpdate();
    }
  };

  const toggleStock = (id: string, delta: number) => {
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, p.stock + delta) };
      }
      return p;
    });
    setProducts(updated);
    saveProducts(updated);
    onUpdate();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'ImageURL', 'Description'];
    const rows = products.map(p => [
      p.id, 
      `"${p.name}"`, 
      p.category, 
      p.price, 
      p.stock, 
      `"${p.image}"`, 
      `"${p.description.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ssi_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const newProducts: Product[] = [];
      
      for(let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (parts.length >= 7) {
          newProducts.push({
            id: parts[0].replace(/"/g, ''),
            name: parts[1].replace(/"/g, ''),
            category: parts[2].replace(/"/g, '') as any,
            price: parseInt(parts[3]) || 0,
            stock: parseInt(parts[4]) || 0,
            image: parts[5].replace(/"/g, ''),
            description: parts[6].replace(/"/g, ''),
            features: []
          });
        }
      }

      if (newProducts.length > 0) {
        if (window.confirm(`Ditemukan ${newProducts.length} produk. Apakah Anda ingin mengganti database saat ini?`)) {
          setProducts(newProducts);
          saveProducts(newProducts);
          onUpdate();
          alert('Import berhasil!');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 rounded-[32px] p-10 border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-900/20 overflow-hidden p-2">
              <img src="https://cdn-icons-png.flaticon.com/512/1656/1656850.png" alt="SSI Admin" className="w-full h-full object-contain invert" />
            </div>
            <h1 className="text-2xl font-bold text-white">SSI Admin</h1>
            <p className="text-slate-500 text-sm mt-2">Silakan masuk untuk mengelola inventaris.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
              <input 
                autoFocus
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
              Masuk Dashboard
            </button>
            <button type="button" onClick={onExit} className="w-full py-2 text-slate-500 text-sm hover:text-white transition-colors">
              Kembali ke Landing Page
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 hidden lg:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
             <img src="https://cdn-icons-png.flaticon.com/512/1656/1656850.png" alt="SSI" className="w-full h-full object-contain invert" />
          </div>
          <span className="font-black tracking-tighter text-white text-xl">SSI</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl font-medium transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Inventaris
          </button>
        </nav>

        <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">SSI Inventaris</h1>
            <p className="text-slate-500">Update stok dan harga katalog B2B secara real-time.</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <input 
               type="file" 
               accept=".csv" 
               ref={fileInputRef} 
               onChange={handleImportCSV} 
               className="hidden" 
             />
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
               Import CSV
             </button>
             <button 
               onClick={handleExportCSV}
               className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               Export Excel
             </button>
             <button 
               onClick={() => {
                 setIsAddingNew(true);
                 setEditingProduct({
                   id: '',
                   name: '',
                   category: 'Task',
                   price: 0,
                   stock: 0,
                   image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
                   description: '',
                   features: []
                 });
               }}
               className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
             >
               <span>+</span> Tambah Produk
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-2">Total Nilai Inventaris</p>
            <p className="text-2xl font-bold text-slate-900">Rp {totalValue.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-2">Total Unit SKU</p>
            <p className="text-2xl font-bold text-slate-900">{products.reduce((a, b) => a + b.stock, 0)} Units</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-2">Stok Rendah (&lt;10)</p>
              <p className="text-2xl font-bold text-red-600">{lowStockCount} Produk</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
          </div>
        </div>

        {/* Search & Table */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari ID atau nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Executive">Executive</option>
                <option value="Task">Task</option>
                <option value="Lounge">Lounge</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>
            <p className="text-xs text-slate-400 font-medium">Menampilkan {filteredProducts.length} produk</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-4">Produk</th>
                  <th className="px-8 py-4">Kategori</th>
                  <th className="px-8 py-4">Harga</th>
                  <th className="px-8 py-4">Stok</th>
                  <th className="px-8 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={product.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <p className="font-bold text-slate-900">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-600 font-medium text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-medium text-slate-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleStock(product.id, -1)} className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">-</button>
                        <span className={`w-12 text-center font-bold ${product.stock < 10 ? 'text-red-600' : 'text-slate-900'}`}>{product.stock}</span>
                        <button onClick={() => toggleStock(product.id, 1)} className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">+</button>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsAddingNew(false); }}
                          className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Hapus"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-slate-400">
               <p>Tidak ada produk yang sesuai dengan kriteria Anda.</p>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal (Add/Edit) */}
      {editingProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">
                {isAddingNew ? 'Tambah Produk Baru' : `Edit ${editingProduct.name}`}
              </h3>
              <button onClick={() => { setEditingProduct(null); setIsAddingNew(false); }} className="text-slate-400 hover:text-slate-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Produk</label>
                <input 
                  required
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="Contoh: SSI Comfort Plus"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</label>
                <select 
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as any})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                >
                  <option value="Executive">Executive</option>
                  <option value="Task">Task</option>
                  <option value="Lounge">Lounge</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Harga (Rp)</label>
                  <input 
                    required
                    type="number" 
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stok Awal</label>
                  <input 
                    required
                    type="number" 
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">URL Gambar</label>
                <input 
                  required
                  type="url" 
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deskripsi Singkat</label>
                <textarea 
                  required
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 resize-none transition-all text-sm"
                  placeholder="Jelaskan fitur utama produk..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={() => { setEditingProduct(null); setIsAddingNew(false); }} 
                  className="flex-grow py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-grow py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  {isAddingNew ? 'Buat Produk' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
