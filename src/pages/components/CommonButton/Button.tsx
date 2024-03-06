import React from "react";
import { I_Button } from "./I_Button";
const Button = ({ onClick, className,title }: I_Button) => {
    // console.log("Button");
    
    return (
        <>
            <button onClick={onClick} className={className} >
                {title}
            </button>
        </>
    )
}

export default React.memo(Button);