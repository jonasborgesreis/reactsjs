import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Veiculos from './pages/veiculos'
import Login from './pages/login'
// import { isAuthenticated } from './auth'

const Router = () => (
  <Switch>
    <Route exact path='/' component={Login}/>
    <Route path='/veiculos' component={Veiculos}/>
  </Switch>
)

export default Router
