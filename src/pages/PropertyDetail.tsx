import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Maximize, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Property } from '../types/property'

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (id) fetchProperty(id)
  }, [id])

  async function fetchProperty(propertyId: string) {
    const { data, error } = await supabase!.from('properties').select('*').eq('id', propertyId).single()
    if (!error && data) setProperty(data)
    setLoading(false)
  }

  if (loading) return <p className="text-center py-16">Cargando...</p>
  if (!property) return <p className="text-center py-16">Propiedad no encontrada</p>

  function nextImage() {
    if (property.images.length > 0) setCurrentImage((currentImage + 1) % property.images.length)
  }

  function prevImage() {
    if (property.images.length > 0) setCurrentImage((currentImage - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/propiedades" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6">
        <ArrowLeft size={20} /> Volver
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {property.images.length > 0 ? (
            <div className="relative">
              <img src={property.images[currentImage]} alt="" className="w-full h-96 object-cover rounded-lg" />
              {property.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center text-gray-400">
              Sin imagen disponible
            </div>
          )}

          {property.images.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImage(i)}
                  className={`w-20 h-16 flex-shrink-0 rounded overflow-hidden border-2 ${i === currentImage ? 'border-blue-600' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded">
            {property.status === 'venta' ? 'Venta' : 'Arriendo'}
          </span>
          <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
          <p className="text-gray-500 flex items-center gap-1 mt-2">
            <MapPin size={16} /> {property.comuna}, {property.region}
          </p>
          <p className="text-4xl font-bold text-blue-600 mt-4">
            ${property.price.toLocaleString('es-CL')}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 py-6 border-y">
            {property.bedrooms && (
              <div className="text-center">
                <Bed size={24} className="mx-auto text-gray-400" />
                <p className="mt-1 font-semibold">{property.bedrooms} Dormitorios</p>
              </div>
            )}
            {property.bathrooms && (
              <div className="text-center">
                <Bath size={24} className="mx-auto text-gray-400" />
                <p className="mt-1 font-semibold">{property.bathrooms} Baños</p>
              </div>
            )}
            <div className="text-center">
              <Maximize size={24} className="mx-auto text-gray-400" />
              <p className="mt-1 font-semibold">{property.area_m2} m²</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6">Descripción</h3>
          <p className="text-gray-600 mt-2 whitespace-pre-line">{property.description}</p>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-8 hover:bg-blue-700">
            Contactar
          </button>
        </div>
      </div>
    </div>
  )
}
