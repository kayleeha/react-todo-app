import { useSelector } from "react-redux";
import "../style/doneList.scss";

export default function DoneList() {
  const todoList = useSelector((state) => state.todo.list); // store/index.js에 key 값이 todo임
  // console.log(todoList); // 배열(map을 사용해서 list 나오게 하기 위함)

  const todoIsDone = todoList.filter((todo) => {
    return todo.done === true;
  });
  return (
    <section>
      <h3>완료 목록</h3>
      <ul>
        {todoIsDone.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
