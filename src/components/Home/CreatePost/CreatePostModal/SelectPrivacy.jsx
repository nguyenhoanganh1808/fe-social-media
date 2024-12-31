import { Globe, Lock } from "lucide-react";
import { useFormContext } from "react-hook-form";

const items = [
  {
    label: "Public",
    value: 1,
    icon: Lock,
  },
  {
    label: "Private",
    value: 2,
    icon: Globe,
  },
];

export default function SelectPrivacy() {
  const { register } = useFormContext();
  return (
    <div
      id="dropdown-states"
      className="z-10 bg-white  divide-gray-100 dark:bg-gray-700"
    >
      <select
        className="text-sm p-1 dark:text-gray-200"
        aria-labelledby="states-button"
        id="privacy"
        name="privacy"
        {...register("privacy")}
      >
        {items.map((item) => (
          <option
            id={item.value}
            key={item.value}
            value={item.value}
            className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
          >
            <span>{item.label}</span>
          </option>
        ))}
      </select>
    </div>
  );
}
