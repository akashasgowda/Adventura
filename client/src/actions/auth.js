import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        // login the user..
            const { data } = await api.signIn(formData);

            dispatch({ type: AUTH , data });

        // after login push the user to Home Page
        navigate('/');

    } catch (error) {
        console.log(error.message);
    }
};

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        // sign up the user..
            const { data } = await api.signUp(formData);

            dispatch({ type: AUTH, data });
        // after login push the user to Home Page
        navigate('/');

    } catch (error) {
        console.log(error);
    }
};