export default function TailwindTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Tailwind CSS is Working!</h1>
      <p className="text-lg text-gray-700 mb-6">
        If you see this styled box, your Tailwind setup is correct.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
        Test Button
      </button>
    </div>
  );
}