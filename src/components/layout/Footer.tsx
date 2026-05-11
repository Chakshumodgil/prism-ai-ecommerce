"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-gray-900 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p>© 2026 {t("footerText")}. {t("allRightsReserved")}</p>
      </div>
    </footer>
  );
}