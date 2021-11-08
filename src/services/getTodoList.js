export const getTodoList = () => {
  const storedList = localStorage.getItem("todo");
  const todoList = JSON.parse(storedList);
  return todoList || [];
};