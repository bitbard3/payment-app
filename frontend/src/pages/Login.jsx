import LoginForm from "../components/LoginForm";
import { useLocation } from "react-router-dom";
export const Login = () => {
  const location = useLocation();
  const urlRecieved = location.state;
  return (
    <div className="">
      <div className="bg-dark w-screen h-screen">
        <div className="flex justify-center items-center h-screen">
          <LoginForm url={urlRecieved}></LoginForm>
        </div>
      </div>
    </div>
  );
};
