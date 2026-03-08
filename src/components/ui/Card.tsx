import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type CardProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-card border border-border/70 bg-white shadow-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}


