export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white">
        <h1 className="text-2xl font-bold text-center">Investor Portal</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}