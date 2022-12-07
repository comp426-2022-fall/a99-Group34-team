import React, { useState, useEffect, useContext } from "react";
import { LoggedInContext } from "../App";
import { Spreadsheet, DataEditor } from "react-spreadsheet";
import add from "../add.svg";
import deleteLogo from "../delete.svg";

const RequestBody = () => {

    const parseCookie = (cookie) => {
        const v = cookie
            .split(';')
            .map(v => v.split('='))
            
        
        const result = v.map((v) => 
            [{ value: decodeURIComponent(v[0].trim())}, { value: decodeURIComponent(v[1].trim())}]
        )
        return result;
    }

    useEffect(() => {
        if (document.cookie == '') {
            return;
        }
        const cookie = parseCookie(document.cookie);
        setData([[{ value: "Cookie Key", className: "header-row"}, { value: "Cookie Value", className:"header-row" }], 
        ...cookie
            ])
    }, [])

    const [data, setData] = useState([
        [{ value: "Cookie Key", className: "header-row"}, { value: "Cookie Value", className:"header-row" }]
      ]);

    // const addColumn = () => {
    //     // [[...data[0],{value:""}],...data.slice(1)]
    //     return data.map((row) => (
    //         [...row, {value:""}]
    //     ))
    // }

    const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);


    return (
        <div>
            {isLoggedIn? 
            <div className="modal-table">
                <div className="header">
                    Cookies you have thus far:
                </div>
                <br/>
                <div className="content">
                <div className="table">
                    <Spreadsheet className={'table'} data={data} onChange={setData}/>
                </div>
                {/* <div className="table">
                    <div className="table-control">
                        <button className="add-control" onClick={()=>(setData(addColumn()))}> <img src={add} className="icon-logo" alt="addLogo" /> Column </button>
                        <button className="delete-control" onClick={()=>(setData(data.map((row)=>row.slice(0,-1))))}> <img src={deleteLogo} className="icon-logo" alt="deleteLogo" /> Column </button>
                    </div>
                    <div className="table-control">
                        <button className="add-control" onClick={()=>(setData([...data,[...data[0].map(()=>({value:""}))]]))}> <img src={add} className="icon-logo" alt="addLogo" /> Row </button>
                        <button className="delete-control" onClick={()=>(setData([...data.slice(0,-1)]))}> <img src={deleteLogo} className="icon-logo" alt="deleteLogo" /> Row </button>
                    </div>
                </div> */}
                </div>
            </div>
            :
            <div className="modal-danger">
                <div className="header">
                    Please Log in to receive and see the cookies you have in this browser session!
                </div>
            </div>}
            
        </div>
    );
}

export default RequestBody;