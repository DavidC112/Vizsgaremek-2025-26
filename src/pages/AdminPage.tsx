import AdminNavBar from '../components/AdminPage/AdminNavBar'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div>
        <AdminNavBar/>
        <Outlet/>
    </div>
  )
}

export default AdminPage