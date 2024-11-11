import "./App.css";
import { AddTodoItem } from "./components/AddTodoItem";
import { TodoList } from "./components/TodoList";
import { useGetTodoList } from "./hooks/useGetTodoList";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [status, setStatus] = useState(true);
  const getTodoList = useGetTodoList();

  const updateTodoList = useCallback(() => {
    getTodoList().then((result) => {
      setTodoList(result.todos);
      if (result.todos.length === 0) {
        setStatus(false);
        return;
      }
      setStatus(true);
    });
  }, [getTodoList]);

  useEffect(() => {
    updateTodoList();
  }, [updateTodoList]);

  return (
    <div className="App">
      <h1>Мои задачи</h1>
      {status ? (
        <TodoList todoList={todoList} updateTodoList={updateTodoList} />
      ) : (
        <p>Задач нет</p>
      )}
      <br />
      <br />
      <AddTodoItem updateTodoList={updateTodoList} />
    </div>
  );
}

export default App;
