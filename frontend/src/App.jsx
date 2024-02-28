import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Payment from "./pages/Payment";
import Transactions from "./pages/Transactions";
import Error404 from "./pages/Error404";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" Component={Error404} />
        <Route path="/" Component={Landing}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/account" Component={Account}></Route>
        <Route path="/payment" Component={Payment}></Route>
        <Route path="/transactions" Component={Transactions}></Route>
      </Routes>
    </>
  );
}

export default App;
