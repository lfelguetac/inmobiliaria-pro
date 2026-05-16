import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  propertyId?: string
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ propertyId, images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newUrls: string[] = [...images]

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`
      const { error } = await supabase.storage.from('properties').upload(fileName, file)

      if (!error) {
        const { data } = supabase.storage.from('properties').getPublicUrl(fileName)
        newUrls.push(data.publicUrl)
      }
    }

    onChange(newUrls)
    setUploading(false)
  }

  function removeImage(index: number) {
    const url = images[index]
    const fileName = url.split('/').pop()
    if (fileName) supabase.storage.from('properties').remove([fileName])
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Imágenes</label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {images.map((url, i) => (
          <div key={i} className="relative group">
            <img src={url} alt="" className="w-full h-32 object-cover rounded" />
            <button type="button" onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </div>
        ))}

        <label className="border-2 border-dashed border-gray-300 rounded h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
          {uploading ? (
            <span className="text-gray-400">Subiendo...</span>
          ) : (
            <>
              <Upload size={24} className="text-gray-400" />
              <span className="text-sm text-gray-400 mt-1">Subir</span>
            </>
          )}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    </div>
  )
}
