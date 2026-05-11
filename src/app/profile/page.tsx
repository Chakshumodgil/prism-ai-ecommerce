/**
 * PROJECT PAGE: User Profile
 * PATH: src/app/profile/page.tsx
 * 
 * DESCRIPTION:
 * A private route that displays user information. It features an editable 
 * profile system including name updates and a base64 image uploader.
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // STATE MANAGEMENT: Local user data and UI toggles
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * AUTHENTICATION GUARD:
   * On mount, we check localStorage for a session. If no 'isLoggedIn' 
   * flag is found, we kick the user back to the login page.
   */
  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    const role = localStorage.getItem("userRole") || "";
    const name = localStorage.getItem("userName") || email.split('@')[0];
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedImage = localStorage.getItem("profileImage");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setUserEmail(email);
      setUserRole(role);
      setUserName(name);
      if (savedImage) setPreviewImage(savedImage);
      setLoading(false);
    }
  }, [router]);

  /**
   * IMAGE HANDLER:
   * Converts a physical file into a Base64 string so we can "save" 
   * the profile picture directly into localStorage without a backend.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Security: Prevent browser crashes by limiting file size to 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large (Max 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * PERSISTENCE LOGIC:
   * Saves updated info back to localStorage to maintain the "session" 
   * across page refreshes.
   */
  const handleSave = () => {
    localStorage.setItem("userName", userName);
    if (previewImage) {
      localStorage.setItem("profileImage", previewImage);
    }
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  // Prevent "flicker" by not rendering the UI until the auth check is complete
  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center px-4 py-10">
      
      {/* PROFILE CARD CONTAINER */}
      <div className="w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-800/10">
        
        {/* DESIGN ELEMENT: Branding banner with carbon fiber texture */}
        <div className="h-28 bg-black relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="px-8 pb-10">
          {/* AVATAR SECTION: Dynamic upload and preview */}
          <div className="relative -mt-14 mb-6 flex justify-center">
            <div 
              onClick={() => isEditing && fileInputRef.current?.click()}
              className={`group relative w-28 h-28 bg-white border-4 border-white rounded-full shadow-xl overflow-hidden transition-all ${isEditing ? 'cursor-pointer ring-4 ring-blue-500/30 scale-105' : ''}`}
            >
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold uppercase">
                  {userName[0]}
                </div>
              )}
              
              {/* Overlay shown only during edit mode */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-white text-[9px] font-bold uppercase tracking-wider">Change Photo</span>
                </div>
              )}
            </div>
            {/* Hidden file input triggered by the avatar click */}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          {/* USER INFO & EDITING UI */}
          <div className="text-center mb-8">
            {isEditing ? (
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)}
                className="text-xl font-bold text-center border-b-2 border-black outline-none w-full pb-1 text-black bg-transparent"
                autoFocus
              />
            ) : (
              <h1 className="text-2xl font-bold text-black tracking-tight">{userName}</h1>
            )}
            <div className="mt-2 inline-block px-3 py-1 bg-gray-100 rounded-full">
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{userRole}</p>
            </div>
          </div>

          {/* DATA FIELDS: Non-editable info (Email) */}
          <div className="space-y-5">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Account Email</span>
              <span className="text-sm font-medium text-gray-600 bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-100">
                {userEmail}
              </span>
            </div>

            {/* TOGGLE BUTTONS: Switching between view and edit modes */}
            {isEditing ? (
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-black text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-800 shadow-lg transition-all active:scale-95"
                >
                  Save
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full mt-2 bg-black text-white py-4 rounded-2xl font-bold text-sm hover:shadow-xl transition-all active:scale-95"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER: Reinforces the project's local-storage based security architecture */}
      <p className="mt-8 text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
        Secure Local Session
      </p>
    </div>
  );
}