import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img alt='logo' className='logo' src='https://gamesadda.in/wp-content/uploads/2021/04/Free-Fire-Mascot-Logo-Without-Text-3.jpg' />
            {auth ? <ul className='nav-ul'>
                <li><Link to='/'>Blogs</Link></li>
                <li><Link to='/add'>Add Blog</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                {/* <li>{auth ?<Link onClick={logout} to='/signup'>Logout</Link> : 
                <Link to='/signup'>Sign Up</Link>}</li>
                <li><Link to='/login'>Login</Link></li> */}
            </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav;