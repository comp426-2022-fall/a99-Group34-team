import React, { useContext, useState, useEffect } from "react";
import { getAllUsers, postNewCookie, getAllInteractions } from "../services/admin";
import User from "./User";
import cookie from "../oreo.svg";
import Interaction from "./Interaction";


const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [isAddingCookie, setIsAddingCookie] = useState(false);
    const [newCookie, setNewCookie] = useState({
        cookie_key:"",
        cookie_value:""
    })

    const getUsers = async() => {
        if (users.length > 0) {
            setUsers([]);
            return;
        }
        const response = await getAllUsers();
        const data = await response.json();
        if (data['success'] === true){
            console.log(data['data'])
            setUsers(data['data']);
        } else {
            alert('Error occured: '+data['error']);
        }
    }

    const getInteractions = async(username) => {
        if (interactions.length > 0) {
            setInteractions([]);
            console.log('here')
            return;
        }
        const response = await getAllInteractions(username);
        const data = await response.json();
        console.log(data)
        if (data['success'] === true){
           setInteractions(data['data']);
        } else {
            alert('Error occured: '+data['error']);
        }
    }

    const sendNewCookie = async() => {
        if (newCookie.cookie_key === "" || newCookie.cookie_value === ""){
            alert('Missing one or more input')
            return;
        }
        const response = await postNewCookie(newCookie);
        console.log(response)
        const data = await response.json();
        console.log(data);
        if (data['success'] === true){
            alert(data['data']);
            setIsAddingCookie(false);
        } else {
            alert('Error occured: '+data['error']);
        }
    }


    return (
        <div className="modal-dashboard">
            <div className="header">
                Be Cautious with Below Actions As they are Admin Only!
            </div>
            <br/>
            <button
                className="button"
                onClick={() => {
                getUsers();
                }}
            >
                {users.length > 0? 'Collapse View':'View All Users'}
            </button>

            <div className="table">
            {users.length > 0 && 
                users.map((user, idx) => (
                    <User 
                        key={idx}
                        id={`user-${idx}`}
                        username={user.username} 
                        email={user.email} 
                        role_type={user.role_type} 
                        handleClick={getInteractions}/>
                ))
            }
            </div>
            <br/>
            {isAddingCookie ? 
                <div className="content">
                     <div className="userinputs" >
                        <label className="input">
                            <input className="input__field" 
                                type="text" 
                                placeholder={' '}
                                value={newCookie.cookie_key} 
                                onChange={(e)=>(setNewCookie({...newCookie, cookie_key: e.target.value}))} 
                            />
                            <span className="input__label">Cookie Key</span>
                        </label>
                        <label className="input">
                            <input className="input__field" 
                                type="text" 
                                placeholder={' '}
                                value={newCookie.cookie_value} 
                                onChange={(e)=>(setNewCookie({...newCookie, cookie_value: e.target.value}))} 
                            />
                            <span className="input__label">Cookie Value</span>
                        </label>
                    </div>
                    <button
                        className="button"
                        onClick={() => {
                            sendNewCookie()
                        }}
                    >
                       Send the Cookie to the Abyss
                        <img src={cookie} className="cookie-logo" alt="logo" />
                    </button>
                    <br/>
                    <button
                        className="button-2"
                        onClick={() => {
                        setIsAddingCookie(false);
                        }}
                    >
                        Nevermind I changed my mind
                    </button>
                </div>
            
            :
             <button
                className="button"
                onClick={() => {
                setIsAddingCookie(true);
                }}
            >
                Add to Cookie Collection
            </button>
            }
           
           <div className="table">
            {interactions.length > 0 && 
                interactions.map((interaction, idx) => (
                    <Interaction 
                        key={idx}
                        id={`user-${idx}`}
                        cookie_key={interaction.cookie_key} 
                        cookie_value={interaction.cookie_value} />
                ))
            }
            </div>
        
        </div>
    )
}

export default AdminView;