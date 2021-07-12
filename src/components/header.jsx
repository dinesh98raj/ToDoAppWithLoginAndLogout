import React from 'react';
import './header.css';

function header(props){
    function handleLogout(){
        sessionStorage.removeItem("token");
        props.handleToken("");
    }

    return(
        <header className="Header">
            <div className="heading">
                <h2 className="head">TODO LIST</h2>
            </div>
            <nav className="Nav">
                <a href="/">ALL</a>
                <a href="/active">Active</a>
                <a href="/finished">Finished</a>
                <button type="submit" onClick={handleLogout}>Logout</button>
            </nav>
        </header>        
    );
}

export default header;
