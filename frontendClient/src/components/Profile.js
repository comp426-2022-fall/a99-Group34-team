import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { LoggedInContext } from "../App";
import { postLoggingIn, postLoggingOut, postSigningUp } from "../services/user";

const Profile = () => {
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
        if (response.status === 500) {
            if (isSignUp){
                alert('A user with this username already exists, please try a different username!');
            } else {
                alert('Wrong Username or Password, please try again!');
            }
            return setIsLoggedIn(false);
        }
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            return setIsLoggedIn(true);
        } else {
            alert('Error occured logging in / signing up'+data);
        }
    }

    return (
        <div className="Theme-popover">
            {isLoggedIn ? <button onClick={()=>(handleLogout())}>Sign out</button>
            :
             <Popup
                trigger={<button>Edit Profile</button>}
                modal
                nested
            >
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> {isLoggedIn === true ? 'Edit Profile': 'Edit Profile'} </div>
                    <div className="content">
                        <div className="information">
                            <br></br>
                            <label>Username:</label> 
                            <br>
                            </br>
                            <label>Email:</label> 
                        </div>
                        <div className="userinputs" >
                            <label className="input">
                            <input className="input__field" 
                                type="text" 
                                placeholder=" "
                                value={userdata.username} 
                                onChange={(e)=>(setUserdata({...userdata, username: e.target.value}))} 
                            />
                            <span className="input__label">New Username</span>
                            </label>
                        </div>

                        <button className="actions" 
                            onClick={()=>{
                                handleSubmit();
                                close()
                            }}>
                            {isSignUp? 'Confirm Changes':'Confirm Changes'}
                        </button>
                    <div className="actions">
                        <button
                            className="button-2"
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}
                        >
                            Delete User
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

export default Profile;