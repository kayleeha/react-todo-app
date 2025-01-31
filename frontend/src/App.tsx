import ListContainer from "./components/ListContainer";

function App() {
  console.log(process.env.REACT_APP_API_SERVER);
  return (
    <>
      <h2>Todo app 만들기</h2>
      <ListContainer />
    </>
  );
}

export default App;
