import { useHistory, Route } from 'react-router-dom'

import Dashboard from '../screen/admin/dashboard/Dashboard'
import User from '../screen/admin/user/User'
import UserCreate from '../screen/admin/user/UserCreate'
import Gsindex from '../screen/admin/gsindex/Gsindex'
import University from '../screen/admin/university/University'


import { routerPathProtected } from './RouterPath'
import { RootState } from './../store/ConfigureStore'
import { useSelector } from 'react-redux'
import UniversityCreate from '../screen/admin/university/UniversityCreate'


function ProtectedRoutes() {

    const history = useHistory()

    const authen = useSelector((state: RootState) => state.user.auth)

    if (!authen) {
        history.replace(`/login`)
    }

    return (
        <>
        <Route  exact path={`${routerPathProtected.Dashboard}`} component={Dashboard} />
        <Route  exact path={`${routerPathProtected.User}`} component={User} />
        <Route  exact path={`${routerPathProtected.UserCreate}`} component={UserCreate} />
        <Route  exact path={`${routerPathProtected.Gsindex}`} component={Gsindex} />
        <Route  exact path={`${routerPathProtected.University}`} component={University} />
        <Route  exact path={`${routerPathProtected.UniversityCreate}`} component={UniversityCreate} />
        </>
    )
}

export default ProtectedRoutes