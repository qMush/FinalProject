import { ClipLoader } from 'react-spinners'
import clsx from 'clsx'

type LoaderProps = {
  size?: number
  className?: string
}

export function Loader({ size = 24, className }: LoaderProps) {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <ClipLoader color="#0057B7" size={size} />
    </div>
  )
}


