import { useState } from "react";

// function ProductModal({ onClose, onSelectProduct, onSelectProduct2 }) {
function NewProductModal({
  productsLocal = [],
  productsServer = [],
  onAddProductInLocalList,
  onClose,
  onSelectProduct2,
}) {
  const [name, setName] = useState("");
  // useEffect(()=>{setName(name)},[name]);

  // const handleKeyPress = (e) => {
    // if (e.key === "Enter") handleAddProduct(); // Добавляем по Enter
  // };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <p>добавить продукт</p>
          <p>name: {name}</p>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // onKeyDown={handleKeyPress}
          ></input>
          <button onClick={() => onAddProductInLocalList(name)}>add</button>
        </div>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Выберите продукт</h2>
        <h3>Ваши продукты</h3>
         <div className="products-grid">
          {productsLocal.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => {
                // onSelectProduct(product, "product");
                onSelectProduct2({ ...product, type: "food" });
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
        <h3>Прочие продукты</h3>
        <div className="products-grid">
          {productsServer.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => {
                // onSelectProduct(product, "product");
                onSelectProduct2({ ...product, type: "food" });
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

export default NewProductModal;
