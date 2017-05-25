import React from 'react'
import {Component } from 'react'
import Home from './views/Home'
import Blog from './views/Blog'
import Product from './views/Product'
import Details from './views/Details'
import LoginStatus from './views/LoginStatus'
import {observer} from 'mobx-react'
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import NoMatch404 from './views/NoMatch404'

@observer
class RouterComponent extends Component{

    constructor(props){
        super(props)
    }

    reRender = () =>{
        this.forceUpdate() 
    }

    render(){
         var bookStore = this.props.bookStore
        return(
                <HashRouter>
                <div>
                    
                <ul className="header">
                    <li> <Link to="/" selected="activeclass"> Home </Link></li>
                    <li> <Link to="/products"> Product </Link> </li>
                    <li> <Link to="/blog"> Blog </Link> </li>
                    <li style={{float:"right"}}> <LoginStatus /> </li>
                </ul>

                    <Route path="/" exact component={()=> (<Home reRender={this.reRender} />)}></Route>
                    <Route path="/blog"  component={Blog}></Route>
                    <Route exact path="/products"  component={() => (<Product bookStore={bookStore}/>)}></Route>
                    <Route path="/products/details/:id" render={(props) =>( <Details bookStore={bookStore} id={props.match.params.id} />)} ></Route>
                    <Route path="/*" component={NoMatch404}></Route>
                    </div>
                </HashRouter>


        )
    }

}

export default RouterComponent