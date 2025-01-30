import { InputHTMLAttributes } from "react";

export function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full pl-4 pr-4 py-2 border rounded-sm text-sm leading-[21px] border-neutral-300 text-neutral-400 ${props.className || ''}`}/>
}