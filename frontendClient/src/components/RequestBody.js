import React, { useState } from "react";
import { Spreadsheet, DataEditor } from "react-spreadsheet";

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
            <Spreadsheet className={'table'} data={data} onChange={setData}/>

            <div>
            <button onClick={()=>(setData([...data,[...data[0].map(()=>({value:""}))]]))}> Add Row </button>
            <button onClick={()=>(setData(addColumn()))}> Add Column </button>
            <button onClick={()=>(setData([...data.slice(0,-1)]))}> Delete Row </button>
            {/* <button onClick={()=>(setData([[...data[0].slice(0,-1)],...data.slice(1)]))}> Delete Column </button> */}
            </div>
            <button onClick={()=>(setData(data.map((row)=>row.slice(0,-1))))}> Delete Column </button>


            
        </div>
    );
}

export default RequestBody;