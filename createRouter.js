import React, {Component} from 'react';
import * as _ from "lodash";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import isIE from "./isIE";
import Nav from "./nav";

/**
If url matches test then we must be logged in so store token and get user information.
*/
function handleAuthentication(location,Auth) {
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
        let Content = ({ match, location, history })=>{
            handlePageChange(history);
            handleAuthentication(location,this.props.Auth);
            return (
                <Switch key={location.key} location={location}>
                    {this.state.routes}
                </Switch>

            )
        }
        return (
            <Router>
                <div>
                    <Nav
                        Auth={this.props.Auth}
                        links={this.state.routes}
                    />
                    <Route component={Content} />
                </div>
            </Router>
        )
    }
}




