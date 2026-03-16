require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Order = require('./models/Order');

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eva Brown', email: 'eva@example.com', role: 'Viewer', status: 'Active' },
];

const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Other'];
const products = ['Laptop', 'T-Shirt', 'Pizza', 'Novel', 'Headphones', 'Jeans', 'Sushi', 'Textbook', 'Keyboard', 'Jacket'];
const customers = ['John Doe', 'Jane Smith', 'Mike Jones', 'Sarah Brown', 'Tom Davis', 'Lucy Wilson', 'Chris Martin', 'Anna Taylor'];

const generateOrders = (count = 40) => {
  const orders = [];
  for (let i = 1; i <= count; i++) {
    const month = Math.floor(Math.random() * 6) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    orders.push({
      orderId: `ORD-${String(i).padStart(4, '0')}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      product: products[Math.floor(Math.random() * products.length)],
      amount: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      createdAt: new Date(2025, month, day),
    });
  }
  return orders;
};

const seedDB = async () => {
  await connectDB();
  try {
    await User.deleteMany({});
    await Order.deleteMany({});
    await User.insertMany(users);
    await Order.insertMany(generateOrders(40));
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seedDB();
