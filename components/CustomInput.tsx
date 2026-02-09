import { CustomInputProps } from "@/types/types";

const CustomInput = ({
  name,
  value,
  placeholder,
  onChange,
}: CustomInputProps) => (
  <input
    className="placeholder:text-black p-3 border rounded-2xl bg-white"
    name={name}
    value={value}
    type="text"
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default CustomInput;
