import React, { useState } from "react";
import Popup from "reactjs-popup";
import logo from '../edit.svg';
import Select from 'react-select';
import { patchChangeEmail, patchChangePassword, patchChangeUsername } from "../services/user";

const Profile = () => {

    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [changeUsername, setChangeUsername] = useState(false);

    const [userdata, setUserdata] = useState({
        username: localStorage.getItem('kerberos'),
        password: "",
        email: "",
        old_username: localStorage.getItem('kerberos'),
        old_password: "",
        old_email: "",
        new_username:"",
        new_password:"",
        new_email:""
    })

    const handleChangeUsername = async() => {
        const response = await patchChangeUsername(userdata);
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            alert('Username has been successfully changed!')
        } else {
            alert('Error occured: '+data['error']);
        }
    }

    const handleChangeEmail = async() => {
        const response = await patchChangeEmail(userdata);
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            alert('Email has been successfully changed!')
        } else {
            alert('Error occured: '+data['error']);
        }
    }

    const handleChangePassword = async() => {
        const response = await patchChangePassword(userdata);
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            alert('Password has been successfully changed!')
        } else {
            alert('Error occured: '+data['error']);
        }
    }

    const handleSubmit = async() => {
        if (userdata.email==''||userdata.password==''||userdata.username==''){
            alert('Missing one or more inputs')
            return;
        }
        changeEmail && handleChangeEmail();
        changeUsername && handleChangeUsername();
        changePassword && handleChangePassword();
        setChangeUsername(false);
        setChangeEmail(false);
        setChangePassword(false);
    }

    const options = [
        { value: 'username', label: 'Change Username' },
        { value: 'email', label: 'Change Email' },
        { value: 'password', label: 'Change Password' }
      ]

    return (
        <div className="Theme-popover">
            <Popup
                trigger={<a className="App-link"><img src={logo} className="icon-logo" alt="logo" /> Edit Profile </a>}
                modal
                nested
            >
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> Editing Profile </div>

                    <div className="content">
                        <div className="information">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                name="editProfile"
                                options={options}
                                onChange={(changeOption) => {
                                    if (changeOption.value==='username') {
                                        setChangeUsername(true);
                                        setChangeEmail(false);
                                        setChangePassword(false);
                                    } else if (changeOption.value==='email') {
                                        setChangeUsername(false);
                                        setChangeEmail(true);
                                        setChangePassword(false);
                                    } else if (changeOption.value==='password') {
                                        setChangeUsername(false);
                                        setChangeEmail(false);
                                        setChangePassword(true);
                                    }
                                }}

                            />
                        </div>
                        <div className="userinputs" >
                            <label className="input">
                                <input className="input__field" 
                                    type="disabled" 
                                    placeholder={localStorage.getItem('kerberos')}
                                    value={localStorage.getItem('kerberos')} 
                                    readOnly={true}
                                />
                                <span className="input__label">Current Username (Readonly)</span>
                            </label>

                            <label className="input">
                                <input className="input__field" 
                                    type="text" 
                                    placeholder=" "
                                    value={userdata.email} 
                                    onChange={(e)=>(setUserdata({...userdata, email: e.target.value, old_email: e.target.value}))} 
                                />
                                <span className="input__label">Current Email</span>
                            </label>

                            <label className="input">
                                <input className="input__field" 
                                    type="password" 
                                    placeholder=" "
                                    value={userdata.password} 
                                    onChange={(e)=>(setUserdata({...userdata, password: e.target.value, old_password: e.target.value}))} 
                                />
                                <span className="input__label">Current Password</span>
                            </label>

                            {changeUsername &&
                            <label className="input">
                                <input className="input__field" 
                                    type="text" 
                                    placeholder=" "
                                    value={userdata.new_username} 
                                    onChange={(e)=>(setUserdata({...userdata, new_username: e.target.value}))} 
                                />
                                <span className="input__label">New Username</span>
                            </label>
                            }

                            {changeEmail &&
                            <label className="input">
                                <input className="input__field" 
                                    type="text" 
                                    placeholder=" "
                                    value={userdata.new_email} 
                                    onChange={(e)=>(setUserdata({...userdata, new_email: e.target.value}))} 
                                />
                                <span className="input__label">New Email</span>
                            </label>
                            }

                            {changePassword && 
                            <label className="input">
                                <input className="input__field" 
                                    type="password" 
                                    placeholder=" "
                                    value={userdata.new_password} 
                                    onChange={(e)=>(setUserdata({...userdata, new_password: e.target.value}))} 
                                />
                                <span className="input__label">New Password</span>
                            </label>
                            }

                        </div>

                        <button className="actions" 
                            onClick={()=>{
                                handleSubmit();
                                close()
                            }}>
                            Confirm Changes
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
        </div>
    )
}

export default Profile;