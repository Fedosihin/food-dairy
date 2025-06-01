// src/App.jsx
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import Cart from "./Cart";
import SymptomModal from "./SymptomModal";

const loadFromLocalStorage = () => {
  // try {
  //   const serializedData = localStorage.getItem("cart");
  //   return serializedData ? JSON.parse(serializedData) : [];
  // } catch (e) {
  //   console.error("LocalStorage load error:", e);
  //   return [];
  // }
  return [];
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

  // кароче
  // date = 22
  // lists = {}
  // list = undefined
  // item = {name: banana}

  // Загружаю дату
  // Смотрю есть ли список к дате - нет - говорю нет списка

  // Добавляю айтем - создаю список - если его не было - пушу - иначе пушу просто

  // перелистываю дату - обновлаю дату - список = null

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

  // Дату в Key
  // const KeyFromDate = (date) => {
  //   // console.log("date: " + date);
  //   console.log("KeyFromDate running");
  //   return date.toISOString().split("T")[0];
  // };

  // Глобальная выбранная дата
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentDateKey, setCurrentDateKey] = useState(KeyFromDate(currentDate));
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

  const [Lists, setNotes] = useState({});
  const [List, setList] = useState(null);
  const [currentList, setcurrentList] = useState(Lists[currentDateKey]);

  const [Item, setItem] = useState({});

  // Создаем Объект
  const CreateItem = (obj) => {
    console.log("Создал объект");
    console.dir(obj);
    return obj;
  };

  // Добавляем Объект в Список
  const AddItemInList = (obj) => {
    console.log("Пытаюсь добавить объект в список");
    const item = CreateItem(obj);
    if (List) {
      console.log("Список не пустой");
      console.log("Добавляю в текущий список объект");
      console.dir(item);
      setList((prevList) => [...prevList, item]);
    } else {
      console.log("Не нашёл список");
      console.log("Создаю список");
      console.log("Добавляю в текущий список объект");
      console.dir(item);
      setList([item]);
    }
  };
  // Добавляем Объект в Список
  const AddItemInList2 = (obj) => {
    // console.log("Пытаюсь добавить объект в список");
    console.log("Пытаюсь добавить объект в список c текущей датой");
    const item = CreateItem(obj);
    if (List) {
      console.log("Список не пустой");
      console.log("Добавляю в текущий список объект");
      console.dir(item);
      setcurrentList((prevList) => [...prevList, item]);
    } else {
      console.log("Не нашёл список");
      console.log("Создаю список");
      console.log("Добавляю в текущий список объект");
      console.dir(item);
      setcurrentList([item]);
    }
  };

  // А ОНО НАДО????
  // 
  // 
  // // Очищаем список при смене даты
  // useEffect(() => {
  //   console.log("Достаю свежий список при переключении даты");
  //   // Если Список ещё не был создан
  //   if (List) {
  //     console.log("Список есть в Списках!");
  //     const newList = Lists[currentDateKey];
  //     setList(newList);
  //   } else {
  //     console.log("Не нашёл свежий список при переключении даты");
  //     setList(null);
  //     // БАГ. СОЗДАЁТ ПУСТЫЕ СПИСКИ
  //   }
  // }, [currentDate]);

  const AddListInNotes = (list) => {
    setNotes((prevNotes) => ({ ...prevNotes, [currentDateKey]: list }));
    // console.log("Added list " + JSON.stringify(list) + " in Lists " + JSON.stringify(Lists));
    console.log("Added list in Lists:");
    console.dir(list);
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

  // Свежий List
  useEffect(() => {
    console.log("Свежий List");
    console.dir(List);
  }, [List]);

  // Свежий currentList
  useEffect(() => {
    console.log("Свежий currentList");
    console.dir(currentList);
  }, [currentList]);

  // Cвежий Lists
  useEffect(() => {
    console.log("Свежий Listsss");
    console.dir(Lists);
  }, [Lists]);

  // useEffect(() => {
  //   setCurrentDateKey(currentDate.toISOString().split("T")[0]);
  // }, [currentDate]);

  // Cвежий currentDateKey
  useEffect(() => {
    console.log("Свежий DateKey");
    console.dir(currentDateKey);
  }, [currentDateKey]);

  // Добавляем Список в Списки
  useEffect(() => {
    // if (List) {
    console.log("Пытаюсь обновить Listsss");
    if (List) {
      console.log("Есть что добавлять. Добавляю");
      AddListInNotes(List);
    } else {
      console.log("Нечего добавлять");
    }
  }, [List]);

  return (
    <div className="app">
      <header>
        <h1>Мой дневник питания</h1>
        <p>{currentDateKey}</p>
        <div className="navigation">
          <button onClick={goPrevDate}>← Назад</button>
          <button onClick={goNextDate}>Вперёд →</button>
        </div>
        {/* <p>{currentDate}</p> */}
        {/* <ul>
          {Lists[idFromDate(currentDate)].map((note, index) => (
            <li key={index}>
              <strong>{note.type}:</strong> {note.name}
            </li>
          ))}
        </ul> баг отсуствие данных undef.map */}
        <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%', justifyContent: 'space-between'}}>
          <ul
            style={{
              width: '300px',
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
              width: '300px',
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
              width: '300px',
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

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
