import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider.jsx'
import Header from './components/Header'
import Toast from './components/Toast'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function AppContent() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/order" replace />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/order" replace />} />
        </Routes>
      </main>
      <Toast />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
