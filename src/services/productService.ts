
import { Product } from "@/types/product";

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    description: "Track your fitness, receive notifications, and more with this feature-packed smartwatch.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 79.99,
    description: "Water-resistant backpack with multiple compartments and laptop protection.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 4,
    name: "Wireless Charger",
    price: 39.99,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    imageUrl: "https://images.unsplash.com/photo-1616410011236-7a42121dd981?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 5,
    name: "Portable Speaker",
    price: 129.99,
    description: "Waterproof Bluetooth speaker with 360° sound and 20-hour battery life.",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 6,
    name: "Coffee Maker",
    price: 89.99,
    description: "Programmable coffee maker with thermal carafe and auto-brew function.",
    imageUrl: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 7,
    name: "Camera Drone",
    price: 599.99,
    description: "4K camera drone with GPS, follow-me mode, and 30-minute flight time.",
    imageUrl: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&h=800",
  },
  {
    id: 8,
    name: "Gaming Mouse",
    price: 69.99,
    description: "High-precision gaming mouse with RGB lighting and programmable buttons.",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&h=800",
  },
];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};
