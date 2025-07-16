// Mock data for orders and reviews
export const MOCK_ORDERS = {
  'ORD12345': {
    id: 'ORD12345',
    orderNumber: 'THR001234567',
    status: 'Delivered',
    date: '2024-06-01',
    deliveryDate: '2024-06-05',
    estimatedDelivery: '2024-06-05',
    trackingNumber: 'TRK789456123',
    paymentMethod: 'Credit Card',
    paymentId: 'pay_abc123xyz',
    items: [
      { 
        id: '1',
        name: 'Essential Black Tee', 
        qty: 1, 
        price: 1299,
        color: 'Black',
        size: 'M',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'
      },
      { 
        id: '2',
        name: 'Minimalist White', 
        qty: 2, 
        price: 1099,
        color: 'White',
        size: 'L',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'
      },
    ],
    total: 3497,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-06-01 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-06-01 10:31 AM', completed: true },
      { status: 'Order Processing', date: '2024-06-01 2:15 PM', completed: true },
      { status: 'Shipped', date: '2024-06-02 9:00 AM', completed: true },
      { status: 'Out for Delivery', date: '2024-06-05 8:30 AM', completed: true },
      { status: 'Delivered', date: '2024-06-05 3:45 PM', completed: true }
    ]
  },
  'ORD12346': {
    id: 'ORD12346',
    orderNumber: 'THR001234568',
    status: 'Shipped',
    date: '2024-06-10',
    estimatedDelivery: '2024-06-15',
    trackingNumber: 'TRK789456124',
    paymentMethod: 'UPI',
    paymentId: 'pay_def456uvw',
    items: [
      { 
        id: '3',
        name: 'Geometric Print', 
        qty: 1, 
        price: 1499,
        color: 'Black',
        size: 'L',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
      },
    ],
    total: 1499,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-06-10 2:15 PM', completed: true },
      { status: 'Payment Confirmed', date: '2024-06-10 2:16 PM', completed: true },
      { status: 'Order Processing', date: '2024-06-10 5:30 PM', completed: true },
      { status: 'Shipped', date: '2024-06-11 11:00 AM', completed: true },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  'ORD12347': {
    id: 'ORD12347',
    orderNumber: 'THR001234569',
    status: 'Processing',
    date: '2024-06-15',
    estimatedDelivery: '2024-06-20',
    trackingNumber: 'TRK789456125',
    paymentMethod: 'Digital Wallet',
    paymentId: 'pay_ghi789rst',
    items: [
      { 
        id: '4',
        name: 'Vintage Fade', 
        qty: 1, 
        price: 1699,
        color: 'Faded Black',
        size: 'L',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'
      },
      { 
        id: '5',
        name: 'Urban Oversized', 
        qty: 1, 
        price: 1899,
        color: 'Black',
        size: 'XL',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'
      },
    ],
    total: 3598,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-06-15 11:20 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-06-15 11:21 AM', completed: true },
      { status: 'Order Processing', date: '2024-06-15 2:45 PM', completed: true },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  }
};

export const DUMMY_ORDERS = [
  {
    id: 'ORD12345',
    orderNumber: 'THR001234567',
    status: 'Delivered',
    date: '2024-06-01',
    items: [
      { name: 'Essential Black Tee', qty: 1, price: 1299, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Minimalist White', qty: 2, price: 1099, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80' },
    ],
    total: 3497,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD12346',
    orderNumber: 'THR001234568',
    status: 'Shipped',
    date: '2024-06-10',
    items: [
      { name: 'Geometric Print', qty: 1, price: 1499, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
    ],
    total: 1499,
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD12347',
    orderNumber: 'THR001234569',
    status: 'Processing',
    date: '2024-06-15',
    items: [
      { name: 'Vintage Fade', qty: 1, price: 1699, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Urban Oversized', qty: 1, price: 1899, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80' },
    ],
    total: 3598,
    paymentMethod: 'Digital Wallet'
  },
];

export const MOCK_REVIEWS = {
  '1': [
    {
      id: 1,
      user: 'Rahul S.',
      rating: 5,
      date: '2024-05-15',
      review: 'Excellent quality! The fabric is soft and the fit is perfect. Highly recommended.',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: 'Priya M.',
      rating: 4,
      date: '2024-05-10',
      review: 'Good quality t-shirt. The black color is rich and doesn\'t fade after washing.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: 'Amit K.',
      rating: 5,
      date: '2024-05-05',
      review: 'Perfect for daily wear. Comfortable and stylish. Will definitely buy more.',
      verified: false,
      helpful: 15
    },
    {
      id: 4,
      user: 'Sneha R.',
      rating: 4,
      date: '2024-04-28',
      review: 'Great fit and comfortable fabric. The size chart was accurate.',
      verified: true,
      helpful: 6
    }
  ],
  '2': [
    {
      id: 5,
      user: 'Sneha R.',
      rating: 5,
      date: '2024-05-12',
      review: 'Love the minimalist design! Fits true to size and the quality is outstanding.',
      verified: true,
      helpful: 10
    },
    {
      id: 6,
      user: 'Karan P.',
      rating: 5,
      date: '2024-05-08',
      review: 'Perfect white tee! No transparency issues and maintains shape after multiple washes.',
      verified: true,
      helpful: 14
    }
  ],
  '3': [
    {
      id: 7,
      user: 'Arjun M.',
      rating: 4,
      date: '2024-05-20',
      review: 'Cool geometric design. Print quality is excellent and doesn\'t crack.',
      verified: true,
      helpful: 9
    }
  ],
  '4': [
    {
      id: 8,
      user: 'Vikram S.',
      rating: 5,
      date: '2024-05-18',
      review: 'Love the vintage look! Feels authentic and the fade is perfectly done.',
      verified: true,
      helpful: 11
    }
  ],
  '5': [
    {
      id: 9,
      user: 'Rohan K.',
      rating: 4,
      date: '2024-05-22',
      review: 'Great oversized fit. Perfect for layering and very comfortable.',
      verified: true,
      helpful: 7
    }
  ],
  '6': [
    {
      id: 10,
      user: 'Ananya D.',
      rating: 5,
      date: '2024-05-25',
      review: 'Love the pocket detail! Quality is top-notch and fits perfectly.',
      verified: true,
      helpful: 8
    }
  ]
};

export const SIZE_GUIDE = {
  measurements: {
    'XS': { chest: '34-36', length: '26', shoulder: '16', sleeve: '8' },
    'S': { chest: '36-38', length: '27', shoulder: '17', sleeve: '8.5' },
    'M': { chest: '38-40', length: '28', shoulder: '18', sleeve: '9' },
    'L': { chest: '40-42', length: '29', shoulder: '19', sleeve: '9.5' },
    'XL': { chest: '42-44', length: '30', shoulder: '20', sleeve: '10' },
    'XXL': { chest: '44-46', length: '31', shoulder: '21', sleeve: '10.5' }
  },
  fitGuide: [
    { size: 'XS', description: 'Extra Small - Slim fit for petite frames' },
    { size: 'S', description: 'Small - Regular fit for smaller builds' },
    { size: 'M', description: 'Medium - Standard fit for average builds' },
    { size: 'L', description: 'Large - Comfortable fit for larger builds' },
    { size: 'XL', description: 'Extra Large - Relaxed fit for bigger frames' },
    { size: 'XXL', description: 'Double XL - Loose fit for maximum comfort' }
  ]
};