import React from 'react';
import { FieldError } from 'react-hook-form';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
  helperText?: string;
};

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  id,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300'
            : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};