import React from "react";
import Select from 'react-select';

const User = (prop) => {
    const options = [
        { value: 0, label: 'Admin' },
        { value: 1, label: 'User' }
      ]

    return (
        <div className="modal-user">
            <div className="header">
                 {prop.username}
            </div>
            <div className="content">
                {prop.email}
                <br/> <br/>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="editProfile"
                    defaultValue={options[prop.role_type]}
                    options={options}
                />
                <button className="button-2" onClick={()=> prop.handleClick(prop.username)}>
                    View Interactions
                </button>
            </div>
        </div>
    )
}

export default User;