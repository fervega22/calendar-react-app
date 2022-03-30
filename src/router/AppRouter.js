import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

  const dispatch = useDispatch();

  const { checking, uid } = useSelector( state => state.auth);

  useEffect(() => {
  
      dispatch(startChecking());
  
  }, [dispatch]);
  
  if(checking){
    return (<h5>Cargando...</h5>);
  }

  return (
    <div>
        <Router>
            <Switch>
                <PublicRoute 
                  path="/login" 
                  exact 
                  component={ LoginScreen }
                  isAuthenticated={ !!uid }
                />
           
                <PrivateRoute 
                  path="/" 
                  exact 
                  component={ CalendarScreen } 
                  isAuthenticated={ !!uid }
                />
                
            </Switch>
        </Router>
    </div>
    
  )
}
