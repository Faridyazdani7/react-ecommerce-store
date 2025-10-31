import  { type ComponentProps } from "react"

type Tvariant="primary" | "secondery"|"danger"|"success"|"warning";

type TButton= ComponentProps<"button">& {
    variant?:Tvariant
}
function Button({children ,variant,style, ...rest}:TButton){
    console.log(checkVariant(variant))
    return(
        <button {...rest} style={{...style,...checkVariant(variant)}}>
        {children}
        </button>
    )
}
export default Button 

function checkVariant(variant?:Tvariant){
    if(variant==="primary"){
        return{backgroundColor:"#008bff",color:"white"};
    }
    else if(variant==="secondery"){
        return{backgroundColor:"gray",color:"black"}
    }
        else if(variant==="danger"){
        return{backgroundColor:"red",color:"white"}
    }
        else if(variant==="success"){
        return{backgroundColor:"green",color:"white"}
    }
        else if(variant==="warning"){
        return{backgroundColor:"yellow",color:"white"}
    }
}