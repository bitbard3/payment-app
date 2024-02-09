import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/login" Component={Login}></Route>
      </Routes>
    </>
  );
}

export default App;
