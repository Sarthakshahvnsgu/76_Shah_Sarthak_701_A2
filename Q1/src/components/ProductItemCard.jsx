import React, { useState } from 'react';

export default function ProductItemCard({ title, description, price, imageUrl, rating }) {
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    setCartMessage(`Added ${quantity} item(s) to cart!`);
    setTimeout(() => {
      setCartMessage('');
    }, 3000);
  };

  return (
    <div className="card card-custom h-100 d-flex flex-column">
      <img src={imageUrl} alt={title} className="product-img card-img-top" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-warning text-dark fw-bold">
            <i className="bi bi-star-fill me-1"></i> {rating}
          </span>
          <span className="text-primary fw-bold fs-5">${price}</span>
        </div>
        <h5 className="card-title fw-bold text-dark mb-2">{title}</h5>
        <p className="card-text text-secondary small mb-4" style={{ flexGrow: 1 }}>{description}</p>
        
        {cartMessage && (
          <div className="alert alert-success py-2 px-3 small border-0 rounded-3 mb-3 text-center transition-all animate__animated animate__fadeIn">
            <i className="bi bi-cart-check-fill me-1"></i> {cartMessage}
          </div>
        )}

        <div className="d-flex align-items-center justify-content-between mb-3 bg-light p-2 rounded-3">
          <span className="small text-muted fw-medium">Quantity:</span>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary rounded-circle px-2 py-0 border-0 fs-4" onClick={decrementQuantity}>-</button>
            <span className="fw-bold px-2">{quantity}</span>
            <button className="btn btn-sm btn-outline-secondary rounded-circle px-2 py-0 border-0 fs-4" onClick={incrementQuantity}>+</button>
          </div>
        </div>

        <button className="btn btn-dark w-100 rounded-pill fw-semibold" onClick={handleAddToCart}>
          <i className="bi bi-bag-plus me-1"></i> Add to Cart
        </button>
      </div>
    </div>
  );
}
