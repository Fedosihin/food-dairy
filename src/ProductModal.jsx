// src/ProductModal.jsx
import { products } from "./productsData";

// function ProductModal({ onClose, onSelectProduct, onSelectProduct2 }) {
function ProductModal({ onClose, onSelectProduct2 }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Выберите продукт</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => {
                // onSelectProduct(product, "product");
                onSelectProduct2({...product, type: "food"});
                onClose();
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-thumb"
              />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
