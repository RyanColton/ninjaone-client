import { forwardRef, type SelectHTMLAttributes, type OptionHTMLAttributes } from 'react'
import { useState, useRef, useEffect } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
    multiple?: boolean
    className?: string
  }

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode
}

const Option = forwardRef<HTMLOptionElement, OptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <option ref={ref} {...props}>
        {children}
      </option>
    )
  }
)

const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
    ({ children, multiple, className = '', ...props }, ref) => {
      return (
        <div className="relative">
          <select 
            ref={ref}
            multiple={multiple}
            {...props} 
            className={`
              border rounded-sm border-neutral-300 
              text-neutral-500 text-sm leading-5 
              px-3 py-2 appearance-none pr-8 w-full 
              ${multiple ? 'h-32' : ''} 
              ${className}
              ${multiple ? '[&>option]:p-2 [&>option]:border-b [&>option:last-child]:border-b-0 [&>option]:border-neutral-100' : ''}
              ${multiple ? '[&>option:hover]:bg-blue-50' : ''}
              ${multiple ? '[&>option:checked]:bg-blue-100' : ''}
            `}
          >
            {children}
          </select>
          <svg 
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" 
            viewBox="0 0 9 5" 
            width="9" 
            height="5"
          >
            <path 
            d="M1.09766 0C0.605469 0 0.359375 0.601562 0.714844 0.957031L4.21484 4.45703C4.43359 4.67578 4.78906 4.67578 5.00781 4.45703L8.50781 0.957031C8.86328 0.601562 8.61719 0 8.125 0H1.09766Z" 
            fill="#6E6D7A"
            />
          </svg>
        </div>
      )
    }
  )


const Select = Object.assign(SelectComponent, {
  Option: Option
})

export default Select   