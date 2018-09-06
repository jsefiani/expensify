import React from "react";
import ReactDOM from "react-dom";


const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p>This info is {props.info}</p>
        </div>
    )
}

const requireAuthentication = (ComponentWrapper) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <ComponentWrapper {...props}/> : <p>You're not allowed to see this, please sign in</p>}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info)




ReactDOM.render(<AuthInfo isAuthenticated={false} info="only for users"/>, document.getElementById('app'));

