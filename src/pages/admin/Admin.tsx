import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { Property } from '../types/property'

export default function Admin() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  async function fetchProperties() {
    const { data, error } = await supabase!.from('properties').select('*').order('created_at', { ascending: false })
    if (!error && data) setProperties(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta propiedad?')) return
    await supabase!.from('properties').delete().eq('id', id)
    fetchProperties()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administrar Propiedades</h1>
        <a href="/admin/nueva" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nueva Propiedad
        </a>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties.map(p => (
                <tr key={p.id}>
                  <td className="px-6 py-4">{p.title}</td>
                  <td className="px-6 py-4 capitalize">{p.type}</td>
                  <td className="px-6 py-4">${p.price.toLocaleString('es-CL')}</td>
                  <td className="px-6 py-4 capitalize">{p.status}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <a href={`/admin/editar/${p.id}`} className="text-blue-600 hover:underline">Editar</a>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay propiedades aún. ¡Crea la primera!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
