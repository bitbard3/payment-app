import React from "react";
import FormInput from "./FormInput";

export default function EmailInput() {
  const inputs = [
    { type: "email", placeholder: "Email", mtInput: "mt-20" },
    { type: "password", placeholder: "Password", mtInput: "mt-12" },
  ];
  return inputs.map((input) => (
    <FormInput
      placeholder={input.placeholder}
      type={input.type}
      mt={input.mtInput}
    ></FormInput>
  ));
}
