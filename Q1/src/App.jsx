import React from 'react';
import UserProfileCard from './components/UserProfileCard';
import ProductItemCard from './components/ProductItemCard';

export default function App() {
  return (
    <div className="pb-5">
      {/* Header Navbar */}
      <header className="app-header shadow-sm mb-5 py-3 sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-code-slash fs-5"></i>
            </div>
            <h4 className="fw-bold m-0 text-dark">Q1: CDN React Components</h4>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold text-dark mb-2">React CDN Components</h2>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Card 1 */}
          <div className="col-md-6 col-lg-5">
            <h5 className="text-muted fw-semibold mb-3"><i className="bi bi-1-circle-fill text-primary me-2"></i>UserProfileCard Component</h5>
            <UserProfileCard 
              name="Sarthak Shah"
              role="Full Stack Developer Student"
              bio="Passionate about crafting clean user interfaces, modern frontend tech stacks, and building scalable full-stack applications."
              initialFollowers={1250}
            />
          </div>

          {/* Card 2 */}
          <div className="col-md-6 col-lg-5">
            <h5 className="text-muted fw-semibold mb-3"><i className="bi bi-2-circle-fill text-primary me-2"></i>ProductItemCard Component</h5>
            <ProductItemCard 
              title="Wireless Ergonomic Mouse"
              description="An ergonomic layout designed to reduce strain during extended programming or gaming sessions. Multi-device Bluetooth pairing and 40-day rechargeable battery life."
              price={49.99}
              imageUrl="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400"
              rating={4.8}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
