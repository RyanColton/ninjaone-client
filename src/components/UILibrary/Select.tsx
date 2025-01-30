// The only reason for this layer of abstraction is beacause of the custom svg icon for the dropdown arrow
// In general I prefer to use the native html elements and style it while using tailwind
// If I was using a css in js library like styled components I would be more likely to create more components like this

import { forwardRef, type SelectHTMLAttributes, type OptionHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
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
  ({ children, ...props }, ref) => {
    return (
      <div className="relative">
        <select 
          ref={ref}
          {...props} 
          className="border rounded-sm border-[#D1D0D9] text-[#6E6D7A] text-sm leading-5 px-3 py-2 appearance-none pr-8 w-full"
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

export const Select = Object.assign(SelectComponent, {
  Option: Option
})

export default Select   