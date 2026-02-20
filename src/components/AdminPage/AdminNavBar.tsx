import { Link } from 'react-router-dom'

const AdminNavBar = () => {
  return (
    <nav className='space-x-5'>
        <Link to="users">Users</Link> 
        <Link to="activities">Activities</Link> 
        <Link to="ingredients">Ingredints</Link>
        <Link to="recipes">Recipes</Link>
    </nav>
  )
}

export default AdminNavBar