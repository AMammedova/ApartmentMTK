import { useField } from "formik";
import { useRef, useEffect } from "react";

const ProportionInput = () => {
  const [{ value }, , { setValue }] = useField("proportion");
  const [leftValue, rightValue] = (value || "").split("/");
  const rightInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumber = /^\d*$/.test(value);

    if (isNumber) {
      if (name === "left") {
        setValue(`${value}/${rightValue || ""}`);
      } else {
        setValue(`${leftValue || ""}/${value}`);
      }
    }
  };

  const handleLeftInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (e.target.value.length >= 2 && rightInputRef.current) {
      rightInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (rightInputRef.current && leftValue.length >= 3) {
      rightInputRef.current.focus();
    }
  }, [leftValue]);

  const inputStyles = {
    inputContainer: "mt-3 w-[44%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md",
    divider: "font-bold text-xl",
    leftInput: "mr-1",
    rightInput: "ml-1",
  };

  return (
    <div className="flex justify-center items-center w-full">
      <input
        type="text"
        name="left"
        value={leftValue || ""}
        onChange={handleLeftInputChange}
        className={inputStyles.inputContainer + " " + inputStyles.leftInput}
      />
      <div className={inputStyles.divider}>/</div>
      <input
        ref={rightInputRef}
        type="text"
        name="right"
        value={rightValue || ""}
        onChange={handleChange}
        className={inputStyles.inputContainer + " " + inputStyles.rightInput}
      />
    </div>
  );
};

export default ProportionInput;
