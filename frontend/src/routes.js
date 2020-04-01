import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Administrador from './pages/Administrador';
import Listagem from './pages/Listagem';
import NewIncident from './pages/NewIncident';

export default function Routes() {

    const basename = '/react';
    
    return (            
        <BrowserRouter basename={basename}>
            <Switch>
            <Route path="/" exact component={Logon} />   
            <Route path="/register" component={Register} />
            
            <Route path="/Profile" component={Profile} />
            <Route path="/Administrador" component={Administrador} />
            <Route path="/Listagem" component={Listagem} />
            <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}