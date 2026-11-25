import {useMemo} from 'react'
const priorities = ['High', 'Medium', 'Low']

export function useTodoStats(todos){
    return useMemo(() => {
        const total = todos.length
        const completed = todos.filter((t) => t.completed).length
        const pending = total - completed
        const percent = total === 0 ? 0: Math.round((completed/total)*100)
        const byPriority = priorities.map((name)=>({
            name,
            count: todos.filter((t) => t.priority === name).length,
        }))
        return {total,completed,pending,percent,byPriority}
        },[todos])
    
}