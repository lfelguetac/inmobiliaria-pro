import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import ImageUploader from '@/components/ImageUploader'
import type { Property } from '../../types/property'

export default function PropertyForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'casa',
    status: 'venta',
    bedrooms: '',
    bathrooms: '',
    area_m2: '',
    location: '',
    region: '',
    comuna: ''
  })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (isEdit) fetchProperty()
  }, [id])

  async function fetchProperty() {
    const { data } = await supabase!.from('properties').select('*').eq('id', id).single()
    if (data) {
      setForm({
        title: data.title,
        description: data.description || '',
        price: String(data.price),
        type: data.type,
        status: data.status,
        bedrooms: data.bedrooms ? String(data.bedrooms) : '',
        bathrooms: data.bathrooms ? String(data.bathrooms) : '',
        area_m2: String(data.area_m2),
        location: data.location || '',
        region: data.region,
        comuna: data.comuna
      })
      setImages(data.images || [])
    }
    setLoading(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      area_m2: Number(form.area_m2),
      images
    }

    const { error } = isEdit
      ? await supabase!.from('properties').update(payload).eq('id', id)
      : await supabase!.from('properties').insert(payload)

    setSaving(false)
    if (!error) navigate('/admin')
    else alert('Error al guardar: ' + error.message)
  }

  if (loading) return <p className="text-center py-16">Cargando...</p>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Editar' : 'Nueva'} Propiedad</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input name="title" required value={form.title} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea name="description" rows={4} value={form.description} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Precio (CLP) *</label>
            <input name="price" type="number" required value={form.price} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full border rounded px-3 py-2">
              <option value="casa">Casa</option>
              <option value="sitio">Sitio</option>
              <option value="departamento">Departamento</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Estado *</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border rounded px-3 py-2">
              <option value="venta">Venta</option>
              <option value="arriendo">Arriendo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Superficie (m²) *</label>
            <input name="area_m2" type="number" required value={form.area_m2} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dormitorios</label>
            <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Baños</label>
            <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Región *</label>
            <input name="region" required value={form.region} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comuna *</label>
            <input name="comuna" required value={form.comuna} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ubicación</label>
            <input name="location" value={form.location} onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <ImageUploader images={images} onChange={setImages} />

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={() => navigate('/admin')}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
