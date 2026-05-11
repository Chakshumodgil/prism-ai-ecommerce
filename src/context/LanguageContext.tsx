/**
 * GLOBAL CONTEXT: Language (i18n)
 * PATH: src/context/LanguageContext.tsx
 * 
 * DESCRIPTION:
 * This is the application's translation engine. It manages the current 
 * language state, persists user preferences in localStorage, and provides 
 * a 't' function to swap text strings dynamically across the UI.
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// DICTIONARY: Centralized text for all supported languages.
// In a larger project, these would be moved to separate JSON files.
const translations = {
  en: {
    home: "Home",
    products: "Products",
    login: "Login",
    register: "Register",
    logout: "Logout",
    adminMode: "Admin Mode",
    userLogin: "User Login",
    dashboard: "Dashboard",
    storeName: "Urban Prism | AI-Powered Premium Store",
    footerText: "Urban Prism Innovation",
    allRightsReserved: "All rights reserved.",
  },
  es: {
    home: "Inicio",
    products: "Productos",
    login: "Iniciar Sesión",
    register: "Registrarse",
    logout: "Cerrar Sesión",
    adminMode: "Modo Admin",
    userLogin: "Sesión Usuario",
    dashboard: "Panel",
    storeName: "Urban Prism | Tienda Premium con IA",
    footerText: "Innovación Urban Prism",
    allRightsReserved: "Todos los derechos reservados.",
  },
  de: {
    home: "Startseite",
    products: "Produkte",
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    adminMode: "Admin-Modus",
    userLogin: "Benutzer-Login",
    dashboard: "Dashboard",
    storeName: "Urban Prism | KI-Premium-Shop",
    footerText: "Urban Prism Innovationen",
    allRightsReserved: "Alle Rechte vorbehalten.",
  },
};

type Language = "en" | "es" | "de";

/**
 * TYPE DEFINITION:
 * Ensuring TypeScript knows exactly what the context provides.
 * Using 'keyof typeof translations.en' ensures that we can't try 
 * to translate a key that doesn't exist in our dictionary.
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  /**
   * HYDRATION:
   * When the app loads, we check if the user previously chose a language.
   * This prevents the app from "forgetting" the setting on refresh.
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("appLang") as Language;
      // Basic validation to ensure the saved string matches our supported types
      if (saved && ["en", "es", "de"].includes(saved)) {
        setLanguage(saved);
      }
    } catch (error) {
      console.error("Storage access error:", error);
    }
  }, []);

  /**
   * STATE UPDATER:
   * Updates both the React state (for immediate UI changes) and 
   * localStorage (for long-term persistence).
   */
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("appLang", lang);
    } catch (error) {
      console.error("Storage write error:", error);
    }
  };

  /**
   * THE TRANSLATOR ('t'):
   * The workhorse function. It looks up the key in the current language.
   * Fallback logic: If a key is missing in German, it tries English before returning empty.
   */
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations["en"][key] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * CUSTOM HOOK:
 * A shorthand to access the context. Includes a safety check to 
 * ensure the hook isn't used outside of the Provider.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage hook must be used inside a LanguageProvider wrapper.");
  }
  return context;
};