import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Form from "../components/Form";

const icons = [{ icon: faEnvelope, pxIcon: "px-3", pyIcon: "py-2" }];
const inputs = [
  { type: "email", placeholder: "Email", mtInput: "mt-20" },
  { type: "password", placeholder: "Password", mtInput: "mt-10" },
];
export const Login = () => {
  return (
    <div className="">
      <div className="bg-dark w-screen h-screen">
        <div className="flex justify-center items-center h-screen">
          <Form
            title={"Welcome back!"}
            icons={icons}
            button={"Login"}
            inputs={inputs}
          ></Form>
        </div>
      </div>
    </div>
  );
};
