import React,{useRef, useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import './header.css';

function Header(props){
    function handleLogout(){
        sessionStorage.removeItem("token");
        props.handleToken("");
        toast.success('Logged out succesfully',{autoClose:2000});
    }

    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
    if (ref.current) {
        console.log(ref.current.getBoundingClientRect());
        console.log(ref.current.getBoundingClientRect().top);
      setSticky(ref.current.getBoundingClientRect().top < 0);
    }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
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
                    <a href="/">ALL</a>
                    <a href="/active">Active</a>
                    <a href="/finished">Finished</a>
                    <button type="submit" onClick={handleLogout}>Logout</button>
                </nav>
            </header>
        </div>        
    );
}

export default Header;
