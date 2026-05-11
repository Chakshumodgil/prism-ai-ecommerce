import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-xl font-bold">Internship Project</h1>

        <nav className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </nav>

      </div>
    </header>
  );
}