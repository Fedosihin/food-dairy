// src/App.jsx
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import SymptomModal from "./SymptomModal";

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

  // Свежий List
  useEffect(() => {
    console.log("Обновился: LisT");
    console.dir(List);
  }, [List]);

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

  useEffect(() => {
    console.log("!!! Сохранение в локал !!!");
    saveToLocalStorage(Lists);
  }, [Lists]);

  return (
    <div className="app">
      <header>
        <div>
          <p>Deleting: {isDeleting ? "True" : "False"}</p>
          <button onClick={switchDeleting}>Edit</button>
        </div>
        <h1>Мой дневник питания</h1>
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
