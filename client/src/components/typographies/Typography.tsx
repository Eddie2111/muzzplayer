import React from "react";
function TypographyHeading({children}:{children:React.ReactNode}){
    return(
        <p className="my-8 text-8xl hover:font-bold hover:underline hover:underline-offset-1 duration-200">{children}</p>
    )
}

function TypographyTitle({children}:{children:React.ReactNode}){
    return(
        <p className="my-8 text-4xl hover:font-bold hover:underline hover:underline-offset-1 duration-200">{children}</p>
    )
}

export {
    TypographyHeading,
    TypographyTitle
}