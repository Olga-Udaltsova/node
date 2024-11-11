import { useEffect, useState } from "react";
import "../../App.css";
import { Button } from "../UI/Button";
import { useGetRequest } from "../../hooks/useGetRequest";

export const EditTodoItem = ({ editItem, edit, setEdit, updateTodoList }) => {
  const [item, setItem] = useState(editItem);
  const [title, setTitle] = useState(item.title);
  const { fetchData } = useGetRequest();

  const saveTodoItem = (title, id) => {
    if (title === item.title) {
      alert("Нет изменений!");
      setEdit(true);
      return;
    }
    if (!title) {
      alert("Пустая задача! Пожалуйста, укажите заголовок!");
      setEdit(true);
      return;
    }
    fetchData(
      `http://localhost:3002/api/todos/edit/${id}`,
      "put",
      title,
      updateTodoList
    );
    setEdit(false);
  };

  useEffect(() => {
    setItem(editItem);
    setTitle(item.title);
  }, [editItem, item.title]);

  return (
    <>
      {edit && (
        <div className="Edit">
          <h2>Редактирование задачи № - {item._id}</h2>
          <div>
            <input
              type="text"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={() => saveTodoItem(title, item._id)}>
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
