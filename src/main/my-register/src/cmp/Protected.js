import React from 'react'
import { Redirect, Route } from 'react-router-dom'


const Protected = ({component:Cmp,roles,...rest})=>{
    return <Route {...rest} render={(props)=>{
        return localStorage.getItem('user') ? <Cmp {...props}/>
        :
        <Redirect to="/user/login"/> 
    }}
    />
}

export default Protected;
