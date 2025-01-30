export default function Button({ 
    variant = 'primary',
    ...props 
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger'
  }) {
    const baseStyles = "p-3 rounded-sm text-sm leading-3 flex flex-row items-center cursor-pointer"
    const variants = {
      primary: "bg-[#337AB7] text-white hover:bg-[#337AB7]/90",
      secondary: "border border-[#48446940] text-[#337AB7] hover:bg-[#F4F4F5]",
      danger: "bg-[#F44336] text-white hover:bg-[#F44336]/90"
    }
  
    return (
      <button 
        {...props} 
        className={`${baseStyles} ${variants[variant]} ${props.className || ''}`}
      />
    )
  } 