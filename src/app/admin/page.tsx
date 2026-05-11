/**
 * PROJECT PAGE: Admin Dashboard
 * PATH: src/app/admin/page.tsx
 * 
 * DESCRIPTION:
 * This is the central management hub for the Urban Prism store. It allows 
 * administrators to view, add, edit, and delete products from the inventory.
 * 
 * KEY FEATURES:
 * 1. RBAC (Role-Based Access Control): Uses AuthGuard to restrict access.
 * 2. AI Integration: Uses a utility function to generate product descriptions.
 * 3. CRUD Operations: Full Create, Read, Update, and Delete functionality for products.
 */

"use client"; // Required for React hooks (useState, useEffect) in Next.js App Router

import React, { useState } from "react";

// --- EXTERNAL COMPONENT LINKS ---
import AuthGuard from "@/components/AuthGuard"; // Path: src/components/AuthGuard.tsx (Checks if user is admin)
import Card from "@/components/ui/Card";           // Path: src/components/ui/Card.tsx (Styled wrapper)
import Button from "@/components/ui/Button";       // Path: src/components/ui/Button.tsx (Custom button component)
import Input from "@/components/ui/Input";         // Path: src/components/ui/Input.tsx (Custom input with labels)

// --- UTILITY TOOL LINK ---
import { generateAIDescription } from "@/utils/aiGenerator"; // Path: src/utils/aiGenerator.ts (AI logic)

/**
 * STATIC DATA: 
 * Initial state of the product list before any database/API integration.
 */
const initialProducts = [
  { id: "1", name: "Premium Wireless Headphones", price: "199.99", category: "Electronics", description: "Experience high-fidelity sound." },
  { id: "2", name: "Minimalist Leather Watch", price: "125.00", category: "Accessories", description: "Timeless design for any occasion." },
  { id: "3", name: "Ergonomic Office Chair", price: "299.00", category: "Furniture", description: "Support for your long work hours." }
];

export default function AdminDashboard() {
  // STATE: The current list of products being displayed
  const [products, setProducts] = useState(initialProducts);
  
  // STATE: Toggle between "Add Mode" and "Edit Mode"
  const [isEditing, setIsEditing] = useState(false);
  
  // STATE: Tracks if the AI is currently "thinking" to show a loading spinner/text
  const [isGenerating, setIsGenerating] = useState(false); 
  
  // STATE: Stores the values typed into the form fields
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "", 
  });

  /**
   * HANDLE CHANGE:
   * A universal function that updates the formData state whenever a user types.
   * Works for both standard inputs and textareas.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * --- AI GENERATION LOGIC ---
   * Uses the product name to generate a creative description.
   * This saves the admin time during data entry.
   */
  const handleAIByline = async () => {
    // Validation: Require a name before calling the AI
    if (!formData.name) {
      alert("Please enter a Product Name first so the AI can generate a description!");
      return;
    }

    setIsGenerating(true); // Trigger loading state
    
    // Artificial delay: Makes the AI interaction feel more substantial to the user
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calls the utility tool located in @/utils/aiGenerator
    const result = generateAIDescription(formData.name);
    
    // Updates only the 'description' field in the form state
    setFormData(prev => ({ ...prev, description: result }));
    setIsGenerating(false); // End loading state
  };

  /**
   * HANDLE SUBMIT:
   * Decides whether to add a brand new product or save changes to an existing one.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    
    if (isEditing) {
      // Edit Logic: Map through products and replace the one with the matching ID
      setProducts(products.map(p => p.id === formData.id ? formData : p));
      setIsEditing(false);
    } else {
      // Create Logic: Generate a unique ID and add the new form data to the list
      const newProduct = { ...formData, id: Math.random().toString(36).substr(2, 9) };
      setProducts([...products, newProduct]);
    }
    
    // Reset form fields back to empty after completion
    setFormData({ id: "", name: "", price: "", category: "", description: "" });
  };

  /**
   * HANDLE DELETE:
   * Filter out the product with the specified ID from the list.
   */
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  /**
   * HANDLE EDIT:
   * Takes the data from a table row and puts it back into the form for modification.
   */
  const handleEdit = (product: any) => {
    setFormData(product);
    setIsEditing(true);
  };

  return (
    // SECURITY WRAPPER: Blocks non-admins from accessing this entire section
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 text-left text-black">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER SECTION */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-black">Admin Inventory</h1>
            {/* Visual indicator that the user is in the management area */}
            <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
              Admin Mode
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- DATA ENTRY FORM (Column 1) --- */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-black">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* REUSABLE UI COMPONENT: Product Name */}
                  <Input 
                    label="Product Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="text-black"
                  />
                  
                  {/* DESCRIPTION GROUP WITH AI TRIGGER */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-700">Description</label>
                      <button 
                        type="button"
                        onClick={handleAIByline}
                        disabled={isGenerating}
                        className="text-[10px] font-black uppercase tracking-tighter bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100 transition-all disabled:opacity-50"
                      >
                        {isGenerating ? "✨ Brainstorming..." : "✨ AI Generate"}
                      </button>
                    </div>
                    {/* Native Textarea used for larger text blocks */}
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Product details..."
                      className="w-full p-3 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-black outline-none min-h-25 text-black"
                      required
                    />
                  </div>

                  {/* REUSABLE UI COMPONENT: Price */}
                  <Input 
                    label="Price ($)" 
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    className="text-black"
                  />

                  {/* REUSABLE UI COMPONENT: Category */}
                  <Input 
                    label="Category" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    required 
                    className="text-black"
                  />
                  
                  {/* FORM ACTION BUTTONS */}
                  <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold transition-colors py-3">
                    {isEditing ? "Update Product" : "Save Product"}
                  </Button>
                  
                  {/* Cancel button: Only appears when editing to allow the user to exit 'Edit Mode' */}
                  {isEditing && (
                    <button 
                      type="button" 
                      onClick={() => { setIsEditing(false); setFormData({id:"", name:"", price:"", category:"", description:""}); }} 
                      className="w-full text-sm text-gray-600 underline mt-2"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </Card>
            </div>

            {/* --- INVENTORY LIST TABLE (Columns 2-3) --- */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-gray-300">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="p-4 text-sm font-black text-black uppercase tracking-wider">Product</th>
                        <th className="p-4 text-sm font-black text-black uppercase tracking-wider">Category</th>
                        <th className="p-4 text-sm font-black text-black uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {/* Loops through the products array to generate table rows dynamically */}
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-gray-900">{p.name}</div>
                            {/* line-clamp-1 prevents text from making rows too tall */}
                            <div className="text-xs text-gray-500 line-clamp-1">{p.description}</div>
                          </td>
                          <td className="p-4 text-gray-700 font-medium">{p.category}</td>
                          <td className="p-4 text-right space-x-4">
                            {/* ACTION TRIGGERS */}
                            <button onClick={() => handleEdit(p)} className="text-blue-700 text-sm font-bold hover:text-blue-900 underline">Edit</button>
                            <button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm font-bold hover:text-red-800 underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </AuthGuard>
  );
}