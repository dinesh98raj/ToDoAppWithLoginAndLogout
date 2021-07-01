import React from 'react';

function header(props){
    function handleLogout(){
        sessionStorage.removeItem("token");
        props.handleToken("");
    }
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-brand ">
                            <p>TODO LIST</p>
                        </div>
                </div>
                <div className="navbar-brand">
                <button type="submit" className="navbar-brand bg-dark" onClick={handleLogout}>Logout</button>
                </div>
                
            </nav>
        </header>        
    );
}

export default header;
