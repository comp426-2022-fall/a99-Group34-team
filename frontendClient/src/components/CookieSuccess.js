import React from "react";
import Popup from "reactjs-popup";
import cookie from "../oreo.svg";

const CookieSuccess = (prop) => {

    return (
        <div className="Theme-popover">
            <Popup open={(prop.open !== '')}
                closeOnDocumentClick 
                onClose={() => prop.closeModal('')}
                modal
                nested>
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> 
                        You got yourself a cookie 
                        <img src={cookie} className="cookie-logo" alt="logo" />
                        !! 
                    </div>
                    <div className="content">
                        <p>{decodeURI(prop.open)}</p>
                    </div>
                    
                </div>)}
            </Popup>
        </div>
    )
}

export default CookieSuccess;