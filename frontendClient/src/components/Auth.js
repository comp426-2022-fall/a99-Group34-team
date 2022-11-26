import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { LoggedInContext } from "../App";
import { postLoggingIn, postLoggingOut, postSigningUp } from "../services/user";

const Auth = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);

    const [isSignUp, setIsSignUp] = useState(false);
    const [userdata, setUserdata] = useState({
        username: "",
        password: "",
        email: ""
    })

    const handleLogout = async() => {
        const response = await postLoggingOut();
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            setIsLoggedIn(false);
        } else {
            alert('Error occured logging out '+data);
        }
    }

    const handleSubmit = async() => {
        console.log(userdata);
        let response;
        if (isSignUp) {
            if (userdata.email==''||userdata.password==''||userdata.username==''){
                alert('Missing one or more inputs')
                return;
            }
            response = await postSigningUp(userdata);
        } else {
            if (userdata.password==''||userdata.username==''){
                alert('Missing one or more inputs')
                return;
            }
            response = await postLoggingIn(userdata);
        }
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            setIsLoggedIn(true);
        } else {
            alert('Error occured logging in / signing up'+data);
        }
    }

    return (
        <div className="Theme-popover">
            {isLoggedIn ? <button onClick={()=>(handleLogout())}>Sign out</button>
            :
             <Popup
                trigger={<button>Log in / Sign up</button>}
                modal
                nested
            >
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> {isLoggedIn === true ? 'Sign out': 'Log in'} </div>
                    <div className="content">
                        <div className="userinputs" >
                            <label className="input">
                            <input className="input__field" 
                                type="text" 
                                placeholder=" "
                                value={userdata.username} 
                                onChange={(e)=>(setUserdata({...userdata, username: e.target.value}))} 
                            />
                            <span className="input__label">Username</span>
                            </label>

                            {isSignUp &&
                            <label className="input">
                            <input className="input__field" 
                                type="text" 
                                placeholder=" "
                                value={userdata.email} 
                                onChange={(e)=>(setUserdata({...userdata, email: e.target.value}))}
                            />
                            <span className="input__label">Email</span>
                            </label>
                            }
                            
                            <label className="input">
                            <input className="input__field" 
                                type="password" 
                                placeholder=" "
                                value={userdata.password} 
                                onChange={(e)=>(setUserdata({...userdata, password: e.target.value}))}
                            />
                            <span className="input__label">Password</span>
                            </label>
                        </div>

                        <button className="actions" 
                            onClick={()=>{
                                handleSubmit();
                                close()
                            }}>
                            {isSignUp? 'Sign Up':'Sign In'}
                        </button>
                    <div className="actions">
                        <button
                            className="button-2"
                            onClick={() => {
                            setIsSignUp(!isSignUp)
                            }}
                        >
                            Go to {isSignUp? 'Sign In':'Sign Up'} instead
                        </button>
                        
                        <button
                            className="button-2"
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}
                        >
                            Continue as Guest
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </Popup>
            }
        </div>
    )
}

export default Auth;