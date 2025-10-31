import { useEffect, useState } from "react"

export function useLocalStorage<T>(key:string,intialValue: T){

    const [value,setValue]=useState<T>(()=>{
        let localCart=localStorage.getItem("cartItems")
        if(localCart != null) return JSON.parse(localCart);
        else {
            return intialValue
        }
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value,setValue])

    return [value,setValue] as [typeof value ,typeof setValue]

}