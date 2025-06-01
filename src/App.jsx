// src/App.jsx
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import Cart from "./Cart";
import SymptomModal from "./SymptomModal";


const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem('cart');
    return serializedData ? JSON.parse(serializedData) : [];
  } catch (e) {
    console.error("LocalStorage load error:", e);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem('cart', serializedData);
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
};

function App() {



  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product, type = "undef") => {
    setCartItems([...cartItems, {...product, type}]);
  };

  // useEffect(() => {
  //   const savedCart = localStorage.getItem('cart');
  //   if (savedCart) setCartItems(JSON.parse(savedCart));
  // }, []);
  
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItems));
  // }, [cartItems]);

  return (
    <div className="app">
      <header>
        <h1>Главный экран</h1>
        <button
          className="add-button"
          onClick={() => setIsProductModalOpen(true)}
        >
          +
        </button>
        <button
          className="add-button-red"
          onClick={() => setIsSymptomModalOpen(true)}
        >
          +
        </button>
      </header>

      <Cart items={cartItems} />

      {isProductModalOpen && (
        <ProductModal
          onClose={() => setIsProductModalOpen(false)}
          onSelectProduct={addToCart}
        />
      )}
      
      {isSymptomModalOpen && (
        <SymptomModal
          onClose={() => setIsSymptomModalOpen(false)}
          onSelectProduct={addToCart}
        />
      )}
    </div>
  );
}

export default App;
