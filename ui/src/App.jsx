import { useState } from 'react'
import Header from './components/Header'
import OrderPage from './pages/OrderPage'
import AdminPlaceholder from './pages/AdminPlaceholder'
import './App.css'

function App() {
  const [page, setPage] = useState('order')

  return (
    <div className="app">
      <Header activePage={page} onNavigate={setPage} />
      <main className="main">
        {page === 'order' ? <OrderPage /> : <AdminPlaceholder />}
      </main>
    </div>
  )
}

export default App
