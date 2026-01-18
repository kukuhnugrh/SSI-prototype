import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGallery from "./components/ProductGallery";
import ContactForm from "./components/ContactForm";
import AIChatbot from "./components/AIChatbot";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import ProductDetailPage from "./components/ProductDetailPage";
import ProductListPage from "./components/ProductListPage";
import { Product } from "./types";
import { getStoredProducts } from "./constants";

type ViewState = "landing" | "katalog" | "admin" | "detail";

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<ViewState>("landing");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getStoredProducts());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProductId]);

  const handleProductUpdate = () => {
    setProducts(getStoredProducts());
  };

  const handleViewDetail = (id: string) => {
    setSelectedProductId(id);
    setView("detail");
  };

  const handleGoHome = () => {
    setView("landing");
    setSelectedProductId(null);
  };

  const handleGoKatalog = () => {
    setView("katalog");
    setSelectedProductId(null);
  };

  if (view === "admin") {
    return (
      <AdminDashboard onExit={handleGoHome} onUpdate={handleProductUpdate} />
    );
  }

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <Navbar
        isScrolled={isScrolled}
        onAdminClick={() => setView("admin")}
        onHomeClick={handleGoHome}
        onKatalogClick={handleGoKatalog}
      />

      <main className="flex-grow">
        {view === "landing" && (
          <>
            <section id="home">
              <Hero />
            </section>
            <section className="py-24 bg-slate-50">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Koleksi Unggulan Kami
                </h2>
                <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
                  Lihat beberapa pilihan terbaik untuk ruang kerja Anda atau
                  telusuri seluruh katalog kami.
                </p>
                <ProductGallery
                  products={products.slice(0, 4)}
                  onViewDetail={handleViewDetail}
                  hideFilters
                />
                <button
                  onClick={handleGoKatalog}
                  className="mt-12 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                  Lihat Seluruh Katalog
                </button>
              </div>
            </section>
            <section id="contact" className="py-24 bg-white">
              <ContactForm />
            </section>
          </>
        )}

        {view === "katalog" && (
          <ProductListPage
            products={products}
            onViewDetail={handleViewDetail}
          />
        )}

        {view === "detail" && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleGoKatalog}
            onContact={() => {
              setView("landing");
              setTimeout(() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />
        )}
      </main>

      <Footer
        onAdminClick={() => setView("admin")}
        onHomeClick={handleGoHome}
        onKatalogClick={handleGoKatalog}
      />

      <AIChatbot />
    </div>
  );
};

export default App;
