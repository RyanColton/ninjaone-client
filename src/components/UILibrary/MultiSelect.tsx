import React, { useEffect, useRef, useState } from "react"

interface MultiSelectProps<T extends string> {
    children: React.ReactNode
    value: T[]
    onChange: (value: T[]) => void
    className?: string
    label: string
  }
  
interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
value: string
children: React.ReactNode
onClick?: () => void
}
  
function MultiSelectComponent<T extends string>({ children, value, onChange, className = '', label }: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // this is to handle the case where the user clicks outside the dropdown
  // and we want to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (optionSelection: string) => {
    // if the option value is ALL, we want to set the value to ALL
    if (optionSelection === 'ALL') {
      onChange([optionSelection as T])
      return
    }
    
    const newValue = value.includes(optionSelection as T)
      ? value.filter(v => v !== optionSelection)
      : [...value.filter(v => v !== 'ALL'), optionSelection as T]

    // this is to handle the case where the user selects all options except for the ALL option
    // in this case, we want to set the value to ALL
    if (newValue.length === React.Children.count(children) - 1) {
      onChange(['ALL'] as T[])
      return
    }
    // otherwise, we want to set the value to the new value
    onChange(newValue.length ? newValue : ['ALL'] as T[])
  }

  const displayText = value.includes('ALL' as T) 
    ? `${label}: All`
    : `${label}: ${value.length} selected`

  return (
    <div className={`relative ${className || ''}`} ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="device-type-label"
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-sm border-neutral-300 text-neutral-500 text-sm leading-5 px-3 py-2 w-full text-left relative"
      >
        <span id="device-type-label" className="sr-only">Device Type</span>
        {displayText}
        <svg aria-hidden="true" className="absolute right-2 top-1/2 -translate-y-1/2" viewBox="0 0 9 5" width="9" height="5">
          <path d="M1.09766 0C0.605469 0 0.359375 0.601562 0.714844 0.957031L4.21484 4.45703C4.43359 4.67578 4.78906 4.67578 5.00781 4.45703L8.50781 0.957031C8.86328 0.601562 8.61719 0 8.125 0H1.09766Z" fill="#6E6D7A"/>
        </svg>
      </button>

      {isOpen && (
        <div 
          role="listbox"
          aria-multiselectable="true"
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-sm shadow-lg z-10"
        >
          {React.Children.map(children, child => {
            // this is to handle the case where the child is not a valid element
            // in this case, we want to return null
            if (!React.isValidElement(child)) return null
            // this is to handle the case where the child is the ALL option
            // in this case, we want to highlight the ALL option
            const shouldHighlight = value.includes(child.props.value as T) || (value.includes('ALL' as T) && value.length === 1)
            // we are cloning the child element and adding the onClick and className props
            return React.cloneElement(child as React.ReactElement<OptionProps>, {
              role: "option",
              "aria-selected": shouldHighlight,
              onClick: () => toggleOption(child.props.value),
              className: `px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                shouldHighlight ? 'bg-blue-100' : ''
              }`
            })
          })}
        </div>
      )}
    </div>
  )
}

const Option = ({ children, onClick, value, ...props }: OptionProps) => (
    <div onClick={onClick} {...props}>
        {children}
    </div>
)

const MultiSelect = Object.assign(MultiSelectComponent, {
  Option: Option
})

export default MultiSelect