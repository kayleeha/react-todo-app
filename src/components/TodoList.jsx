import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { create, done } from "../store/modules/todo";
import { useRef } from "react";
import "../style/todoList.scss";

export default function TodoList() {
  // useSelector()를 통해서 store의 state 가져오기
  const todoList = useSelector((state) => state.todo.list); // store/index.js에 key 값이 todo임
  // console.log(todoList); // 배열(map을 사용해서 list 나오게 하기 위함)///

  const todoIsDone = todoList.filter((todo) => {
    return todo.done === false;
  });

  const nextID = useSelector((state) => state.todo.nextID);
  // console.log("id~~~", nextID);

  // useDispatch()를 통해서 dispatch 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef();

  const createTodo = () => {
    dispatch(create({ id: nextID, text: inputRef.current.value }));
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <section>
      <h3>할 일 목록</h3>
      <div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") createTodo();
          }}
        />
        <button onClick={createTodo}>추가</button>
      </div>
      <ul>
        {todoIsDone.map((todo) => {
          return (
            <li key={todo.id}>
              <button onClick={() => dispatch(done(todo.id))}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
