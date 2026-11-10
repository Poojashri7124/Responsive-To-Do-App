import {useState, useEffect} from 'react'
import {getTodo} from '../api.js'

export function useTodo(id){
    const [todo, setTodo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadTodo(){
            try{
                setLoading(true)
                setError(null)
                const data = await getTodo(id)
                setTodo(data)

            }
            catch(err){
                setTodo(null)
                setError('Could not load this todo. It may not exist or json server is not running.')

            }
            finally{
                setLoading(false)
            }
        }
        loadTodo()

    },[id])
    return {todo, loading, error}
}