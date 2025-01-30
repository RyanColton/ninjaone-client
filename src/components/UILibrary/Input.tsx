import { InputHTMLAttributes } from "react";

export function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full pl-4 pr-4 py-2 border rounded-sm text-sm leading-5 border-[#D1D0D9] text-[#88859E] ${props.className || ''}`}/>
}