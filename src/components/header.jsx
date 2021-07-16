import React,{useRef, useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import './header.css';

function Header(props){
    function handleLogout(){
        sessionStorage.removeItem("token");
        props.handleToken("");
        toast.success('Logged out succesfully',{autoClose:2000});
    }

    const [isSticky, setSticky] = useState(false);
    //const [activelink, setActiveLink] = useState("all");
    const ref = useRef(null);

    /*function handleActiveLink(link){
        setActiveLink(link);
    }*/

    const handleScroll = () => {
    if (ref.current) {
        console.log(ref.current.getBoundingClientRect());
        console.log(ref.current.getBoundingClientRect().top);
      setSticky(ref.current.getBoundingClientRect().top < 0);
    }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
       // setActiveLink(activelink);
        return () => {
          window.removeEventListener('scroll', () => handleScroll);
        };
      }, []);

    return(
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
            <header className="Header sticky-inner">
                <div className="heading">
                    <i class="fas fa-list-alt fa-2x"></i>
                    <h4 className="head">TODO LIST</h4>
                </div>
                <nav className="Nav">
                    <NavLink exact activeClassName="active" to="/">ALL</NavLink>
                    <NavLink activeClassName="active" to="/active">Active</NavLink>
                    <NavLink activeClassName="active" to="/finished">Finished</NavLink>
                    <button type="submit" onClick={handleLogout}>Logout</button>
                </nav> 
            </header>
        </div>        
    );
}

export default Header;
