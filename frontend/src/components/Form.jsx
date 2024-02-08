import React from "react";
import FormButton from "./FormButton";
import FormIcon from "./FormIcon";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
export default function Form({ title, icons, inputs, button }) {
  return (
    <div className="h-4/5 w-1/3 border border-stone-500 border-opacity-80 rounded-lg py-20 form">
      <div className="flex flex-col justify-center items-center">
        <FormTitle title={title}></FormTitle>
        <div className="flex mt-20 w-6/12 justify-around">
          {icons.map((icon) => (
            <FormIcon
              icon={icon.icon}
              px={icon.pxIcon}
              py={icon.pyIcon}
            ></FormIcon>
          ))}
        </div>
        {inputs.map((input) => (
          <FormInput
            placeholder={input.placeholder}
            type={input.type}
            mt={input.mtInput}
          ></FormInput>
        ))}
        <div className="mt-20 self-end mr-14">
          <FormButton text={button}></FormButton>
        </div>
      </div>
    </div>
  );
}
