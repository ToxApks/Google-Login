import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, error, autoFocus = false }) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`peer w-full px-3 py-4 border rounded-lg outline-none transition-all duration-200 bg-transparent
          ${
            error
              ? 'border-red-600 focus:border-red-600 ring-red-500/20'
              : 'border-gray-300 focus:border-blue-600 ring-blue-500/20'
          } focus:ring-2`}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all duration-200 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
          peer-focus:-top-2.5 peer-focus:text-sm
          ${
            error
              ? 'text-red-600'
              : 'text-gray-500 peer-focus:text-blue-600'
          }`}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-2 ml-1 flex items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
