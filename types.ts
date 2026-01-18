
export interface Product {
  id: string;
  name: string;
  category: 'Executive' | 'Task' | 'Lounge' | 'Meeting';
  price: number;
  stock: number;
  image: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
