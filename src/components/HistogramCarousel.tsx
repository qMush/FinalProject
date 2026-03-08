import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

type HistogramItem = {
  date: string
  totalDocuments: number
  riskFactors: number
}

type Props = {
  data: HistogramItem[]
}

export function HistogramCarousel({ data }: Props) {
  const maxTotal = Math.max(...data.map((d) => d.totalDocuments), 1)

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={12}
      slidesPerView={Math.min(7, data.length)}
      navigation
      className="!pb-4"
    >
      {data.map((item) => {
        const totalHeight = (item.totalDocuments / maxTotal) * 100
        const riskHeight = Math.min(
          100,
          (item.riskFactors / Math.max(item.totalDocuments, 1)) * 100,
        )

        return (
          <SwiperSlide key={item.date}>
            <div className="flex flex-col items-center gap-1 text-[10px]">
              <div className="flex h-32 w-8 flex-col justify-end gap-0.5 rounded-full bg-background p-1">
                <div
                  className="w-full rounded-full bg-primary/70"
                  style={{ height: `${totalHeight}%` }}
                  aria-hidden
                />
                <div
                  className="w-full rounded-full bg-danger/80"
                  style={{ height: `${riskHeight}%` }}
                  aria-hidden
                />
              </div>
              <span className="mt-0.5 text-[9px] text-muted">
                {item.date.slice(-5)}
              </span>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}


