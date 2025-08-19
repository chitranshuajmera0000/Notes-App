import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LogOut, User, Menu, X } from 'lucide-react';
import axios from 'axios';
import useNotes from './hooks/useNotes';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const { notes, loading, error, addNote: addNoteRaw, deleteNote: deleteNoteRaw, updateNote: updateNoteRaw } = useNotes(user);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Toast wrappers for note actions
  const addNote = async (...args) => {
    try {
      const result = await addNoteRaw(...args);
      if (result && result.error) {
        toast.error('Failed to add note.');
      } else {
        toast.success('Note added!');
      }
      return result;
    } catch (err) {
      toast.error('Failed to add note.');
      throw err;
    }
  };
  const deleteNote = async (...args) => {
    try {
      const result = await deleteNoteRaw(...args);
      if (result && result.error) {
        toast.error('Failed to delete note.');
      } else {
        toast.success('Note deleted!');
      }
      return result;
    } catch (err) {
      toast.error('Failed to delete note.');
      throw err;
    }
  };
  const updateNote = async (...args) => {
    try {
      const result = await updateNoteRaw(...args);
      if (result && result.error) {
        toast.error('Failed to update note.');
      } else {
        toast.success('Note updated!');
      }
      return result;
    } catch (err) {
      toast.error('Failed to update note.');
      throw err;
    }
  };

  // Helper function to get user's first letter for avatar
  const getUserInitial = () => {
    if (user) {
      // Try displayName first (Google), then name (GitHub), then email
      const name = user.displayName || user.name || user.email;
      if (name) {
        return name.charAt(0).toUpperCase();
      }
    }
    return 'U';
  };

  // Helper function to get display name
  const getDisplayName = () => {
    if (user) {
      // Try displayName first (Google), then name (GitHub)
      const name = user.displayName || user.name;
      if (name) {
        // Properly capitalize the name
        return name.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      }
      // Fallback to email username if no name is available
      if (user.email) {
        const emailUsername = user.email.split('@')[0];
        return emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
      }
    }
    return 'User';
  };

  const handleLogout = () => {
    setShowLogoutMessage(true);
    setShowMobileMenu(false); // Close mobile menu when logout is triggered
  };

  const confirmLogout = () => {
    setIsLoggingOut(true);
    setShowLogoutMessage(false);

    // Actual logout logic
    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        setUser(null);
        toast.success('Logged out successfully!');
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        setIsLoggingOut(false);
        toast.error('Logout failed. Please try again.');
      });
  };

  const cancelLogout = () => {
    setShowLogoutMessage(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    setUserLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setUserLoading(false);
        // Only show welcome toast if user data exists and is fully loaded
        if (response.data) {
          // Wait a brief moment to ensure the user state is set before showing toast
          setTimeout(() => {
            const displayName = response.data.displayName || response.data.name;
            if (displayName) {
              // Properly capitalize the name
              const formattedName = displayName.split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              ).join(' ');
              toast.success(`Welcome, ${formattedName}!`);
            } else if (response.data.email) {
              // Fallback to email username if no name is available
              const emailUsername = response.data.email.split('@')[0];
              const formattedUsername = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
              toast.success(`Welcome, ${formattedUsername}!`);
            } else {
              toast.success('Welcome!');
            }
          }, 100);
        }
      })
      .catch(error => {
        setUser(null);
        setUserLoading(false);
      });
  }, []);

  return (
    <div className={user ? "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden" : "min-h-screen"}>
      {/* Dashboard Background Effects - Only shown when user is logged in */}
      {user && (
        <>
          {/* Animated Background Elements */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-rose-600/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/8 to-blue-600/8 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-700"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500/20 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-500/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-indigo-500/20 rounded-full animate-bounce delay-200"></div>
        </>
      )}

      <Toaster position="top-right" toastOptions={{ duration: 2500, style: { marginTop: 140, marginRight: 24 } }} />
      <div className={user ? "relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8" : ""}>

        {/* Header - Only shown when user is logged in */}
        {user && (
          <header className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg">
              {/* Logo and Brand */}
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-400 to-purple-700 flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl font-extraabold text-white">N</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Notes
                </h1>
                <div className="flex-1"></div>
              </div>

              {/* User Info and Actions */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                      {getUserInitial()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm leading-tight truncate max-w-[120px]">
                        {getDisplayName()}
                      </p>
                      {user.email && (
                        <p className="text-gray-600 text-xs leading-tight truncate max-w-[120px]">{user.email}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50/80 backdrop-blur-sm rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 flex-shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="sm:hidden flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200 ml-auto"
                >
                  {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Menu */}
              {showMobileMenu && (
                <div className="sm:hidden w-full pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                      {getUserInitial()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 leading-tight truncate">
                        {getDisplayName()}
                      </p>
                      {user.email && (
                        <p className="text-sm text-gray-600 leading-tight truncate">{user.email}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50/80 backdrop-blur-sm rounded-xl transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </header>
        )}

        {/* Main Content */}
        {user ? (
          <main className="space-y-6 sm:space-y-8">
            <NoteForm addNote={addNote} loading={loading} />
            <NotesList
              notes={notes}
              onDelete={deleteNote}
              onUpdate={updateNote}
              loading={loading}
            />
            {error && (
              <div className="max-w-2xl mx-auto p-3 sm:p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl">
                <p className="text-red-600 font-medium text-sm sm:text-base">Error: {error.message}</p>
              </div>
            )}
          </main>
        ) : (
          <div className="fixed inset-0 flex flex-col justify-center items-center w-full px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 overflow-hidden">
            {/* Modern Background Elements */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-rose-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-700"></div>
            
            {/* Floating geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500/30 rounded-full animate-bounce delay-700"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-500/30 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-indigo-500/30 rounded-full animate-bounce delay-200"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-400 to-purple-700 shadow-2xl animate-spin-slow" style={{ filter: 'blur(8px)', opacity: 0.5 }}></div>
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-br from-blue-600 via-purple-500 to-purple-700 bg-clip-text text-transparent tracking-tight drop-shadow-lg select-none" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                    N
                  </span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Notes</span></h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-base sm:text-lg leading-relaxed text-center">
                Sign in with your Google or GitHub account to start creating and managing your personal notes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
                <a href={`${import.meta.env.VITE_API_URL}/auth/google`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-gray-800 border border-white/30 rounded-2xl font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-base sm:text-lg flex items-center gap-2">
                    <svg width="32" height="32" className="sm:w-10 sm:h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.5 24.5C47.5 22.5 47.3 20.7 47 19H24V29.5H37.5C36.8 33.1 34.3 36.1 30.7 38.1L39.2 44.6C43.7 40.5 47.5 33.5 47.5 24.5Z" fill="#4285F4" /><path d="M24 48C30.6 48 36.1 45.9 39.2 44.6L30.7 38.1C29.1 39.1 26.8 39.8 24 39.8C17.7 39.8 12.2 35.7 10.3 30.2L1.5 36.1C5.5 43.2 13.1 48 24 48Z" fill="#34A853" /><path d="M10.3 30.2C9.8 29.2 9.5 28.1 9.5 27C9.5 25.9 9.8 24.8 10.3 23.8L1.5 17.9C-0.5 21.5-0.5 26.5 1.5 30.1L10.3 30.2Z" fill="#FBBC05" /><path d="M24 8.2C27.1 8.2 29.8 9.3 31.7 11.1L39.4 3.4C36.1 0.3 30.6-1.1 24 0.1C13.1 0.1 5.5 4.9 1.5 12L10.3 17.9C12.2 12.3 17.7 8.2 24 8.2Z" fill="#EA4335" /></g><defs><clipPath id="clip0_17_40"><rect width="48" height="48" fill="white" /></clipPath></defs></svg>
                    <span>Get Started with Google</span>
                  </button>
                </a>
                <a href={`${import.meta.env.VITE_API_URL}/auth/github`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-black/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-base sm:text-lg flex items-center gap-2">
                    <svg width="32" height="32" className="sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" /></svg>
                    <span>Get Started with GitHub</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Confirm Logout</h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                  Are you sure you want to logout? You'll need to sign in again to access your notes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={cancelLogout}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    disabled={isLoggingOut}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;