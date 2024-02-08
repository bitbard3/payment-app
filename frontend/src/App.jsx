import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" Component={Signup}></Route>
      </Routes>
    </>
  );
}

export default App;
