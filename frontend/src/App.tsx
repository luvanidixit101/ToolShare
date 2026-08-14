import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import ToastContainer from '@/components/common/Toast';

import Home from '@/pages/home/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ToolsList from '@/pages/tools/ToolsList';
import ToolDetails from '@/pages/tools/ToolDetails';
import AddTool from '@/pages/tools/AddTool';
import EditTool from '@/pages/tools/EditTool';
import MyTools from '@/pages/tools/MyTools';
import Bookings from '@/pages/bookings/Bookings';
import Profile from '@/pages/profile/Profile';
import Chat from '@/pages/chat/Chat';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (no layout) */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          {/* Main routes (with layout) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsList />} />
            <Route path="/tools/:id" element={<ToolDetails />} />
            <Route
              path="/tools/add"
              element={<ProtectedRoute><AddTool /></ProtectedRoute>}
            />
            <Route
              path="/tools/edit/:id"
              element={<ProtectedRoute><EditTool /></ProtectedRoute>}
            />
            <Route
              path="/tools/my-tools"
              element={<ProtectedRoute><MyTools /></ProtectedRoute>}
            />
            <Route
              path="/bookings"
              element={<ProtectedRoute><Bookings /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route
              path="/chat"
              element={<ProtectedRoute><Chat /></ProtectedRoute>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
