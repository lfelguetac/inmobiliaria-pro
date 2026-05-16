import { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import { supabase } from '../lib/supabase'
import type { Property } from '../types/property'

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'casa' | 'sitio' | 'departamento'>('all')

  useEffect(() => {
    fetchProperties()
  }, [])

  async function fetchProperties() {
    const { data, error } = await supabase!.from('properties').select('*').order('created_at', { ascending: false })
    if (!error && data) setProperties(data)
    setLoading(false)
  }

  const filtered = filter === 'all' ? properties : properties.filter(p => p.type === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Propiedades</h1>
      
      <div className="flex gap-4 mb-8">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Todas
        </button>
        <button onClick={() => setFilter('casa')} className={`px-4 py-2 rounded ${filter === 'casa' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Casas
        </button>
        <button onClick={() => setFilter('sitio')} className={`px-4 py-2 rounded ${filter === 'sitio' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Sitios
        </button>
        <button onClick={() => setFilter('departamento')} className={`px-4 py-2 rounded ${filter === 'departamento' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Departamentos
        </button>
      </div>

      {loading ? (
        <p className="text-center py-16">Cargando propiedades...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-16 text-gray-500">No hay propiedades disponibles</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
