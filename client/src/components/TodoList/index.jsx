import { useState } from "react";
import "../../App.css";
import { Button } from "../UI/Button";
import { useGetRequest } from "../../hooks/useGetRequest";
import { EditTodoItem } from "../EditTodoItem";

export const TodoList = ({ todoList, updateTodoList }) => {
  const [editItem, setEditItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const { fetchData } = useGetRequest();

  const editTodoItem = (item) => {
    setEditItem({ _id: item._id, title: item.title });
    setEdit(true);
  };

  const deleteTodoItem = (item, editItem) => {
    if (!editItem && item) {
      fetchData(
        "http://localhost:3002/api/todos/delete",
        "delete",
        item.title,
        updateTodoList
      );
      return;
    }
    if (item._id === editItem._id) {
      setEditItem(null);
      setEdit(false);
    }
    fetchData(
      "http://localhost:3002/api/todos/delete",
      "delete",
      item.title,
      updateTodoList
    );
  };

  return (
    <>
      {!todoList.length && <>Loading...</>}
      {todoList.map((item) => (
        <div key={item._id} className="Item">
          <p>{item.title}</p>
          <div className="Buttons">
            <Button
              onClick={() => deleteTodoItem(item, editItem)}
              className="delete"
            >
              Удалить
            </Button>
            <Button onClick={() => editTodoItem(item)}>Редактировать</Button>
          </div>
        </div>
      ))}
      {editItem && (
        <EditTodoItem
          editItem={editItem}
          edit={edit}
          setEdit={setEdit}
          updateTodoList={updateTodoList}
        />
      )}
    </>
  );
};
