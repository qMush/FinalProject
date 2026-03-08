import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ru } from 'date-fns/locale'
import { addMonths } from 'date-fns'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

type Tonality = 'any' | 'positive' | 'negative'

type SearchFormProps = {
  onStart: () => void
  onFinish: (data: {
    histogram: { date: string; totalDocuments: number; riskFactors: number }[]
    publications: {
      id: string
      date: string
      sourceName: string
      sourceUrl: string
      title: string
      tags: string[]
      content: string
      wordCount: number
    }[]
  }) => void
}

export function SearchForm({ onStart, onFinish }: SearchFormProps) {
  const [inn, setInn] = useState('')
  const [innError, setInnError] = useState<string | null>(null)
  const [tonality, setTonality] = useState<Tonality>('any')
  const [onlyMainRole, setOnlyMainRole] = useState(true)
  const [onlyRisk, setOnlyRisk] = useState(false)
  const [includeTechNews, setIncludeTechNews] = useState(true)
  const [includeAnnouncements, setIncludeAnnouncements] = useState(true)
  const [includeDigests, setIncludeDigests] = useState(true)
  const [docsCount, setDocsCount] = useState(100)
  const [docsError, setDocsError] = useState<string | null>(null)
  const [from, setFrom] = useState<Date | null>(addMonths(new Date(), -1))
  const [to, setTo] = useState<Date | null>(new Date())

  const validateInnValue = (value: string) => {
    if (!value) {
      setInnError('Поле обязательно для заполнения.')
      return false
    }
    if (!/^\d{10}(\d{2})?$/.test(value)) {
      setInnError('ИНН должен содержать 10 или 12 цифр.')
      return false
    }
    // В демонстрационном режиме не проверяем контрольные цифры,
    // чтобы можно было использовать тестовые значения вроде 1234567890.
    setInnError(null)
    return true
  }

  const validateDocsCount = (value: number) => {
    if (!Number.isFinite(value)) {
      setDocsError('Введите число от 1 до 1000.')
      return false
    }
    if (value < 1 || value > 1000) {
      setDocsError('Диапазон от 1 до 1000 документов.')
      return false
    }
    setDocsError(null)
    return true
  }

  const isValid =
    !innError &&
    !docsError &&
    inn.length >= 10 &&
    !!from &&
    !!to &&
    docsCount >= 1 &&
    docsCount <= 1000

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const okInn = validateInnValue(inn)
    const okDocs = validateDocsCount(docsCount)
    if (!okInn || !okDocs) return

    onStart()

    // Заглушка вместо реального API: возвращаем мок‑данные
    setTimeout(() => {
      const histogram = Array.from({ length: 10 }).map((_, i) => ({
        date: `2025-12-${(i + 1).toString().padStart(2, '0')}`,
        totalDocuments: Math.round(Math.random() * 50) + 5,
        riskFactors: Math.round(Math.random() * 10),
      }))

      const publications = Array.from({ length: 24 }).map((_, i) => ({
        id: `${i + 1}`,
        date: '12.12.2025',
        sourceName: 'Интерфакс',
        sourceUrl: 'https://www.interfax.ru',
        title: `Публикация №${i + 1} по компании с ИНН ${inn}`,
        tags: [
          includeTechNews && 'технические новости',
          includeAnnouncements && 'анонсы',
          includeDigests && 'сводки',
        ].filter(Boolean) as string[],
        content:
          '<p>Здесь будет HTML‑контент публикации, полученный из API Интерфакс. В демо‑версии отображается статический текст.</p>',
        wordCount: 350 + i * 5,
      }))

      onFinish({ histogram, publications })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="inn" className="flex items-center gap-1 text-gray-900">
            ИНН компании<span className="text-danger">*</span>
          </label>
          <Input
            id="inn"
            placeholder="7707083893"
            value={inn}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '')
              setInn(v)
            }}
            onBlur={(e) => validateInnValue(e.target.value)}
            error={innError ?? undefined}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="tonality"
            className="flex items-center gap-1 text-gray-900"
          >
            Тональность<span className="text-danger">*</span>
          </label>
          <select
            id="tonality"
            value={tonality}
            onChange={(e) => setTonality(e.target.value as Tonality)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-gray-900 shadow-soft outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/40"
          >
            <option value="any">Любая</option>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <span className="flex items-center gap-1 text-sm text-gray-900">
            Диапазон дат<span className="text-danger">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            <DatePicker
              selected={from}
              onChange={(date) => setFrom(date)}
              selectsStart
              startDate={from}
              endDate={to}
              maxDate={to ?? undefined}
              dateFormat="dd.MM.yyyy"
              locale={ru}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-gray-900 shadow-soft outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/40"
              placeholderText="С"
            />
            <DatePicker
              selected={to}
              onChange={(date) => setTo(date)}
              selectsEnd
              startDate={from}
              endDate={to}
              minDate={from ?? undefined}
              dateFormat="dd.MM.yyyy"
              locale={ru}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-gray-900 shadow-soft outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/40"
              placeholderText="По"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="docsCount"
            className="flex items-center gap-1 text-gray-900"
          >
            Количество документов<span className="text-danger">*</span>
          </label>
          <Input
            id="docsCount"
            type="number"
            min={1}
            max={1000}
            value={docsCount}
            onChange={(e) => setDocsCount(Number(e.target.value))}
            onBlur={(e) => validateDocsCount(Number(e.target.value))}
            error={docsError ?? undefined}
          />
          <p className="text-[11px] text-muted">Максимум 1000 документов.</p>
        </div>
      </div>

      <div className="grid gap-3 text-xs text-gray-900 sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyMainRole}
            onChange={(e) => setOnlyMainRole(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary-light"
          />
          Признавать только главную роль в публикации
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyRisk}
            onChange={(e) => setOnlyRisk(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary-light"
          />
          Показывать только риск‑факторы
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeTechNews}
            onChange={(e) => setIncludeTechNews(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary-light"
          />
          Включать технические новости
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeAnnouncements}
            onChange={(e) => setIncludeAnnouncements(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary-light"
          />
          Включать анонсы и календарь
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeDigests}
            onChange={(e) => setIncludeDigests(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary-light"
          />
          Включать сводки и обзоры
        </label>
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" className="w-full justify-center" disabled={!isValid}>
          Поиск
        </Button>
      </div>
    </form>
  )
}


