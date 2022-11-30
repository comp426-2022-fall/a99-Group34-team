import React, { useState } from "react";
import { Spreadsheet, DataEditor } from "react-spreadsheet";
import add from "../add.svg";
import deleteLogo from "../delete.svg";

const RequestBody = () => {
    const [data, setData] = useState([
        [{ value: "Key1", className: "header-row"}, { value: "Key2", className:"header-row" }],
        [{ value: "Value1" }, { value: "Value2" }],
      ]);

    const addColumn = () => {
        // [[...data[0],{value:""}],...data.slice(1)]
        return data.map((row) => (
            [...row, {value:""}]
        ))
    }

    const addRow = () => {

    }

    return (
        <div>
            <div className="table">
                <div className="table-control">
                    <button className="add-control" onClick={()=>(setData(addColumn()))}> <img src={add} className="icon-logo" alt="addLogo" /> Column </button>
                    <button className="delete-control" onClick={()=>(setData(data.map((row)=>row.slice(0,-1))))}> <img src={deleteLogo} className="icon-logo" alt="deleteLogo" /> Column </button>
                </div>
                <div className="table-control">
                    <button className="add-control" onClick={()=>(setData([...data,[...data[0].map(()=>({value:""}))]]))}> <img src={add} className="icon-logo" alt="addLogo" /> Row </button>
                    <button className="delete-control" onClick={()=>(setData([...data.slice(0,-1)]))}> <img src={deleteLogo} className="icon-logo" alt="deleteLogo" /> Row </button>
                </div>
            </div>
            <div className="table">
                <Spreadsheet className={'table'} data={data} onChange={setData}/>
            </div>
        </div>
    );
}

export default RequestBody;