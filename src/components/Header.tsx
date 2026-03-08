import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'Тарифы', to: '/tariffs' },
  { label: 'FAQ', to: '/faq' },
]

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border/60 bg-white/90 shadow-soft backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-card">
              <span className="text-lg font-semibold tracking-tight">С</span>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-dark">
                СКАН
              </span>
              <span className="text-xs text-muted">Медиа‑мониторинг</span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'transition-colors hover:text-primary-dark',
                  isActive ? 'text-primary-dark' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated && user ? (
            <>
              <Card className="flex items-center gap-3 rounded-full bg-background/80 px-4 py-2 text-xs shadow-soft">
                <div className="flex flex-col">
                  <span className="text-muted">Использовано компаний</span>
                  <span className="font-semibold text-primary-dark">
                    {user.companiesUsed} / {user.companiesLimit}
                  </span>
                </div>
              </Card>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-white shadow-card">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted">Пользователь</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Выйти
                </Button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-muted transition-colors hover:text-primary-dark"
              >
                Зарегистрироваться
              </button>
              <Button size="sm" onClick={() => navigate('/login')}>
                Войти
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted hover:bg-background md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-white md:hidden">
          <div className="container flex flex-col gap-4 py-4">
            <nav className="flex flex-col gap-2 text-sm font-medium text-muted">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-2 py-2 hover:bg-background',
                      isActive ? 'text-primary-dark' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-white">
                      {user.name[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-muted">Пользователь</span>
                      <span className="text-sm font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/login')
                      setMobileOpen(false)
                    }}
                    className="text-sm font-medium text-muted"
                  >
                    Зарегистрироваться
                  </button>
                  <Button
                    size="sm"
                    className="flex-1 justify-center"
                    onClick={() => {
                      navigate('/login')
                      setMobileOpen(false)
                    }}
                  >
                    Войти
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


