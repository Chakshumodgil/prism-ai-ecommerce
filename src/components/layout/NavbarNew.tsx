"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-4 px-10 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      
      {/* --- CREATIVE LOGO SECTION --- */}
      <Link href="/" className="group flex flex-col items-start justify-center leading-none transition-transform active:scale-95">
        <div className="flex items-center space-x-2">
          {/* Geometric CSS Icon */}
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/10">
            <span className="text-white text-[10px] font-black italic">UP</span>
          </div>
          
          <span className="font-black text-2xl text-black tracking-tighter uppercase italic">
            Urban<span className="text-blue-600">Prism</span>
          </span>
        </div>
        
        <div className="flex items-center mt-1.5 space-x-2">
          <span className="h-px w-3 bg-blue-600"></span>
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            AI Intelligence
          </span>
        </div>
      </Link>

      {/* Right Side: Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
          {t("home")}
        </Link>
        <Link href="/products" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
          {t("products")}
        </Link>

        {/* --- DYNAMIC ROLE-BASED LINKS --- */}
        {role === "admin" ? (
          <>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
              {t("adminMode")}
            </span>
            <Link href="/admin" className="text-sm font-bold text-black border-b-2 border-blue-600">
              {t("dashboard")}
            </Link>
            <Link href="/profile" className="text-sm font-semibold text-gray-600 hover:text-black">
              Profile
            </Link>
            <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
              {t("logout")}
            </button>
          </>
        ) : role === "user" ? (
          <>
            <span className="text-[10px] font-bold bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 uppercase tracking-wider">
              {t("userLogin")}
            </span>
            <Link href="/profile" className="text-sm font-semibold text-gray-600 hover:text-black">
              Profile
            </Link>
            <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-black">
              {t("login")}
            </Link>
            <Link href="/register" className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
              {t("register")}
            </Link>
          </>
        )}

        {/* --- LANGUAGE SWITCHER --- */}
        <div className="flex border border-gray-100 rounded-lg overflow-hidden ml-4 shadow-sm">
          <button 
            onClick={() => setLanguage("en")}
            className={`px-3 py-1.5 text-[10px] font-bold transition-all ${language === "en" ? "bg-black text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage("es")}
            className={`px-3 py-1.5 text-[10px] font-bold border-x border-gray-100 transition-all ${language === "es" ? "bg-black text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            ES
          </button>
          <button 
            onClick={() => setLanguage("de")}
            className={`px-3 py-1.5 text-[10px] font-bold transition-all ${language === "de" ? "bg-black text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            DE
          </button>
        </div>
      </div>
    </nav>
  );
}