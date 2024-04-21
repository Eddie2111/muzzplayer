import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Define the shape of your context
interface AuthContextType {
  loggedIn: boolean;
  toggleLogin: () => void;
  toggleLogout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  toggleLogin: () => {},
  toggleLogout: () => {},
});

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to wrap your application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const toggleLogin = () => {
    setLoggedIn((prevState) => !prevState); // Toggling the login state
    localStorage.setItem("user", "true");
  };

  const toggleLogout = () => {
    setLoggedIn((prevState) => !prevState); // Toggling the login state
    localStorage.removeItem("user");
  };

  // Value provided to consuming components
  const value: AuthContextType = {
    loggedIn,
    toggleLogin,
    toggleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// FirstComponent that triggers the toggleLogin function
export const FirstComponent: React.FC = () => {
  const { toggleLogin } = useAuth();

  const handleLogin = () => {
    toggleLogin(); // Trigger toggleLogin function to change loggedIn state
  };

  return <button onClick={handleLogin}>Login</button>;
};

// SecondComponent that displays the loggedIn state
export const SecondComponent: React.FC = () => {
  const { loggedIn } = useAuth();

  return <p>User is {loggedIn ? "Logged In" : "Logged Out"}</p>;
};
