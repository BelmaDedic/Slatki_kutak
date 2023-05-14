import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

let logedUser = null;

export default function FadeMenu() {
  const location = useLocation();
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  logedUser = location.state.user;

  React.useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  const getHome = () => {
    navigate('/Home', {state: {user:  logedUser}});
  }

  const getAddSweet = () => {
    navigate('/Sweet/new', {state: {user:  logedUser}})
  }

  const getOrders = () => {
    navigate('/Sweet/orders', {state: {user:  logedUser}});
  }

  const getSpecialOrders = () => {
    navigate('/Sweet/specialOrders', {state: {user:  logedUser}});
  }

  const getBasket = () => {
    navigate('/Sweet/basket', {state: {user:  logedUser}});
  }

  const getSpecialOrder = () => {
    navigate('/Sweet/specialOrder', {state: {user:  logedUser}});
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        < MenuOutlinedIcon fontSize="large" style={{fill: "black", marginTop: "-18%" }}/>
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

        {user && <>
        {(user.role === 1 || user.role === 2 ) && <MenuItem onClick={handleClose}><div onClick={getHome} className='link'>Početna</div>
        </MenuItem> }
        {user.role === 1 && <MenuItem onClick={handleClose}><div onClick={getAddSweet} className='link'>Dodaj poslasticu</div></MenuItem>}
        {(user.role === 1) && <MenuItem onClick={handleClose}> <div onClick={getOrders} className='link'>Narudžbe</div></MenuItem>}
        {user.role === 1 && <MenuItem sx={{mb: -2}} onClick={handleClose}><div onClick={getSpecialOrders} className='link'>Posebne želje</div></MenuItem>}
        {user.role === 2 && <MenuItem onClick={handleClose}><div onClick={getBasket} className='link'>Korpa</div></MenuItem>}
        {user.role === 2 && <MenuItem onClick={handleClose}><div onClick={getOrders} className='link'>Narudžbe</div></MenuItem>}
        {user.role === 2 && <MenuItem onClick={handleClose}><div onClick={getSpecialOrder} className='link'>Posebne želje</div></MenuItem>}
        {user.role === 2 && <MenuItem sx={{mb: -2}} onClick={handleClose}><div onClick={getSpecialOrders} className='link'>Posebne narudžbe</div></MenuItem>}
        {(user.role === 1) &&<> <hr/> <Link to="/" style={{textDecoration: "none"}}>< LogoutIcon style={{fill: "black", marginLeft: "70", marginTop: "-10%" }}/></Link></>}
        {(user.role === 2) &&<> <hr/> <Link to="/" style={{textDecoration: "none"}}>< LogoutIcon style={{fill: "black", marginLeft: "75", marginTop: "-10%" }}/></Link></>}
    </>} 
      </Menu>
    </div>
  );
}
