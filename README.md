# Space-Tech Store 🚀

## Overview
Space-Tech Store is a modern, responsive e-commerce application built with React, focusing on providing an immersive shopping experience for tech enthusiasts.

## 🌟 Features

### Core Functionality
- User Authentication
- Product Browsing
- Cart Management
- Wishlist Management
- Product Recommendations
- Theme Toggling

### Advanced Features
- Responsive Design
- Animated Interactions
- Personalized Recommendations
- Dynamic Theming
- Search and Filter Capabilities

## 🛠 Technology Stack
- **Frontend**: React.js
- **State Management**: React Context API
- **Routing**: React Router
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Styling**: Dynamic Theme System

## 🎨 Theme System
The application features a comprehensive theme system with:
- Dark and Light modes
- Customizable color palette
- Smooth transitions
- Context-based theme management

### Theme Properties
- `background`: Main page background
- `text`: Primary text color
- `primary`: Accent color for buttons and highlights
- `secondary`: Secondary background color
- `accent`: Complementary accent color

## 🔍 Recommendation System
Intelligent product recommendation engine that:
- Generates suggestions based on user interactions
- Considers cart and wishlist history
- Provides fallback to random products
- Dynamically updates recommendations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/space-tech-store.git
cd space-tech-store
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

## 📂 Project Structure
```
src/
├── components/
│   ├── Navbar.js
│   ├── ProductCard.js
│   ├── RecommendationComponent.js
│   └── ...
├── contexts/
│   ├── AuthContext.js
│   ├── CartContext.js
│   ├── ThemeContext.js
│   ├── RecommendationContext.js
│   └── ...
├── pages/
│   ├── HomePage.js
│   ├── ProductDetailsPage.js
│   ├── CartPage.js
│   └── ...
└── data.js
```

## 🌈 Theming
The application uses a context-based theme system allowing:
- Easy theme switching
- Consistent color application
- Custom theme configuration

## 🔮 Future Roadmap
- [ ] User Preferences Persistence
- [ ] Advanced Recommendation Algorithms
- [ ] Social Sharing Features
- [ ] Performance Optimizations
