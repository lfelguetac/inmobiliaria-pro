import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Login from './pages/Login'
import Admin from './pages/admin/Admin'
import PropertyForm from './pages/admin/PropertyForm'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/propiedades" element={<Properties />} />
              <Route path="/propiedad/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/admin/nueva" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
              <Route path="/admin/editar/:id" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
