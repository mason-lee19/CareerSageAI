import React from "react";

export default function EditableField({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-full space-y-2 w-96">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
