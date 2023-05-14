import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import Hamburger from './Hamburger';
import Subscribe from './Subscribe';

let logedUser = null;

const Navbar = () => {
    const location = useLocation();
    const [user, setUser] = useState();

    const navigate = useNavigate();

    logedUser = location.state.user;

    useEffect(() => {
        setUser(logedUser);
    }, [logedUser])

    const getHome = () => {
        navigate('/Home', {state: {user:  logedUser}});
    }

    return ( 
        <div className="navbar">
            <div className="navbarLogo">
                <div onClick={getHome}><Avatar alt="Logo" sx={{ height: 82, width: 82 }} 
                    src="https://w7.pngwing.com/pngs/507/845/png-transparent-bakery-birthday-cake-cupcake-wedding-cake-logo-food-design-food-cake-decorating-frozen-dessert.png" /> 
                </div>
                <h1>Slatki kutak <br/><p>Pravljeno s ljubavlju</p></h1>
            </div>
            <div className='links'>
                { user && <>
                    {user.role === 2 && < Subscribe User={logedUser}/>}
                    {user.role === 3 && <Link to="/SignUp" style={{textDecoration: "none", marginTop: "-10%"}}><Button variant="contained" color="success">
                        Registracija</Button></Link>}
                    {(user.role === 1 || user.role === 2 ) && < Hamburger />} </> }
            </div>
        </div>
    );
}
 
export default Navbar;