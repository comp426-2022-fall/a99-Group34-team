import React from "react";

const Interaction = (prop) => {

    return (
        <div className="modal-user">
            <div className="header">
                {prop.cookie_key}
            </div>
            <div className="content">
                {prop.cookie_value}
            </div>
        </div>
    )
}

export default Interaction;