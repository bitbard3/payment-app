import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Payment from "./pages/Payment";
import Transactions from "./pages/Transactions";
import Error404 from "./pages/Error404";
import UserQr from "./pages/UserQr";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/:username" element={<UserQr />}></Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
