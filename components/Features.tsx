
import React from 'react';

const FEATURES = [
  {
    title: 'Harga Grosir',
    description: 'Skema harga kompetitif yang disesuaikan dengan volume pemesanan bisnis Anda.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    )
  },
  {
    title: 'Custom Branding',
    description: 'Tambahkan logo perusahaan atau pilih warna kain yang sesuai dengan brand identity.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
    )
  },
  {
    title: 'Pengiriman Cepat',
    description: 'Logistik terintegrasi untuk memastikan furnitur sampai tepat waktu di lokasi proyek.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    )
  },
  {
    title: 'Layanan Purna Jual',
    description: 'Dukungan teknis dan perawatan rutin untuk menjaga investasi aset kantor Anda.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
    )
  }
];

const Features: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4">Kenapa Sedeo Pro?</h2>
        <p className="text-4xl font-bold text-slate-900 mb-6">Partner Terpercaya untuk Kebutuhan Office Seating</p>
        <p className="text-slate-600">Kami memahami bahwa setiap bisnis memiliki kebutuhan unik. Berikut adalah alasan mengapa ratusan perusahaan memilih kami.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="p-8 rounded-3xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
