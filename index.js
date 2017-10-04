import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import isIE from "./isIE";
import Auth from "./auth";
import Nav from "./nav";

/**
    If url matches test then we must be logged in so store token and get user information.
*/
const handleAuthentication = (location) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      Auth.handleAuthentication();
    }
  }
  
  /**
      We need to reset the scroll position manually on each route enter.
      This should be called when each main route mounts.
      History scroll restoration tells browser to set scroll position when using back and forward button.
      ------------
      Restore scroll will not work on some browsers. There is a polyfill if needed.
  */
  function handlePageChange(history){
      console.log("user agent: "+ isIE());
      if(isIE() || (!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom"))) {
       window.scrollTo(0, 0);
       history.scrollRestoration = "auto";
      }
  }

  function createRouteArray(routes) {
    const output = routes.forEach((el)=>{
        if(el.element){
            <Route exact path={el.location} component={el.element} />
        }else if(el.function){
            <Route exact path={el.location} render={el.function} />
        }else{
            throw(Error("Didn't find function or element to render"))
        }
    });
    return output;
}

/**
 * This will take in 
 */
export class CreateRouter extends Component {
    constructor(props){
        super(props);
        let navRoutes = _.cloneDeep(props.routes);
        navRoutes.forEach((el) => {
            if(el.element){
                delete el.element;
            }else if (el.function){
                delete el.function;                
            }
        });
        const routes = createRouteArray(this.props.routes)
        this.state= {navRoutes: navRoutes, routes:routes};

    }
    render(){
        return (
            <Router>
            <div>
            <Nav
                Auth={this.props.Auth}
                links={this.state.routes}
            />
                {this.state.routes}
            </div>
            </Router>
        )
    }
}

CreateRouter.defaultProps = {
    Auth:Auth,
    routes:[
        {
            name: "route1",
            location: "/",
            element: Route1
        },
        {
            name: "route2",
            location: "/2",
            element: Route2
        },
        {
            name: "route3",
            location: "/3",
            function: function (props){
                return <Route3 input={"test input"} />
            }
        }
    ]
}

function Route1(){
    return (
        <div>
            <h1>
                Route 1
            </h1>
        </div>
    )
}

function Route2(){
    return (
        <div>
            <h1>
                Route 2
            </h1>
        </div>
    )
}

function Route3(props){
    return (
        <div>
            <h1>
                Route 3 + {props.input}
            </h1>
        </div>
    )
}

/* develblock:start */
ReactDOM.render(
    <CreateRouter />,
    document.getElementById("root"),
);
/* develblock:end */


