import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Loader } from '../components/ui/Loader'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!loginValue || !password) {
      setError('Введите логин и пароль.')
      return
    }

    setLoading(true)

    // Имитация запроса авторизации
    setTimeout(() => {
      setLoading(false)
      if (password === '123456') {
        login('demo-token', { name: 'Иван Иванов' })
        navigate('/search', { replace: true })
      } else {
        setError('Неверный логин или пароль.')
      }
    }, 900)
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-b from-background to-primary/5 px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl border-border/80 bg-white/95 p-6 shadow-card">
        <div className="mb-6 flex gap-4 border-b border-border/70 pb-2 text-sm font-medium text-muted">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`relative pb-1 ${
              tab === 'login'
                ? 'text-primary-dark'
                : 'text-muted hover:text-primary-soft'
            }`}
          >
            Войти
            {tab === 'login' && (
              <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-primary" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`relative pb-1 ${
              tab === 'register'
                ? 'text-primary-dark'
                : 'text-muted hover:text-primary-soft'
            }`}
          >
            Зарегистрироваться
            {tab === 'register' && (
              <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-primary/40" />
            )}
          </button>
        </div>

        {tab === 'register' && (
          <p className="mb-4 text-xs text-muted">
            Регистрация в демо‑версии не реализована. Используйте форму входа для
            имитации авторизации.
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="login" className="flex items-center gap-1 text-gray-900">
              Логин<span className="text-danger">*</span>
            </label>
            <Input
              id="login"
              placeholder="example@company.ru"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
            />
          </div>

          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="flex items-center gap-1 text-gray-900"
            >
              Пароль<span className="text-danger">*</span>
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            size="md"
            className="mt-2 flex w-full justify-center"
            disabled={loading}
          >
            {loading ? <Loader size={18} /> : 'Войти'}
          </Button>

          {error && <p className="text-xs text-danger">{error}</p>}

          <div className="space-y-2 pt-2 text-xs text-muted">
            <p className="text-center text-[11px]">
              Для тестового входа используйте любой логин и пароль{' '}
              <span className="font-semibold text-gray-900">123456</span>.
            </p>
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-border" />
              <span>или войдите через</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className="rounded-lg border border-border bg-white px-2 py-1.5 text-[11px] font-medium text-muted hover:bg-background"
              >
                Госуслуги
              </button>
              <button
                type="button"
                className="rounded-lg border border-border bg-white px-2 py-1.5 text-[11px] font-medium text-muted hover:bg-background"
              >
                Сбер ID
              </button>
              <button
                type="button"
                className="rounded-lg border border-border bg-white px-2 py-1.5 text-[11px] font-medium text-muted hover:bg-background"
              >
                VK ID
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}


