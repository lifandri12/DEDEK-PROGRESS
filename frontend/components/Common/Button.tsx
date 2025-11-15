export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false 
}: { 
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
}) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClass} ${className} disabled:opacity-50`}
    >
      {children}
    </button>
  )
}
