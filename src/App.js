import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import Home from "./pages/Home/Home";
import Navbar from "./component/Navbar";
import { useState } from "react";
import { AuthProvider } from "./component/form/Authprovider";
import Dashboard from "./Dashboard/Dashboard";
import TaskForm from "./component/TaskForm";
import EditTask from "./component/Edittask";
import { TaskProvider } from "./component/Taskprovider";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthProvider>
      <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
    </AuthProvider>
  );
}

function AppRoutes({ isAuthenticated, onLogin }) {
  const location = useLocation();

  const shouldShowHeader = !["/login", "/registration"].includes(location.pathname);

  return (
    <div className="App">
      {shouldShowHeader && <Navbar />}
      <TaskProvider>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={onLogin}/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/edittask" element={<EditTask />} />
      </Routes>
      </TaskProvider>
    </div>
  );
}

export default App;
