import { SearchForm } from '../components/SearchForm'
import { HistogramCarousel } from '../components/HistogramCarousel'
import { PublicationCard } from '../components/PublicationCard'
import { Card } from '../components/ui/Card'
import { Loader } from '../components/ui/Loader'
import { useState } from 'react'

type HistogramItem = {
  date: string
  totalDocuments: number
  riskFactors: number
}

type Publication = {
  id: string
  date: string
  sourceName: string
  sourceUrl: string
  title: string
  tags: string[]
  content: string
  wordCount: number
}

export default function SearchPage() {
  const [loading, setLoading] = useState(false)
  const [histogram, setHistogram] = useState<HistogramItem[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [visibleCount, setVisibleCount] = useState(10)

  return (
    <div className="container pb-16 pt-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        <Card className="self-start rounded-2xl border-border bg-white p-6">
          <h1 className="mb-1 text-xl font-semibold text-gray-900">
            Поиск публикаций
          </h1>
          <p className="mb-6 text-xs text-muted">
            Заполните форму ниже, чтобы получить выборку публикаций по ИНН и другим
            параметрам. Все поля со знаком <span className="text-danger">*</span>{' '}
            обязательны для заполнения.
          </p>
          <SearchForm
            onStart={() => {
              setLoading(true)
              setHistogram([])
              setPublications([])
              setVisibleCount(10)
            }}
            onFinish={(data) => {
              setLoading(false)
              setHistogram(data.histogram)
              setPublications(data.publications)
            }}
          />
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-border bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Динамика публикаций
                </h2>
                <p className="text-[11px] text-muted">
                  Общее количество материалов и риск‑факторы по дням.
                </p>
              </div>
            </div>
            {loading && (
              <div className="py-10">
                <Loader />
              </div>
            )}
            {!loading && histogram.length === 0 && (
              <p className="py-8 text-center text-xs text-muted">
                Результаты появятся после выполнения первого запроса.
              </p>
            )}
            {!loading && histogram.length > 0 && (
              <HistogramCarousel data={histogram} />
            )}
          </Card>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                Публикации
              </h2>
              {publications.length > 0 && (
                <span className="text-[11px] text-muted">
                  Показано {Math.min(visibleCount, publications.length)} из{' '}
                  {publications.length}
                </span>
              )}
            </div>

            {loading && (
              <Card className="rounded-2xl border-border bg-white p-6">
                <Loader />
              </Card>
            )}

            {!loading && publications.length === 0 && (
              <Card className="rounded-2xl border-border bg-white p-6 text-xs text-muted">
                После выполнения запроса здесь появится список найденных публикаций с
                возможностью перейти к первоисточнику.
              </Card>
            )}

            {!loading &&
              publications
                .slice(0, visibleCount)
                .map((pub) => <PublicationCard key={pub.id} publication={pub} />)}

            {!loading && visibleCount < publications.length && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-xs font-medium text-primary-dark hover:text-primary-light"
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                >
                  Показать больше
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


