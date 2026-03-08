import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ShieldCheck, LineChart, Clock, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const whyItems = [
  {
    icon: ShieldCheck,
    title: 'Официальные источники',
    description:
      'Данные напрямую из ленты Интерфакс и партнерских СМИ с юридически значимым статусом.',
  },
  {
    icon: LineChart,
    title: 'Глубокая аналитика',
    description:
      'Гистограммы, динамика упоминаний и риск‑факторы для точной оценки информационного фона.',
  },
  {
    icon: Clock,
    title: 'Мониторинг 24/7',
    description:
      'Моментальный поиск по архиву публикаций и уведомления о новых материалах.',
  },
  {
    icon: Search,
    title: 'Поиск по ИНН',
    description:
      'Исключите однофамильцев и совпадения по названию — работаем с ИНН компании.',
  },
]

const tariffs = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Для небольших команд и точечных проверок контрагентов.',
    price: '4 900 ₽',
    period: 'в месяц',
    highlight: 'green',
    features: ['До 100 запросов в месяц', 'История за 1 год', 'Базовые фильтры'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Оптимальный тариф для внутреннего комплаенса и служб безопасности.',
    price: '12 900 ₽',
    period: 'в месяц',
    highlight: 'blue',
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
    highlight: 'dark',
    features: [
      'Неограниченное число запросов',
      'Полный архив',
      'Доступ по API и SSO',
    ],
  },
]

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-20 pb-20">
      <section className="bg-gradient-to-b from-primary-dark/90 via-primary-soft/90 to-primary-dark/95 text-white">
        <div className="container flex flex-col gap-10 py-16 md:flex-row md:items-center md:py-24">
          <div className="max-w-xl space-y-6">
            <Badge variant="success" className="bg-white/10 text-xs text-white">
              Медиа‑мониторинг для комплаенса и рисков
            </Badge>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              Поиск публикаций по ИНН. Быстро. Точно. Легально.
            </h1>
            <p className="text-sm text-white/80 md:text-base">
              СКАН помогает службам безопасности, юристам и комплаенс‑офицерам
              оперативно находить и анализировать упоминания контрагентов в СМИ.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {isAuthenticated ? (
                <Button
                  size="lg"
                  onClick={() => navigate('/search')}
                  className="px-6"
                >
                  Запросить данные
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="px-6"
                >
                  Войти, чтобы запросить данные
                </Button>
              )}
              <span className="text-xs text-white/70">
                Доступ только по подписке. Подключение за 1 день.
              </span>
            </div>
          </div>

          <Card className="relative mt-2 flex-1 overflow-hidden rounded-2xl border-white/10 bg-white/5 p-6 text-sm text-white/90 backdrop-blur">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              Дашборд запроса
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">ИНН компании</span>
                <span className="rounded-full bg-black/30 px-2 py-0.5 text-xs font-mono">
                  7707083893
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Всего публикаций</span>
                <span className="text-base font-semibold">1 248</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Риск‑факторы</span>
                <span className="rounded-full bg-danger/20 px-2.5 py-0.5 text-xs font-medium text-danger">
                  32 материала
                </span>
              </div>
            </div>
            <div className="mt-6 h-24 rounded-xl bg-black/10">
              {/* Placeholder for histogram illustration */}
            </div>
          </Card>
        </div>
      </section>

      <section className="container space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Почему именно мы
            </h2>
            <p className="mt-1 text-sm text-muted">
              Продуманная аналитика и удобный интерфейс для ежедневной работы.
            </p>
          </div>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-4">
          {whyItems.map((item) => (
            <Card
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border-border bg-white/90 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-dark">
                <item.icon size={20} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
              <p className="text-xs text-muted">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            pagination={{ clickable: true }}
          >
            {whyItems.map((item) => (
              <SwiperSlide key={item.title}>
                <Card className="flex h-full flex-col gap-3 rounded-2xl border-border bg-white/90 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-dark">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted">{item.description}</p>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="pricing" className="bg-white py-16">
        <div className="container space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Наши тарифы</h2>
              <p className="mt-1 text-sm text-muted">
                Выберите подходящий тариф или свяжитесь с нами для индивидуального
                предложения.
              </p>
            </div>
            <Link
              to="/login"
              className="text-xs font-medium text-primary-dark hover:text-primary-light"
            >
              Нужен корпоративный договор?
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
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tariff.name}
                    </h3>
                    {tariff.current && (
                      <Badge variant="success">Текущий тариф</Badge>
                    )}
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
                    {tariff.current ? 'Перейти в ЛК' : 'Подробнее'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="container space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Часто задаваемые вопросы
        </h2>
        <p className="text-sm text-muted">
          В демонстрационной версии раздел FAQ не реализован. В боевом сервисе здесь
          будут юридические детали, SLA и варианты подключения.
        </p>
      </section>
    </div>
  )
}


