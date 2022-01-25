import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import store from "../Redux/store"
function ProtectedRoute({component: Component,...rest}) {
    const user =  store.getState()
    console.log("🈴 >>>>> user from protected route🛢",user,user.user === null)
    return (
        <Route {...rest} render={
           props => {
            if(user.user !== null){
                return   <Component {...rest} {...props} />
            }else{
                return <Redirect to={{
                    pathname:'/SignUp',
                state:{
                    from:props.location
                }
            }}/>
        }
    }
    }/>
       
    )
}

export default ProtectedRoute
