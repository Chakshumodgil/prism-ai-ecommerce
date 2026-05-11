/**
 * UI COMPONENT: Layout Card
 * PATH: src/components/ui/Card.tsx
 * 
 * DESCRIPTION:
 * A foundational layout container. Instead of rewriting tailwind classes 
 * for every white box in the app, we use this Card component to maintain 
 * visual consistency for borders, shadows, and spacing.
 */

import React from "react";

/**
 * PROPS DEFINITION:
 * - 'children': The dynamic content (images, text, buttons) to be wrapped.
 * - 'className': Optional extra styles (like custom padding or width).
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    /**
     * DESIGN SYSTEM DEFAULTS:
     * - 'bg-white': Standard background.
     * - 'border-gray-200': Soft border to define edges without being harsh.
     * - 'rounded-xl': Matches our modern, slightly rounded aesthetic.
     * - 'shadow-sm': Adds subtle depth to separate the card from the background.
     */
    <div 
      className={`
        bg-white 
        border border-gray-200 
        rounded-2xl 
        shadow-sm 
        p-6 
        transition-shadow 
        hover:shadow-md 
        ${className}
      `}
    >
      {/* 
        COMPOSITION: 
        This is a "slot" where any React elements will render. 
      */}
      {children}
    </div>
  );
};

export default Card;