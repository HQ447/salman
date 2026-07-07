import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

function AdminLayout() {
    return (
        <div>
            <AdminSidebar />
            <Outlet />
        </div>
    )
}

export default AdminLayout