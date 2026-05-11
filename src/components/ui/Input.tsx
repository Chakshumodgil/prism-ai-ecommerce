/**
 * UI COMPONENT: Form Input Field
 * PATH: src/components/ui/Input.tsx
 * 
 * DESCRIPTION:
 * A standardized input wrapper. It handles labels, validation error states, 
 * and utilizes 'forwardRef' so it integrates perfectly with form libraries 
 * like React Hook Form.
 */

import React, { forwardRef } from "react";

// PROPS DEFINITION:
// We extend standard input attributes so we don't lose native features like 
// type="password", onChange, or onBlur.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // If this string exists, the input turns red and shows the message
}

/**
 * FORWARD REF:
 * We wrap the component in forwardRef so that the parent can access the actual 
 * DOM node (the <input>). Essential for focus management and validation.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        
        {/* OPTIONAL LABEL: Only renders if the prop is provided */}
        {label && (
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 ml-1">
            {label}
          </label>
        )}

        <input
          {...props}
          ref={ref} // Attaching the forwarded ref to the actual HTML input
          /**
           * DYNAMIC STYLING:
           * - Base styles: Modern, rounded-xl, smooth transition for focus rings.
           * - Error State: If 'error' prop is present, we swap gray for red 
           *   to give the user immediate visual feedback.
           */
          className={`
            w-full border px-4 py-3 rounded-2xl text-gray-900 
            placeholder:text-gray-400 focus:outline-none focus:ring-2 
            transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500/20 bg-red-50/30"
                : "border-gray-200 focus:ring-black/5 focus:border-black"
            } 
            ${className}
          `}
        />

        {/* ERROR MESSAGE: Rendered right below the input for accessibility */}
        {error && (
          <p className="mt-1.5 text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

// Setting displayName is a React best practice when using forwardRef 
// to ensure the component shows up correctly in DevTools.
Input.displayName = "Input";

export default Input;