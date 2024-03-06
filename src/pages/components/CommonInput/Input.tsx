import React, { useEffect, useRef } from "react";
import { I_input } from "./I_input";




const Input = ({ label, placeholder, value, onChange, type, error, errormsg, className,name }:I_input) => {
    const inputError = useRef<HTMLInputElement | null>(null);
    console.log('eee', error.includes(name));
    console.log('error value', error.includes(name));
    
    useEffect(()=>{
        if(error.length > 0 ){
           inputError.current?.focus();
        }
        
    },[error]);

    

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                // ref={inputError}
                className={`shadow appearance-none border rounded ${className} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.length > 0 && error.includes(name) && 'border-[red]' }`}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e)}
                // onChange={(e) => onChange((form:any)=>{return{...form,[e.target.name]:e.target.value}})}
            />
            {error.length > 0 && error.includes(name) && <label className="block text-[red] text-sm font-bold mt-2">{errormsg}</label>}
        </div>
    );
};

export default React.memo(Input);
