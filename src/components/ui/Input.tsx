import { forwardRef, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          className={clsx(
            'w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-gray-900 shadow-soft outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/40',
            error && 'border-danger focus:border-danger focus:ring-danger/30',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'


