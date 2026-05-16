import { useState, useEffect } from 'react'
import { Search, House, Key } from 'lucide-react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { supabase } from '../lib/supabase'
import type { Property } from '../types/property'

export default function Home() {
  const [featured, setFeatured] = useState<Property[]>([])

  useEffect(() => {
    fetchFeatured()
  }, [])

  async function fetchFeatured() {
    const { data } = await supabase!.from('properties').select('*').order('created_at', { ascending: false }).limit(3)
    if (data) setFeatured(data)
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu propiedad ideal</h1>
          <p className="text-xl mb-8">Casas, sitios y departamentos en venta y arriendo</p>
          <Link to="/propiedades" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center gap-2">
            <Search size={20} /> Ver Propiedades
          </Link>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">¿Qué estás buscando?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/propiedades" className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow block">
            <House size={48} className="mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Casas</h3>
            <p className="text-gray-500">Encuentra la casa perfecta para tu familia</p>
          </Link>
          <Link to="/propiedades" className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow block">
            <Key size={48} className="mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sitios</h3>
            <p className="text-gray-500">Terrenos y sitios para construir tu proyecto</p>
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Propiedades destacadas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
