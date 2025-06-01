// src/Cart.jsx
function Cart({ items }) {
    return (
      <div className="cart">
        <h2>Список</h2>
        <div className="cart-items">
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name} 
                className={item.type == "product" ? "product-image" : item.type == "symptom" ? "symptom-image" : "undef-image"}
              />
              {/* <span>{item.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Cart;