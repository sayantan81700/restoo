# Restoo - Food Delivery Platform

A comprehensive full-stack food delivery application built with React.js, Node.js, Express.js, MongoDB, and modern web technologies.

## 🚀 Features

### Customer Features

- **User Authentication**: Register, login, password reset, email verification
- **Restaurant Discovery**: Browse restaurants by cuisine, location, and ratings
- **Menu Management**: View restaurant menus with categories and filtering
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Place orders, track delivery, view order history
- **Reviews & Ratings**: Rate restaurants and menu items
- **Profile Management**: Update personal information and preferences

### Restaurant Owner Features

- **Dashboard**: Overview of orders, revenue, and performance metrics
- **Menu Management**: Add, edit, and manage menu items with categories
- **Order Management**: Accept, reject, and update order status
- **Restaurant Settings**: Update restaurant information and preferences
- **Analytics**: View sales reports and customer insights

### Delivery Partner Features

- **Order Management**: Accept and manage delivery orders
- **Route Optimization**: Efficient delivery route planning
- **Earnings Tracking**: Monitor delivery earnings and performance
- **Profile Management**: Update delivery partner information

### Admin Features

- **User Management**: Manage all platform users
- **Restaurant Management**: Approve, suspend, and manage restaurants
- **Order Monitoring**: Oversee all platform orders
- **Platform Settings**: Configure platform-wide settings
- **Analytics**: Comprehensive platform analytics and reporting

## 🛠️ Tech Stack

### Frontend

- **React.js** - User interface framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **React Query** - Server state management
- **React Toastify** - Toast notifications
- **Axios** - HTTP client

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Cloudinary** - Image upload and management
- **Stripe** - Payment processing

### Development Tools

- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
restoo/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   ├── store/          # Redux store and slices
│   │   ├── services/       # API services
│   │   └── assets/         # Static assets
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/           # Configuration files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd restoo
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both backend and frontend directories:

   **Backend (.env)**

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/restoo
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

   **Frontend (.env)**

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

5. **Start the development servers**

   **Backend**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:token` - Reset password
- `GET /api/auth/verify/:token` - Verify email

### Restaurant Endpoints

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create restaurant (admin/owner)
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

### Menu Item Endpoints

- `GET /api/restaurants/:id/menu` - Get restaurant menu
- `POST /api/menu-items` - Create menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

### Order Endpoints

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication with role-based access control:

- **user**: Regular customers
- **restaurant_owner**: Restaurant owners
- **delivery_partner**: Delivery partners
- **admin**: Platform administrators

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Dark/Light Mode**: Theme switching capability
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback
- **Form Validation**: Client-side and server-side validation

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Email: support@restoo.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## 🔮 Future Enhancements

- Real-time order tracking with WebSockets
- Push notifications
- Advanced analytics and reporting
- Multi-language support
- Mobile app development
- AI-powered recommendations
- Loyalty program integration
