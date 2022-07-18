import auth0 from 'auth0-js';
import { createBrowserHistory as createHistory } from 'history';

let history = createHistory({
  forceRefresh: true
});

/**
  Auth should be initialised with your config and redirection information. 
  You can then pass this instance around to get/set information.
*/
class Auth {

  constructor(config){
    this.auth = new auth0.WebAuth(config);
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  login() {
    this.auth.authorize();
  };
  /**
    When called must be rerouted from auth0 after login. 
    Data will be passed via the url redirected.
  */
  handleAuthentication() {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
      }
    });
  };
  /**
    Store session to auth0 so stay logged in and redirect to home.
    Once we start the session get user information.
  */
  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    if(typeof localStorage !=="undefined"){
	    localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);

        
    }
  };
  /**
  * Delete tokens to logout.
  */
  logout() {
    if(typeof localStorage !=="undefined"){
	    localStorage.removeItem('access_token');
	    localStorage.removeItem('id_token');
	    localStorage.removeItem('expires_at');
    }
    history.replace('/');
  };
  /**
    Use token after sign in to query auth0 for user information. 
  */
  getProfile(cb) {
    if(!this.userProfile){
	    if(typeof localStorage !=="undefined"){ //So we can render on the server
		    if(localStorage.getItem('access_token') !==null){
		        this.auth.client.userInfo(localStorage.getItem('access_token'), (err, profile) => {
		            if (profile) {
	                    this.userProfile = profile;
	                    cb(err,profile);
	                }
		        });
		    }else{
                cb("error");
            }
	    }else{
            cb("error");
        }
    }else{
        cb(null,this.userProfile);

    }
  };
    
  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    if(typeof localStorage !=="undefined"){
	    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
	    return new Date().getTime() < expiresAt;
    }
  }

}

export default Auth;