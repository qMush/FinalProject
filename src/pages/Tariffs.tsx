import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

const tariffs = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Для небольших команд и точечных проверок контрагентов.',
    price: '4 900 ₽',
    period: 'в месяц',
    features: ['До 100 запросов в месяц', 'История за 1 год', 'Базовые фильтры'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Оптимальный тариф для внутреннего комплаенса и служб безопасности.',
    price: '12 900 ₽',
    period: 'в месяц',
    features: [
      'До 1 000 запросов в месяц',
      'История за 5 лет',
      'Гистограммы и риск‑факторы',
    ],
    current: true,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Для крупных корпоративных клиентов и интеграций.',
    price: 'Индивидуально',
    period: '',
    features: [
      'Неограниченное число запросов',
      'Полный архив',
      'Доступ по API и SSO',
    ],
  },
]

export default function TariffsPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white pb-16 pt-8">
      <div className="container space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Наши тарифы</h1>
            <p className="mt-1 text-sm text-muted">
              Тарифные планы СКАН для разных сценариев использования: от точечной
              проверки контрагентов до корпоративных интеграций.
            </p>
          </div>
          <Link
            to="/login"
            className="text-xs font-medium text-primary-dark hover:text-primary-light"
          >
            Обсудить индивидуальные условия
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tariffs.map((tariff) => (
            <Card
              key={tariff.id}
              className={`relative flex flex-col justify-between rounded-2xl border-2 ${
                tariff.current
                  ? 'border-primary-soft shadow-lg shadow-primary/10'
                  : 'border-border'
              } p-6`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {tariff.name}
                  </h2>
                  {tariff.current && <Badge variant="success">Текущий тариф</Badge>}
                </div>
                <p className="text-xs text-muted">{tariff.description}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-gray-900">
                    {tariff.price}
                  </span>
                  {tariff.period && (
                    <span className="text-xs text-muted">{tariff.period}</span>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <ul className="space-y-1.5 text-xs text-muted">
                  {tariff.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <Button
                  variant={tariff.current ? 'primary' : 'outline'}
                  size="md"
                  className="w-full justify-center"
                  onClick={() =>
                    tariff.current ? navigate('/search') : navigate('/login')
                  }
                >
                  {tariff.current ? 'Перейти в ЛК' : 'Подключить'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


