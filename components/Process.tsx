
import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Konsultasi & Kebutuhan',
    desc: 'Tim kami menganalisis ruang dan kebutuhan spesifik perusahaan Anda.'
  },
  {
    num: '02',
    title: 'Penawaran Khusus',
    desc: 'Kami berikan skema harga terbaik untuk volume pemesanan bisnis.'
  },
  {
    num: '03',
    title: 'Produksi & Branding',
    desc: 'Produksi massal dengan kontrol kualitas ketat dan custom branding.'
  },
  {
    num: '04',
    title: 'Instalasi & Delivery',
    desc: 'Tim ahli kami memasang semua unit di lokasi Anda dengan rapi.'
  }
];

const Process: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-blue-400 font-bold mb-4">Bagaimana Kami Bekerja</h2>
          <h3 className="text-4xl font-bold mb-8">Proses Pembelian B2B yang Efisien dan Terukur</h3>
          <p className="text-slate-400 text-lg mb-12">
            Kami menyederhanakan pengadaan furnitur kantor Anda sehingga Anda bisa fokus pada pertumbuhan bisnis.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="space-y-4">
                <div className="text-5xl font-black text-white/10">{step.num}</div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-blue-600/20 rounded-[40px] blur-2xl"></div>
          <div className="relative bg-slate-800 p-8 rounded-[40px] border border-slate-700 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-auto text-xs text-slate-500 font-mono">B2B_PROJECT_TRACKER.JSON</div>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div className="flex-grow">
                    <div className="h-2 w-24 bg-slate-700 rounded mb-2"></div>
                    <div className="h-1.5 w-40 bg-slate-800 rounded"></div>
                  </div>
                  <div className="text-xs text-blue-400 font-bold">100%</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-600 rounded-2xl text-center">
              <p className="font-bold mb-2">Siap Mulai Proyek Anda?</p>
              <button className="px-6 py-2 bg-white text-blue-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                Minta Demo Produk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
