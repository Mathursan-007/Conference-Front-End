import React from 'react';
function KeynoteRequest(props) {


    return (
        <div>
            <img src={props.request.details.photo} width={200} height={200}/>
            <h2>{props.request.details.name}</h2>
            <p>{props.request.details.description}</p>
            <p><b>Last modified:</b>{props.request.last_modified}</p>
        </div>
    )


}


export default KeynoteRequest;