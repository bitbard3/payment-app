import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Form from "../components/Form";

const icons = [
  { icon: faUser, pxIcon: "3.5", pyIcon: "2" },
  { icon: faEnvelope, pxIcon: "3.5", pyIcon: "2" },
];
const inputs = [
  { type: "text", placeholder: "First Name", mtInput: "20" },
  { type: "text", placeholder: "Last Name", mtInput: "10" },
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
