
import { Product, Testimonial } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sedeo Apex Ergonomic',
    category: 'Executive',
    price: 4500000,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80',
    description: 'Kursi eksekutif premium dengan dukungan lumbal dinamis.',
    features: ['4D Armrest', 'Italian Leather', 'Seat Slide', 'Synchro Tilt']
  },
  {
    id: '2',
    name: 'TaskMaster Pro V2',
    category: 'Task',
    price: 2800000,
    stock: 142,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
    description: 'Workhorse untuk produktivitas tim dengan mesh breathable.',
    features: ['High-density Mesh', 'Adjustable Headrest', 'Silent Casters']
  },
  {
    id: '3',
    name: 'Cloud Lounge Chair',
    category: 'Lounge',
    price: 3200000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    description: 'Sempurna untuk area kolaborasi dan ruang santai kantor.',
    features: ['Soft Velvet', 'Minimalist Design', 'Stable Wood Base']
  },
  {
    id: '4',
    name: 'Venue Meeting Series',
    category: 'Meeting',
    price: 1950000,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80',
    description: 'Didesain untuk kenyamanan rapat berdurasi panjang.',
    features: ['Stackable', 'Sleek Profile', 'Easy Maintenance']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    company: 'TechVision ID',
    role: 'Procurement Manager',
    content: 'Sedeo Pro membantu kami menyuplai 200 kursi dalam waktu kurang dari 2 minggu. Kualitasnya luar biasa.',
    avatar: 'https://i.pravatar.cc/150?u=budi'
  },
  {
    id: '2',
    name: 'Siska Amelia',
    company: 'Studio Arsitek 8',
    role: 'Principal Designer',
    content: 'Desainnya sangat modern dan masuk ke berbagai konsep kantor. Sangat direkomendasikan untuk klien korporat.',
    avatar: 'https://i.pravatar.cc/150?u=siska'
  }
];

// Helper to get products from local storage or use defaults
export const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem('sedeo_products');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('sedeo_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('sedeo_products', JSON.stringify(products));
};
