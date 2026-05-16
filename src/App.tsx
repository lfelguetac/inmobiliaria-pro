import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Admin from './pages/admin/Admin'
import PropertyForm from './pages/admin/PropertyForm'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/nueva" element={<PropertyForm />} />
            <Route path="/admin/editar/:id" element={<PropertyForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
