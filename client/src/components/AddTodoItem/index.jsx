import { updateTodoList } from "../../App";
import { useState } from "react";
import "../../App.css";
import { Button } from "../UI/Button";
import { useGetRequest } from "../../hooks/useGetRequest";

export const AddTodoItem = ({ updateTodoList }) => {
  const [title, setTitle] = useState("");
  const { fetchData } = useGetRequest();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Пустая задача! Пожалуйста, укажите заголовок!");
      return;
    }
    fetchData(
      "http://localhost:3002/api/todos/add",
      "post",
      title,
      updateTodoList
    );
    setTitle("");
  };

  return (
    <div className="Add">
      <h2>Добавить задачу</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <Button type="onSubmit">Добавить</Button>
      </form>
    </div>
  );
};
