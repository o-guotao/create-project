import React from "react";



type Props = { 
    children: React.ReactNode,
    className?: string
}
export default function Card({children, className}: Props) {
    return (
        <div className={`bg-white border border-slate-200 m-2 rounded-sm shadow-md  ${className}`}>
            {children}
        </div>
    )
}