import { useInterfaceProps } from "@/shared/contexts/InterfacePropsContext";
import { getTextColor } from "@/shared/utils/getTextColor";

export const Header = () => {
  const { title, color } = useInterfaceProps();
  const textColor = getTextColor(color);

  return (
    <header className="h-20 w-full bg-interface flex items-center px-6 shadow-md">
      <h1 className={`font-bold text-2xl ${textColor}`}>{title}</h1>
    </header>
  );
};
