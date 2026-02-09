import { CustomDropdownProps } from "@/types/types";

const CustomDropdown = ({
  name,
  value,
  options,
  onChange,
}: CustomDropdownProps) => (
  <select
    className="border h-12 px-2 w-30 bg-white rounded-2xl"
    name={name}
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.children}
      </option>
    ))}
  </select>
);

export default CustomDropdown;
