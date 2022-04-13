import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import { routerPathProtected, routerPathPublic } from './RouterPath';

import Login from '../screen/auth/Login'
import { systemConfig } from '../config/System';
import Paperbase from '../template/Paperbase';



function Routers() {
    return (
        <Router basename={systemConfig.BaseRouter}>
            <Route exact path={`${routerPathPublic.Login}`} component={Login} />
            <Route path={`/`} component={() => <Paperbase children={
                <Switch>
                    <Route path={Object.values(routerPathProtected)} component={ProtectedRoutes} />
                </Switch>
            } />} ></Route>
        </Router>
    )
}

export default Routers