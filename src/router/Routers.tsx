import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import { routerPathProtected, routerPathPublic } from './RouterPath';

import Login from '../screen/auth/Login'
import { systemConfig } from '../config/System';



function Routers() {
    return (
        <Router basename={systemConfig.BaseRouter}>
            <Switch>
                <Route exact path={`/`} component={Login} />
                <Route exact path={`${routerPathPublic.Login}`} component={Login} />
                <Route path={Object.values(routerPathProtected)} component={ProtectedRoutes} />
            </Switch>
        </Router>
    )
}

export default Routers