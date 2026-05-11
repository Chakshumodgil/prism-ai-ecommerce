/**
 * UI COMPONENT: Reusable Button
 * PATH: src/components/ui/Button.tsx
 * 
 * DESCRIPTION:
 * The primary action component for the app. It extends the standard 
 * HTML button but adds a custom 'isLoading' state to handle async 
 * actions like logins or form submissions.
 */

import React from "react";

/**
 * PROPS DEFINITION:
 * We extend 'React.ButtonHTMLAttributes' so this component inherits 
 * all standard button features (like type="submit", onClick, disabled, etc.) 
 * without us having to redefine them manually.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Custom prop to trigger the loading UI
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className,
  ...props // Captures all other standard attributes (id, title, aria-labels, etc.)
}) => {
  return (
    <button
      {...props}
      /**
       * STYLING LOGIC:
       * - We combine default brand styles (black bg, rounded) with any 
         extra classes passed via the 'className' prop.
       * - 'disabled:opacity-50' handles the visual look when the button is locked.
       */
      className={`
        w-full bg-black text-white py-3 rounded-2xl font-bold text-sm 
        hover:bg-gray-800 transition-all active:scale-[0.98] 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${className}
      `}
      /**
       * SAFETY LOGIC:
       * The button is automatically disabled if:
       * 1. The 'isLoading' prop is true (prevents double-submissions).
       * 2. The standard 'disabled' prop is passed as true.
       */
      disabled={isLoading || props.disabled}
    >
      {/* 
        CONDITIONAL RENDERING: 
        If loading, we show a status message. Otherwise, we show the 
        actual button text (children).
      */}
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;