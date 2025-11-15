export function Input({ 
  label, 
  type = 'text', 
  placeholder,
  value,
  onChange,
  required = false
}: {
  label?: string
  type?: string
  placeholder?: string
  value?: any
  onChange?: (e: any) => void
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field"
      />
    </div>
  )
}
