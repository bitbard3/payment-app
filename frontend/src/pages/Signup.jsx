import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Form from "../components/Form";

const icons = [
  { icon: faUser, pxIcon: "px-3.5", pyIcon: "py-2" },
  { icon: faEnvelope, pxIcon: "px-3", pyIcon: "py-2" },
];
const inputs = [
  { type: "text", placeholder: "First Name", mtInput: "mt-20" },
  { type: "text", placeholder: "Last Name", mtInput: "mt-10" },
];
export const Signup = () => {
  return (
    <div className="">
      <div className="bg-dark w-screen h-screen">
        <div className="flex justify-center items-center h-screen">
          <Form
            title={"Signup"}
            icons={icons}
            button={"Next"}
            inputs={inputs}
          ></Form>
        </div>
      </div>
    </div>
  );
};
