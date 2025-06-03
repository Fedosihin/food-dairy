// src/App.jsx
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import SymptomModal from "./SymptomModal";
import { products as productsServer } from "./productsData";
import NewProductModal from "./NewProductModal";

const loadFromLocalStorage = () => {
  try {
    console.log("Пытаюсь загрузить локал:");
    const serializedData = localStorage.getItem("data-lists");
    return serializedData ? JSON.parse(serializedData) : {};
  } catch (e) {
    console.error("LocalStorage load error:", e);
    return {};
  }
};

const saveToLocalStorage = (data) => {
  try {
    console.log("Пытаюсь сохранить:");
    console.dir(data);
    const serializedData = JSON.stringify(data);
    localStorage.setItem("data-lists", serializedData);
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
};

function App() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);

  // Глобальная выбранная дата
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateKey, setCurrentDateKey] = useState(
    currentDate.toISOString().split("T")[0]
  );
  // Функционал смены currentDate []
  const goNextDate = () => {
    console.log("--- МЕНЯЮ ДАТУ ---");
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    setCurrentDateKey(newDate.toISOString().split("T")[0]);
    setList(Lists[newDate.toISOString().split("T")[0]]);
  };

  const goPrevDate = () => {
    console.log("--- МЕНЯЮ ДАТУ ---");
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    setCurrentDateKey(newDate.toISOString().split("T")[0]);
    setList(Lists[newDate.toISOString().split("T")[0]]);
  };

  const [Lists, setLists] = useState(() => loadFromLocalStorage());

  const [List, setList] = useState(Lists[currentDateKey]);

  // Создаем Объект
  const CreateItem = (obj) => {
    console.log("Создал объект");
    console.dir(obj);
    return obj;
  };

  // Добавляем Объект в Список
  // и добавляем список в списки

  const AddItemInList = (obj) => {
    console.log("Пытаюсь добавить объект в список");
    const item = CreateItem(obj);
    if (List) {
      console.log("Список не пустой");
      console.log("Добавляю item в List");
      setList((prevList) => [...prevList, item]);
      console.log("Добавляю newList в Lists");
      const newList = [...List, item];
      setLists((prevLists) => ({ ...prevLists, [currentDateKey]: newList }));
    } else {
      console.log("Не нашёл список");
      console.log("Создаю список");
      console.log("Добавляю item в List");
      setList([item]);
      console.log("Добавляю newList в Lists");
      const newList = [item];
      setLists((prevLists) => ({ ...prevLists, [currentDateKey]: newList }));
    }
  };
  // --- РЕДАКТИРОВАНИЕ ---
  const [isEditing, setIsEditing] = useState(false);

  const switchEditing = () => {
    console.log("Editing Changed");
    if (isEditing) {
      setIsEditing(false);
      setIsDeleting(false);
      setIsMoving(false);
    } else {
      setIsEditing(true);
      setIsDeleting(true);
      setIsMoving(true);
    }
  };

  // --- УДАЛЕНИЕ ---
  const [isDeleting, setIsDeleting] = useState(false);

  const switchDeleting = () => {
    console.log("Deleting Changed");
    if (isDeleting) {
      setIsDeleting(false);
    } else {
      setIsDeleting(true);
    }
  };

  const handleDeleteByIndex = (index) => {
    console.log("Мне сказали удалить этот индекс:");
    console.dir(index);
    const newList = [...List]; // Копируем массив
    newList.splice(index, 1); // Мутируем копию
    if (newList.length !== 0) {
      console.log("Список не пустой остался");
      setList(newList);
      setLists((prevLists) => ({ ...prevLists, [currentDateKey]: newList }));
    } else {
      console.log("Список остался пустой");
      setList(null);
      console.log("Удаляю список из Lists");
      const { [currentDateKey]: _, ...newLists } = Lists;
      setLists(newLists);
    }
  };

  // --- Перемещение ---
  const [isMoving, setIsMoving] = useState(false);
  const switchMoving = () => {
    console.log("Editing Changed");
    if (isMoving) {
      setIsMoving(false);
    } else {
      setIsMoving(true);
    }
  };

  const handleMoving = (index, direction) => {
    console.log("Мне сказали передвинуть этот индекс:");
    console.dir(index);
    if (direction == "up" && index != List.length - 1) {
      console.log("Пытаюсь сдвинуть вверх");
      const newList = [...List];
      const temp = List[index];
      newList[index] = newList[index + 1];
      newList[index + 1] = temp;
      setList([...newList]);
      setLists((prevLists) => ({ ...prevLists, [currentDateKey]: newList }));
    } else if (direction == "down" && index != 0) {
      console.log("Пытаюсь сдвинуть вниз");
      console.log("Пытаюсь сдвинуть вверх");
      const newList = [...List];
      const temp = List[index];
      newList[index] = newList[index - 1];
      newList[index - 1] = temp;
      setList([...newList]);
      setLists((prevLists) => ({ ...prevLists, [currentDateKey]: newList }));
    } else {
      console.log("Не двигаю");
    }
  };

  // --- СПИСОК ПРОДУКТОВ ---

  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  //  const producsssts = [
  //     {
  //       id: 1,
  //       name: "Молочная Вермишель",
  //       image: "milkVermicelli"
  //     },{}];

  const [productsList, setProductsList] = useState([]);
  const [productsServerList, setProductsServerList] = useState(productsServer);
  const [productsLocalList, setProductsLocalList] = useState(()=>{   console.log("загужаю локал продукты в локальный список");
    const data = localStorage.getItem("products-local");
    const productsLocal = data ? JSON.parse(data) : [];
    return productsLocal ? productsLocal : [];});

  useEffect(()=>{
    console.log("LOCAL PRODUCTS:");
    console.dir(productsLocalList);
  }, [productsLocalList])

  useEffect(()=>{
    console.log("SERVER PRODUCTS:");
    console.dir(productsServerList);
  }, [productsServerList])

  // useEffect(() => {
  //   console.log("загужаю локал продукты в локальный список");
  //   const data = localStorage.getItem("products-local");
  //   const productsLocal = data ? JSON.parse(data) : [];
  //   setProductsLocalList(productsLocal);
  // }, []);

  const AddProductInLocalList = (name) => {
    const newProduct = {id: 999, name: name, image: "undef"};
    setProductsLocalList([...productsLocalList, newProduct]);
  };

  // --- UseEffects ---

  // Свежий List
  useEffect(() => {
    console.log("Обновился: LisT");
    console.dir(List);
  }, [List]);
  // Обновился productsLocalList
  useEffect(() => {
    console.log("Обновился: productsLocalList");
    console.dir(productsLocalList);
  }, [productsLocalList]);
  
  // Cвежий Lists
  useEffect(() => {
    console.log("Обновился: ListSSS");
    console.dir(Lists);
  }, [Lists]);

  // Cвежий currentDateKey
  // useEffect(() => {
  //   console.log("Обновился: DateKey");
  //   console.dir(currentDateKey);
  // }, [currentDateKey]);

  useEffect(() => {
    console.log("!!! Сохранение в локал Lists !!!");
    saveToLocalStorage(Lists);
  }, [Lists]);

  useEffect(() => {
    console.log("!!! Сохранение в локал productsList !!!");
    // saveToLocalStorage(pro);
    const data = JSON.stringify(productsLocalList);
    localStorage.setItem("products-local", data);
  }, [productsLocalList]);

  return (
    <div className="app">
      <header>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            padding: "5px",
          }}
        >
          <div>
            <p>Delete: {isDeleting ? "True" : "False"}</p>
            <button onClick={switchDeleting}>Delete</button>
          </div>
          <div>
            <p>Move: {isMoving ? "True" : "False"}</p>
            <button onClick={switchMoving}>Move</button>
          </div>
          <div>
            <p>Editing: {isEditing ? "True" : "False"}</p>
            <button onClick={switchEditing}>Edit</button>
          </div>
        </div>
        {/* <h6>Мой дневник питания</h6> */}
        <p>{currentDateKey}</p>
        <div className="navigation">
          <button onClick={goPrevDate}>← Назад</button>
          <button onClick={goNextDate}>Вперёд →</button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <ul
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            {Lists[
              new Date(currentDate.getTime() - 86400000)
                .toISOString()
                .split("T")[0]
            ] &&
            Array.isArray(
              Lists[
                new Date(currentDate.getTime() - 86400000)
                  .toISOString()
                  .split("T")[0]
              ]
            ) ? (
              Lists[
                new Date(currentDate.getTime() - 86400000)
                  .toISOString()
                  .split("T")[0]
              ].map((el, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <strong>{el.name}:</strong>
                  <img
                    src={el.image}
                    className={
                      el.type == "food"
                        ? "food-image"
                        : el.type == "symptom"
                        ? "symptom-image"
                        : "undef-image"
                    }
                    alt=""
                  />
                </li>
              ))
            ) : (
              <li>Нет записей для этой даты</li>
            )}
          </ul>

          <ul
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            {Lists[currentDateKey] && Array.isArray(Lists[currentDateKey]) ? (
              Lists[currentDateKey].map((el, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <strong>{el.name}:</strong>
                  <img
                    src={el.image}
                    className={
                      el.type == "food"
                        ? "food-image"
                        : el.type == "symptom"
                        ? "symptom-image"
                        : "undef-image"
                    }
                    alt=""
                  />
                  {isDeleting && (
                    <button
                      onClick={() => handleDeleteByIndex(index)}
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
                  )}
                  {isMoving && (
                    <div
                      style={{
                        position: "absolute",
                        left: "-20px",
                        top: "30px",
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
                    >
                      <button
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          // color: "#999",
                          // opacity: 0, // изначально скрыт
                          // transition: "opacity 0.2s",
                          // Показываем при наведении на li
                          // display: "inline-block",
                          padding: "5px 10px",
                          margin: "0",
                          // width: "20px",
                          // height: "20px",
                        }}
                        onClick={() => handleMoving(index, "up")}
                        // Показываем крестик при наведении на элемент списка
                        // onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                        // onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                        // aria-label={`Удалить ${el.name}`}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMoving(index, "down")}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          // color: "#999",
                          // opacity: 0, // изначально скрыт
                          // transition: "opacity 0.2s",
                          // Показываем при наведении на li
                          // display: "inline-block",
                          padding: "5px 10px",
                          margin: "0",
                          // width: "20px",
                          // height: "20px",
                        }}
                      >
                        ↓
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li>Нет записей для этой даты</li>
            )}
          </ul>

          <ul
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            {Lists[
              new Date(currentDate.getTime() + 86400000)
                .toISOString()
                .split("T")[0]
            ] &&
            Array.isArray(
              Lists[
                new Date(currentDate.getTime() + 86400000)
                  .toISOString()
                  .split("T")[0]
              ]
            ) ? (
              Lists[
                new Date(currentDate.getTime() + 86400000)
                  .toISOString()
                  .split("T")[0]
              ].map((el, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <strong>{el.name}:</strong>
                  <img
                    src={el.image}
                    className={
                      el.type == "food"
                        ? "food-image"
                        : el.type == "symptom"
                        ? "symptom-image"
                        : "undef-image"
                    }
                    alt=""
                  />
                </li>
              ))
            ) : (
              <li>Нет записей для этой даты</li>
            )}
          </ul>
        </div>

        <div style={{display: 'flex', position: 'fixed', top: "300px", right: "10px", minHeight: "100px", flexDirection: "column", gap: "10px", marginBottom: "60px", alignItems: 'flex-end'}}>
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
          <button
            className="add-button"
            style={{backgroundColor: "blue"}}
            onClick={() => setIsNewProductModalOpen(true)}
          >
            +
          </button>
        </div>
      </header>

      {isNewProductModalOpen && (
        <NewProductModal
          onClose={() => setIsNewProductModalOpen(false)}
          onSelectProduct2={AddItemInList}
          onAddProductInLocalList = {AddProductInLocalList}
          products = {[...productsLocalList, ...productsServerList]}
        />
      )}

      {isProductModalOpen && (
        <ProductModal
          onClose={() => setIsProductModalOpen(false)}
          onSelectProduct2={AddItemInList}
        />
      )}

      {isSymptomModalOpen && (
        <SymptomModal
          onClose={() => setIsSymptomModalOpen(false)}
          onSelectSymptom={AddItemInList}
        />
      )}
    </div>
  );
}

export default App;
