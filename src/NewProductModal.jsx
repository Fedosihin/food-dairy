import { useState } from "react";
import DEFAULT_IMAGE from "./assets/images/food/defaultFoodImage.jpg";

// function ProductModal({ onClose, onSelectProduct, onSelectProduct2 }) {
function NewProductModal({
  productsLocal = [],
  productsServer = [],
  onAddProductInLocalList,
  onDeleteLocal,
  onClose,
  onSelectProduct2,
}) {
  const [name, setName] = useState("");

  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Проверка типа файла
    if (!file.type.match("image.*")) {
      setError("Пожалуйста, загрузите файл изображения (JPEG, PNG, GIF)");
      return;
    }

    // 2. Проверка размера файла (например, не больше 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("Файл слишком большой (максимум 5MB)");
      return;
    }

    // 3. Чтение файла
    const reader = new FileReader();

    reader.onload = (event) => {
      // 4. Сохранение в localStorage
      const result = event.target.result;
      setImage(result);
      // try {
      //   localStorage.setItem("uploadedImage", event.target.result);
      //   setImage(event.target.result);
      //   setError("");
      // } catch (err) {
      //   setError(
      //     "Не удалось сохранить изображение. LocalStorage может быть переполнен."
      //   );
      // }
    };

    reader.onerror = () => {
      setError("Ошибка чтения файла");
    };

    reader.readAsDataURL(file); // Читаем как Data URL
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <p>добавить продукт</p>
          <div>
            <h2>Загрузка изображения</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {image && (
              <div>
                <h3>Предпросмотр:</h3>
                <img
                  src={image}
                  alt="Uploaded preview"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
                <p>Изображение сохранено в localStorage!</p>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // onKeyDown={handleKeyPress}
          ></input>
          <button onClick={() => onAddProductInLocalList(name, image, productsLocal.length)}>add</button>
        </div>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Выберите продукт</h2>
        <h3>Ваши продукты</h3>
        <div className="products-grid">
          {productsLocal.map((product, index) => (
            <div
              style={{ position: "relative" }}
              key={product.id}
              className="product-card"
              // onClick={() => {
              //   onSelectProduct2({ ...product, type: "food" });
              //   onClose();
              // }}
            >
              <button
                onClick={() => onDeleteLocal(index)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  // top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "32px",
                  color: "#999",
                  // opacity: 0, // изначально скрыт
                  transition: "opacity 0.2s",
                  // Показываем при наведении на li
                  display: "inline-block",
                  padding: "0",
                  margin: "0",
                  width: "20px",
                  height: "20px",
                }}
                // Показываем крестик при наведении на элемент списка
                // onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                // onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                // aria-label={`Удалить ${el.name}`}
              >
                ×
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="product-thumb"
                onClick={() => {
                  onSelectProduct2({ ...product, type: "food" });
                  onClose();
                }}
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
