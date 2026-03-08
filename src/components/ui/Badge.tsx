import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type BadgeProps = {
  children: ReactNode
  variant?: 'default' | 'success' | 'outline'
  className?: string
} & HTMLAttributes<HTMLSpanElement>

export function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium'

  const variants: Record<typeof variant, string> = {
    default: 'bg-primary/10 text-primary-dark',
    success: 'bg-success/10 text-success',
    outline: 'border border-border text-muted',
  }

  return (
    <span className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </span>
  )
}


