import { CustomInputProps } from "@/types/types";

const CustomInput = ({
  name,
  value,
  placeholder,
  onChange,
  required = false,
}: CustomInputProps & { required?: boolean }) => (
  <input
    className="placeholder:text-black p-3 border rounded-2xl bg-white"
    name={name}
    value={value}
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    required={required}
  />
);

export default CustomInput;
