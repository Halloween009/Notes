import { CustomButtonProps } from "@/types/types";
const CustomButton = ({
  onClick,
  children,
  type = "button",
}: CustomButtonProps) => (
  <button
    onClick={onClick}
    className="px-4 py-2 border border-amber-950 rounded-2xl bg-amber-950 text-white hover:cursor-pointer"
    type={type}
  >
    {children}
  </button>
);
export default CustomButton;
