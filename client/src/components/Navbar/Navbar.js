import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Typography, AppBar, Button, Toolbar, Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

import useStyles from "./styles";
import * as actionType from '../../constants/actionTypes';
import memories from "../../images/memories.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/');
    setUser(null);
  };

  useEffect(()=> {
      const token = user?.token;

      if(token){
        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime())
          logout();

      }
          setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location.lo]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">

      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h3">
           Adventura
        </Typography>
        <img className={classes.image} src={memories} alt="icon" />
      </div>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
