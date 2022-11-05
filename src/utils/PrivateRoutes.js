import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = {'token':false}

    const checkAuth = localStorage.getItem('author')
    if(checkAuth) {
        auth.token = true;
    }
    if(checkAuth === null) {
        auth.token = true;
    }
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes
