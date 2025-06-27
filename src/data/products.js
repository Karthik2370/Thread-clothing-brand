export const products = [
  {
    id: '1',
    name: 'Essential Black Tee',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    category: 'basics',
    colors: ['black', 'white', 'gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Premium cotton blend t-shirt with a perfect fit. Soft, breathable, and built to last.',
    featured: true
  },
  {
    id: '2',
    name: 'Minimalist White',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
    category: 'basics',
    colors: ['white', 'cream', 'light-gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Clean lines meet premium comfort. A wardrobe essential that never goes out of style.',
    featured: true
  },
  {
    id: '3',
    name: 'Geometric Print',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    category: 'graphic',
    colors: ['black', 'navy', 'charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Modern geometric patterns that make a statement. Art meets fashion.',
    featured: false
  },
  {
    id: '4',
    name: 'Vintage Fade',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    category: 'vintage',
    colors: ['faded-black', 'vintage-blue', 'rust'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Perfectly worn-in feel with authentic vintage styling. Comfort with character.',
    featured: true
  },
  {
    id: '5',
    name: 'Urban Oversized',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    category: 'oversized',
    colors: ['black', 'white', 'sage'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Relaxed fit with street-style edge. Perfect for layering or wearing solo.',
    featured: false
  },
  {
    id: '6',
    name: 'Pocket Essential',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
    category: 'basics',
    colors: ['navy', 'forest', 'burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Classic pocket tee with refined details. Functional meets fashionable.',
    featured: false
  }
];

export const categories = [
  { id: 'all', name: 'All', count: products.length },
  { id: 'basics', name: 'Basics', count: products.filter(p => p.category === 'basics').length },
  { id: 'graphic', name: 'Graphic', count: products.filter(p => p.category === 'graphic').length },
  { id: 'vintage', name: 'Vintage', count: products.filter(p => p.category === 'vintage').length },
  { id: 'oversized', name: 'Oversized', count: products.filter(p => p.category === 'oversized').length }
];