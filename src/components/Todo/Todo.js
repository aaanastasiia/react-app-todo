import React, { useState, useEffect } from "react";
import InputItem from "../InputItem/InputItem";
import ItemList from "../ItemList/ItemList";
import Footer from "../Footer/Footer";
import styles from "./Todo.module.css";
import Card from "@material-ui/core/Card";

const Todo = () => {
  const initialState = {
    items: [],
    count: 0,
    filteredItems: "Все",
  };

  const [items, setItems] = useState(initialState.items);
  const [count, setCount] = useState(initialState.count);
  const [filteredItems, setFilter] = useState(initialState.filteredItems);

  useEffect(() => {
    const items = localStorage.getItem("items");
    setItems(JSON.parse(items));
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const onClickDone = (id) => {
    const newItemList = items.map((item) => {
      const newItem = { ...item };

      if (item.id === id) {
        newItem.isDone = !item.isDone;
      }

      return newItem;
    });

    setItems(newItemList);
  };

  const onClickDelete = (id) => {
    const newItemList = items.filter((item) => item.id !== id);
    setItems(newItemList);
    setCount((count) => count - 1);
  };

  const onClickAdd = (value) => {
    const newItemList = [
      ...items,
      {
        value,
        isDone: false,
        id: count + 1,
      },
    ];
    setItems(newItemList);
    setCount(count + 1);
  };

  const all = items?.length;
  const activeItems = items?.filter((item) => !item.isDone);
  const doneItems = items?.filter((item) => item.isDone);

  const onClickFilter = (filtration) => setFilter(filtration);

  let filter;
  switch (filteredItems) {
    case "Завершенные":
      filter = items?.filter((item) => item.isDone);
      break;
    case "Незавершенные":
      filter = items?.filter((item) => !item.isDone);
      break;
    default:
      filter = items;
      break;
  }

  return (
    <Card className={styles.card}>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Footer
            countAll={all}
            onClickFilter={onClickFilter}
            countActiveItems={activeItems?.length}
            countDoneItems={doneItems?.length}
            filteredItems={filteredItems}
          />
          <div className={styles.items}>
            <ItemList
              items={items}
              onClickDone={onClickDone}
              onClickDelete={onClickDelete}
              filter={filter}
              filteredItems={filteredItems}
            />
            <InputItem onClickAdd={onClickAdd} items={items} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Todo;
