import { ChangeEvent, useState, type FC } from "react";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => string;
}

const TextInput: FC<InputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  name,
  disabled,
}) => {
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col space-y-1">
      <span className="flex items-center space-x-1">
        <label htmlFor={name}>{label}</label>
        <span className="text-red-500">*</span>
      </span>

      <input
        type={type || "text"}
        className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        required
        id={name}
        value={value}
        onChange={(e) => {
          const error = onChange(e);
          if (error) {
            setError(error);
          }
        }}
        autoComplete="off"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
