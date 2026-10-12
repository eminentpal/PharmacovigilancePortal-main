import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FormPage from './pages/FormPage'

export default function App() {
  return <Routes><Route path="/" element={<LandingPage />} /><Route path="/report" element={<FormPage />} /></Routes>
}
