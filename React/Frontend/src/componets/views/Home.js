import React from 'react'
import Auth from './../../models/Auth'

const Home = ({reRender}) =>{

    function handleSubmit(evt){
        evt.preventDefault()
        const target = evt.target
        const password = target.password.value
        const userName = target.username.value
        Auth.sendLoginToServer(userName,password,function(token){
            if(token != null){
                Auth.authenticateUser(token,userName)
                reRender()
            }
            else{
                alert("Username and Password did not match!")
            }
        })
    }

    function logout(){
        console.log("Here is logout!")
        Auth.deauthenticateUser()
        reRender()
    }

    if(!Auth.isUserAuthenticated()){
   return (

    <div>
        <h2> This is Home!    </h2>

        <h4>Login</h4>
            <form id="loginform" className="col-md-4" onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input id="username" className="form-control"/>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control"/>
                <br/>
                <button type="submit"className="btn">
                    Login
                </button>
                </div>
            </form>
    </div>
    )}
    else{
        return(
            <div>
                <h2>Welcome Home  {Auth.getUserName()}</h2>
                <p>Your token is : {Auth.getToken()}</p>
                <br/>
                <br/>
                <input type="button" value="Logout" onClick={logout}/>
            </div>
        )
    }
}
export default Home