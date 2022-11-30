import React from "react";
import Popup from "reactjs-popup";

const CookieFail = (prop) => {

    return (
        <div className="Theme-popover">
            <Popup open={prop.open}
                closeOnDocumentClick 
                onClose={() => prop.closeModal(false)}
                modal
                nested>
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> Failed to Retrieve Cookie </div>
                    <div className="content">
                        <p>Please make sure you are logged in!</p>
                    </div>
                </div>)}
            </Popup>
        </div>
    )
}

export default CookieFail;