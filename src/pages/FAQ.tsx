import { Card } from '../components/ui/Card'

const faqs = [
  {
    q: 'Можно ли протестировать сервис до покупки?',
    a: 'В демонстрационной версии данного проекта доступен только тестовый режим без реальных данных. В боевом продукте СКАН обычно предоставляется пилотный период и доступ к API по договору.',
  },
  {
    q: 'Какие источники покрывает СКАН?',
    a: 'Информационная лента Интерфакс, федеральные и региональные СМИ, профильные деловые издания. Точный перечень зависит от коммерческого контракта.',
  },
  {
    q: 'Можно ли интегрировать СКАН с нашими внутренними системами?',
    a: 'Да, в Enterprise‑тарифах предусмотрен доступ по API, возможность подключения SSO и кастомных сценариев выгрузки данных.',
  },
]

export default function FAQPage() {
  return (
    <div className="pb-16 pt-8">
      <div className="container space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">FAQ</h1>
          <p className="mt-1 text-sm text-muted">
            Раздел с часто задаваемыми вопросами о возможностях и подключении сервиса
            СКАН. В этой демо‑версии приведены примерные ответы.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item) => (
            <Card
              key={item.q}
              className="rounded-2xl border-border bg-white p-4 text-sm"
            >
              <h2 className="mb-1 text-sm font-semibold text-gray-900">
                {item.q}
              </h2>
              <p className="text-xs text-muted">{item.a}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-4 rounded-2xl border-dashed border-border bg-background p-4 text-xs text-muted">
          В реальном продукте здесь будет более подробная документация по SLA, юридическим
          ограничениям и вариантам интеграции. Сейчас это демонстрационный интерфейс без
          привязки к продакшн‑бэкенду.
        </Card>
      </div>
    </div>
  )
}


