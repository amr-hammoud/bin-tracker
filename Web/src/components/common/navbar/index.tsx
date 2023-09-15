import React from 'react'

interface NavbarProps {
    label?: string
}

export default function Navbar (props: NavbarProps) {
    return (
        <div className='px-5 py-3 font-semibold text-2xl text-neutral-0 bg-primary-500 w-full'>
            {props.label}
        </div>
    );
}