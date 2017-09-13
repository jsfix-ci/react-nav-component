import React from "react";
import {Link} from 'react-router-dom';
import googleC from './Google_Color.svg';
import facebookC from './Facebook_Color.svg';
import twitterC from './Twitter_Color.svg';
import accountBox from './accountBox.png';
import "./account.css";





/**
    Will simply render account login or welcome and link to account page depending if auth has been authenticated.
    If no auth class given then just render an empty div.
    The component will always render a 300x50 account info or 50x50 button. This mean it would alway fit on page, just need to place it in our grid.
    ------------------
    Depends on static auth class prop and profile prop to work.
    @function
*/
export default function Account(props){
	let Acc = null;
    if(props.auth){
		if(!props.profile){
		    Acc =  () => {
		        return (
		              <div onClick={(event)=>{event.stopPropagation();props.auth.login()}} className="accountButton">
		                <img src={accountBox} className="" alt="Account login button" />
		                <img src={facebookC} className="" alt="Facebook login button" />
		                <img src={googleC} className="" alt="google login button" />
		              </div>
		        )
		    }
		}else{
		    Acc =  () => {
		        return (
		                <article className="accountLogin">
		                  <div className="accountLogin__title">
		                      <h3> Welcome </h3>
		                      <h4>{props.profile.name} </h4>
		                  </div>
		                  <Link className="accountLogin__link" to={"/account"}>
		                    <img src={props.profile.picture} alt="profile link" />
		                  </Link>
		                  <button className="accountLogin__button"  onClick={(event)=>{event.stopPropagation();props.auth.logout()}}> logout </button>
		                </article>
		            )
		    }
		}
    }else{  
        Acc = ()=>{
            return (
                <div>
                </div>
            )
        }
    }
	return (    
	    <Acc/>
	)

}
