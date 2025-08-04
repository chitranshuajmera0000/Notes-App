import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/user", { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the Note App</h1>
      {user ? (
        <div>
          <h2>Hello, {user.displayName}</h2>
          <button onClick={() => {
            axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true })
              .then(() => {
                setUser(null);
                window.location.href = "/"; // Optional: redirect to homepage
              });
          }}>
            Logout
          </button>
        </div>
      ) : (
        <a href="http://localhost:3000/api/auth/google">
          <button>Login with Google</button>
        </a>
      )}
    </div>
  );
}

export default App;