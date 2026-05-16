import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function Header() {
  const { user } = useAuth()

  async function handleLogout() {
    await supabase!.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Inmobiliaria
          </Link>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Inicio</Link>
            <Link to="/propiedades" className="text-gray-600 hover:text-blue-600">Propiedades</Link>
            {user ? (
              <>
                <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium">Admin</Link>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 text-sm">
                  Salir
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
