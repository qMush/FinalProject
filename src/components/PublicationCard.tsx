import { Card } from './ui/Card'
import { Button } from './ui/Button'

export type Publication = {
  id: string
  date: string
  sourceName: string
  sourceUrl: string
  title: string
  tags: string[]
  content: string
  wordCount: number
}

type Props = {
  publication: Publication
}

export function PublicationCard({ publication }: Props) {
  return (
    <Card className="rounded-2xl border-border bg-white p-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
          <span>{publication.date}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <a
            href={publication.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary-dark hover:text-primary-light"
          >
            {publication.sourceName}
          </a>
        </div>
      </div>

      <h3 className="mb-2 text-sm font-semibold text-gray-900">
        {publication.title}
      </h3>

      {publication.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="mt-1 text-xs leading-relaxed text-gray-700 [&_p]:mb-2 [&_p:last-child]:mb-0"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: publication.content }}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3 text-[11px] text-muted">
        <span>Объём: ~{publication.wordCount} слов</span>
        <Button
          variant="outline"
          size="sm"
          className="px-3 text-[11px]"
          onClick={() => window.open(publication.sourceUrl, '_blank', 'noreferrer')}
        >
          Читать в источнике
        </Button>
      </div>
    </Card>
  )
}


