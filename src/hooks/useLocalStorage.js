import { useState, useEffect} from 'react'

export function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(() => {
        try{
            const saved = localStorage.getItem(key)
            return saved !== null ? JSON.parse(saved) : initialValue
        }
        catch(err){
            return initialValue 
        }
    })
    useEffect(() => {
        try{
            localStorage.setItem(key, JSON.stringify(value))

        }catch(err){

        }
    },[key, value])
    return [value, setValue]
}