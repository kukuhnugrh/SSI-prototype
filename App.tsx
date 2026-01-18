
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductGallery from './components/ProductGallery';
import Process from './components/Process';
import ContactForm from './components/ContactForm';
import AIChatbot from './components/AIChatbot';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ProductListPage from './components/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage';
import { Product } from './types';
import { getStoredProducts } from './constants';

type ViewState = 'landing' | 'admin' | 'product-list' | 'product-detail';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<ViewState>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getStoredProducts());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProductId]);

  const handleProductUpdate = () => {
    setProducts(getStoredProducts());
  };

  const handleViewDetail = (id: string) => {
    setSelectedProductId(id);
    setView('product-detail');
  };

  const handleGoHome = () => {
    setView('landing');
    setSelectedProductId(null);
  };

  const handleGoProducts = () => {
    setView('product-list');
    setSelectedProductId(null);
  };

  if (view === 'admin') {
    return <AdminDashboard onExit={handleGoHome} onUpdate={handleProductUpdate} />;
  }

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar 
        isScrolled={isScrolled} 
        onAdminClick={() => setView('admin')} 
        onHomeClick={handleGoHome}
        onProductsClick={handleGoProducts}
      />
      
      <main className="flex-grow pt-20">
        {view === 'landing' && (
          <>
            <section id="home">
              <Hero />
            </section>
            <section id="features" className="py-20 bg-white">
              <Features />
            </section>
            <section id="products" className="py-20">
              <ProductGallery products={products} onViewDetail={handleViewDetail} />
            </section>
            <section id="process" className="py-20 bg-slate-900 text-white overflow-hidden">
              <Process />
            </section>
            <section id="contact" className="py-20 bg-white">
              <ContactForm />
            </section>
          </>
        )}

        {view === 'product-list' && (
          <ProductListPage products={products} onViewDetail={handleViewDetail} />
        )}

        {view === 'product-detail' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={handleGoProducts} 
            onContact={() => {
              setView('landing');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}
      </main>

      <Footer 
        onAdminClick={() => setView('admin')} 
        onProductsClick={handleGoProducts}
        onHomeClick={handleGoHome}
      />
      
      <AIChatbot />
    </div>
  );
};

export default App;
