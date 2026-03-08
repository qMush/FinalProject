import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60'

  const variants: Record<typeof variant, string> = {
    primary:
      'bg-primary text-white shadow-card hover:bg-primary-soft active:scale-[0.99]',
    outline:
      'border border-border bg-white text-primary-dark hover:bg-background active:scale-[0.99]',
    ghost:
      'bg-transparent text-primary-dark hover:bg-background active:bg-background/80',
  }

  const sizes: Record<typeof size, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}


