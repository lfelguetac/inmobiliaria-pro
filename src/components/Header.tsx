import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Inmobiliaria
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Inicio</Link>
            <Link to="/propiedades" className="text-gray-600 hover:text-blue-600">Propiedades</Link>
            <Link to="/contacto" className="text-gray-600 hover:text-blue-600">Contacto</Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
