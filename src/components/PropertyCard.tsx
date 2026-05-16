import { MapPin, Bed, Bath, Maximize, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '../types/property'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link to={`/propiedad/${property.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {property.images[0] ? (
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ImageIcon size={48} />
            </div>
          )}
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
            {property.status === 'venta' ? 'Venta' : 'Arriendo'}
          </span>
          {property.images.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
              {property.images.length} fotos
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{property.title}</h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
            <MapPin size={14} /> {property.comuna}, {property.region}
          </p>
          <p className="text-blue-600 font-bold text-xl mt-2">
            ${property.price.toLocaleString('es-CL')}
          </p>
          <div className="flex gap-4 mt-3 text-gray-500 text-sm">
            {property.bedrooms && (
              <span className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms}</span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</span>
            )}
            <span className="flex items-center gap-1"><Maximize size={14} /> {property.area_m2} m²</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
