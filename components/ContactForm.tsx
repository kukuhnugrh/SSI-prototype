
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic for sending email/API would go here
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 text-center py-20 bg-blue-50 rounded-[40px]">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Permintaan Terkirim!</h2>
        <p className="text-slate-600 max-w-md mx-auto">Tim spesialis B2B kami akan menghubungi Anda dalam waktu kurang dari 24 jam kerja.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-blue-600 font-bold hover:underline"
        >
          Kirim permintaan lain
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto bg-slate-50 rounded-[40px] overflow-hidden shadow-xl border border-slate-100">
        <div className="grid lg:grid-cols-2">
          <div className="p-12 lg:p-20 bg-slate-900 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">Konsultasi Gratis Sekarang</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Butuh bantuan memilih model kursi yang tepat untuk kantor baru Anda? Konsultan kami siap membantu merancang ruang kerja impian Anda.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span>b2b@sedeopro.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <span>+62 (21) 5000-8888</span>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-800 mt-12">
              <p className="text-sm text-slate-500 italic">"Kursi yang tepat adalah investasi untuk kesehatan dan produktivitas karyawan Anda."</p>
            </div>
          </div>

          <div className="p-12 lg:p-20 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Bisnis</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="john@perusahaan.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nama Perusahaan</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="PT. Sukses Selamanya" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Perkiraan Jumlah Unit</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all bg-white">
                  <option>10 - 50 Unit</option>
                  <option>51 - 200 Unit</option>
                  <option>201 - 500 Unit</option>
                  <option>Diatas 500 Unit</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Pesan Tambahan</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none" placeholder="Ceritakan kebutuhan spesifik Anda..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
                Dapatkan Penawaran
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
