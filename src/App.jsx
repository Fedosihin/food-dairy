// src/App.jsx
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import Cart from "./Cart";
import SymptomModal from "./SymptomModal";

const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem("cart");
    return serializedData ? JSON.parse(serializedData) : [];
  } catch (e) {
    console.error("LocalStorage load error:", e);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem("cart", serializedData);
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
};

function App() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [CartItems, setCartItems] = useState(loadFromLocalStorage());

  const EXAMPLE_notes = {
    "2022-02-22": [
      { type: "food", name: "banana" },
      { type: "symptom", name: "weakness" },
    ],
    "2022-03-26": [
      { type: "food", name: "apple" },
      { type: "symptom", name: "acid" },
    ],
  };
  const EXAMPLE_note = [{ type: "food", name: "banana" }];
  const EXAMPLE_item = { type: "food", name: "banana" };

  const initialDays = [
    {
      id: 1,
      date: "2023-05-01",
      meals: ["Овсянка", "Салат Цезарь", "Гречка с курицей"],
    },
    {
      id: 2,
      date: "2023-05-02",
      meals: ["Тост с авокадо", "Паста Карбонара", "Овощной суп"],
    },
    {
      id: 3,
      date: "2023-05-03",
      meals: ["Смузи", "Стейк с овощами", "Творог с фруктами"],
    },
    {
      id: 4,
      date: "2023-05-04",
      meals: ["Яичница", "Куриный бульон", "Рыба с рисом"],
    },
    {
      id: 5,
      date: "2023-05-05",
      meals: ["Блинчики", "Пицца", "Салат Греческий"],
    },
  ];

  useEffect(() => {
    saveToLocalStorage(CartItems);
  }, [CartItems]);

  const addToCart = (product, type = "undef") => {
    setCartItems([...CartItems, { ...product, type }]);
  };

  // Глобальная выбранная дата
  const [currentDate, setCurrentDate] = useState(new Date());
  // Функционал смены currentDate []
  const goNextDate = () => {
    if (currentDate) {
      // setCurrentDate(currentDate.getDate() + 1);
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const goPrevDate = () => {
    if (currentDate) {
      // setCurrentDate(currentDate.getDate() - 1);
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const [Lists, setNotes] = useState({});
  const [List, setList] = useState([]);
  const [Item, setItem] = useState({});

  // Создаем Объект
  const CreateItem = (obj) => {
    console.log("created item: " + obj);
    return obj;
  };

  // Добавляем Объект в Список
  const AddItemInList = (obj) => {
    const item = CreateItem(obj);
    setList((prevList) => [...prevList, item]);
    console.log("Added item: " + item + " in List");
  };

  // Дату в Key
  const idFromDate = (date) => {
    console.log("date: " + date);
    console.log("idFromDate running");
    return date.toISOString().split("T")[0];
  };

  // Добавляем Список в Списки
  useEffect(() => {
    console.log("List is updated");
    console.log("Updating Lists");
    AddListInNotes(List);
    console.log("New Lists");
    console.dir(Lists);
  }, [List]);

  // Добавляем Список в Списки
  useEffect(() => {
    console.log("useEff: New List");
    console.dir(List);
  }, [List]);

  useEffect(() => {
    console.log("useEff: New Lists");
    console.dir(Lists);
  }, [Lists]);

  const AddListInNotes = (list) => {
    const dateKey = idFromDate(currentDate);
    setNotes((prevNotes) => ({ ...prevNotes, [dateKey]: list }));
    // console.log("Added list " + JSON.stringify(list) + " in Lists " + JSON.stringify(Lists));
    console.log("Added list ");
    console.dir(list);
    console.log(" in Lists ");
  };

  // Форматируем дату в YYYY-MM-DD для использования в качестве ключа
  const getDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  // const addToList = (dateId, object, type) => {
  //   // setNotes();
  //   const dateKey = getDateKey(currentDate);
  //   setNotes((prevNotes) => ({
  //     ...prevNotes,
  //     [dateKey]: Note,
  //   }));
  // };

  // useEffect(() => {
  //   const savedCart = localStorage.getItem('cart');
  //   if (savedCart) setCartItems(JSON.parse(savedCart));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItems));
  // }, [cartItems]);

  const [days, setDays] = useState(initialDays);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Показываем только 3 элемента из всего массива
  const visibleDays = days.slice(currentIndex, currentIndex + 3);

  const goNext = () => {
    if (currentIndex + 3 < days.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Мой дневник питания</h1>
        <div className="navigation">
          <button onClick={goPrevDate}>← Назад</button>
          <button onClick={goNextDate}>Вперёд →</button>
        </div>
        {/* <p>{currentDate}</p> */}
        <p>{idFromDate(currentDate)}</p>
        {/* <ul>
          {Lists[idFromDate(currentDate)].map((note, index) => (
            <li key={index}>
              <strong>{note.type}:</strong> {note.name}
            </li>
          ))}
        </ul> баг отсуствие данных undef.map */}
        <ul
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
          }}
        >
          {Lists[idFromDate(currentDate)] &&
          Array.isArray(Lists[idFromDate(currentDate)]) ? (
            Lists[idFromDate(currentDate)].map((el, index) => (
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

        <h1>Мой дневник питания</h1>
        <div className="navigation">
          <button onClick={goPrev} disabled={currentIndex === 0}>
            ← Назад
          </button>
          <button onClick={goNext} disabled={currentIndex + 3 >= days.length}>
            Вперёд →
          </button>
        </div>

        <div className="days-container">
          {visibleDays.map((day) => (
            <div key={day.id} className="day-card">
              <h2>{day.date}</h2>
              <ul>
                {day.meals.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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

      <Cart items={CartItems} />

      {isProductModalOpen && (
        <ProductModal
          onClose={() => setIsProductModalOpen(false)}
          onSelectProduct={addToCart}
          onSelectProduct2={AddItemInList}
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
