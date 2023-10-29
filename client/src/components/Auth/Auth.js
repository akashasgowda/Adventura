import React, { useEffect, useState } from "react";

import { Container, Paper, Button} from "@mui/material";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LockIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from './Icon';
import useStyles from "./styles";

// sigin and sign up actions
import { signin ,signup } from '../../actions/auth';
import { AUTH } from "../../constants/actionTypes";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Auth = () => {

    // const clientId = "676867233492-l6erjc35ree3nlkkgcrqdugi9mqjcl2m.apps.googleusercontent.com";

    // useEffect(()=>{
    //     gapi.load("client: auth2", ()=>{
    //         gapi.auth2.init({clientId:clientId})
    //     })
    // },[]);

    // google auth handler functions

    // const googleSuccess = async(res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;
        
    //     try{
    //       dispatch({ type:'AUTH', data: { result,token } });
          
    //     }catch(error){
    //         console.log(error);
    //       }
    //     };
        
    // const googleFailure = (error) => {
    //   console.log(error);
        // console.log("Sign In unsuccessful. Try Again");
    // };
    
    ////////////////////////////////////////////////////////
    
    // JWT Authentication

    
  // for handling sign-in and sign-up
  const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

  const [ showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  
  // toggle password to show and hide
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  // switching sign-in and sign-up
  const switchMode = ()=> {
    setFormData(initialState);
    setIsSignUp((prevState)=> !prevState)
    setShowPassword(false);
  };

    
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);

      if(isSignUp)
      {
        dispatch(signup(formData,navigate));
      }
      else{
        dispatch(signin(formData,navigate));
      }
    };
    
    const handleChange = (event) => {
      setFormData({...formData, [event.target.name] : event.target.value });
    };


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign up" : "Sign in"}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} >
            {isSignUp && (
              <>
                <Input name="firstName" label="First Name" handleChange ={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type='email'/>
            <Input name="password" label="Password" handleChange={handleChange} type = {showPassword? 'text':'password'} handleShowPassword={handleShowPassword}/>

            { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type='password' /> }
          </Grid>

            <Button type='submit' variant="contained" className={classes.submit} color="primary" fullWidth>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            {/* Google O Auth */}
            {/* <GoogleLogin
                clientId="676867233492-l6erjc35ree3nlkkgcrqdugi9mqjcl2m.apps.googleusercontent.com"
                render = {(renderProps)=>(
                    <Button 
                        className={classes.googleButton}
                        onClick={renderProps.onClick}
                        disabled = {renderProps.disabled}
                        startIcon = { <Icon />}
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{marginTop:'10px'}}
                    >
                        Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            /> */}
            
            <Grid container  justifyContent="center">
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                    </Button>
                </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
