import Progress from '../components/Progress'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'

function TodoPage({ tasks,
    filter,
    error,
    loading,
    onQueryChange,
    onAdd,
    query,
    onToggle,
    onEdit,
    onClear,
    onDelete,}){

        const search = query.trim().toLowerCase()
        const visibleTasks = tasks.filter((task) => {
            if(filter === 'Active' && task.completed) return false
            if (filter === 'Completed' && !task.completed) return false
            return task.text.toLowerCase().includes(search) 
        })
        const remaining = tasks.filter((tasks) => !tasks.completed).length
        const done = tasks.length - remaining
        const showList = !loading && !(error && tasks.length ===0)
        return (
            <>
                <Progress done = {done} total = {tasks.length} />
                <TaskForm onAdd = {onAdd} />
                <SearchBar query = {query} onChange = {onQueryChange}/>

                {loading && <p className="status"> Loading....</p>}
                {showList && (
                    <TaskList
                    tasks = {visibleTasks}
                    filter = {filter}
                    searching = {search !== ''}
                    onToggle = {onToggle}
                    onDelete = {onDelete}
                    onEdit = {onEdit}
                />                
                )}
            
            <Footer remaining = {remaining} onClear = {onClear} />
            </>
        )
    }
export default TodoPage