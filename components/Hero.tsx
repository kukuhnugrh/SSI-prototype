import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50 rounded-bl-[100px] hidden lg:block"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Katalog 2024 Telah Hadir
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
            Kenyamanan <span className="text-blue-600">Profesional</span> Dari
            SSI
          </h1>

          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            SSI menyediakan solusi furnitur kantor B2B kelas dunia. Dari kursi
            eksekutif hingga area lounge, kami memastikan tim Anda bekerja
            dengan kenyamanan maksimal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all text-center shadow-xl shadow-slate-200"
            >
              Lihat Koleksi
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all text-center"
            >
              Penawaran Khusus
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div>
              <p className="text-3xl font-bold text-slate-900">500+</p>
              <p className="text-sm text-slate-500">Klien Korporat</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">10k+</p>
              <p className="text-sm text-slate-500">Unit Terpasang</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">10 Thn</p>
              <p className="text-sm text-slate-500">Garansi Produk</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
          <img
            src="https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=1200&q=80"
            alt="Modern Office Chair"
            className="rounded-[40px] shadow-2xl relative z-10 w-full object-cover aspect-[4/5] lg:aspect-auto"
          />
          <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl z-20 shadow-xl flex items-center gap-4">
            <div className="bg-green-500 p-2 rounded-full">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-slate-900">Ergonomic Certified</p>
              <p className="text-sm text-slate-500">
                Standard Internasional BIFMA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
