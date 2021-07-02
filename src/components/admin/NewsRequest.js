import React  from 'react';
function NewsRequest(props){



    return(


        <div>
            <h2>{props.request.details.name}</h2>
            <p>{props.request.details.description}</p>
            <p><b>Last modified:</b>{props.request.last_modified}</p>
        </div>


    )


}


export default NewsRequest;