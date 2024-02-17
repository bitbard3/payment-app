import React from "react";
import FormInput from "./FormInput";

export default function NameInput() {
  const inputs = [
    { type: "text", placeholder: "First Name", mtInput: "mt-20" },
    { type: "text", placeholder: "Last Name", mtInput: "mt-12" },
  ];
  return inputs.map((input) => (
    <FormInput
      placeholder={input.placeholder}
      type={input.type}
      mt={input.mtInput}
    ></FormInput>
  ));
}
