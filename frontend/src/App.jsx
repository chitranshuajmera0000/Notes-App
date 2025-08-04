import { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import axios from 'axios';
import useNotes from './hooks/useNotes';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  const [user, setUser] = useState(null);
  const { notes, loading, error, addNote, deleteNote, updateNote } = useNotes(user);

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/user", { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true })
        .then(() => {
          setUser(null);
          window.location.href = "/";
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8 sticky top-4 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Notes
                  </h1>
                  <p className="text-sm text-gray-600">Capture your thoughts</p>
                </div>
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  {/* User Profile Display */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {user.displayName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">Welcome back!</p>
                      <p className="font-medium text-blue-600">{user.displayName}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-gray-200 hover:border-red-200"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <a href="http://localhost:3000/api/auth/google">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Login with Google
                  </button>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        {user ? (
          <main className="space-y-8">
            <NoteForm addNote={addNote} loading={loading} />
            <NotesList 
              notes={notes} 
              onDelete={deleteNote} 
              onUpdate={updateNote}
              loading={loading} 
            />
            {error && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 font-medium">Error: {error.message}</p>
              </div>
            )}
          </main>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Notes</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sign in with your Google account to start creating and managing your personal notes.
            </p>
            <a href="http://localhost:3000/api/auth/google">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;