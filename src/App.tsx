import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { Header } from './components/Header'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import SearchPage from './pages/Search'
import TariffsPage from './pages/Tariffs'
import FAQPage from './pages/FAQ'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tariffs" element={<TariffsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
