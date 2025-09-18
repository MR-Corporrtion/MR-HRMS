import axios from 'axios';
import Cookies from 'js-cookie';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
import { apiClient } from "../../../config/route.config";
import Router from 'next/router';

export const login = (username, password) => async (dispatch) => {
  try {
    console.log("test", username, password)
    const response = await apiClient.post('/user/login', { username, password });
    console.log(response.data.accessToken);
    console.log(response.data.user.role);
    console.log(response.data.user.username)
    sessionStorage.setItem("companyId", `${response.data.user.companyid}`)
    sessionStorage.setItem('accessToken', response.data.accessToken);
    sessionStorage.setItem("role", `${response.data.user.role}`)
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    Cookies.set('accessToken', `${response.data.accessToken}`);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("done", error);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};


export const fetchAdminProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const response = await apiClient.get('/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch({
      type: 'FETCH_ADMIN_PROFILE_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_ADMIN_PROFILE_FAILURE',
      payload: error.response ? error.response.data : 'Something went wrong',
    });
  }
};


export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const response = await apiClient.post('/user/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      // Clear local storage
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      localStorage.clear();
      sessionStorage.clear();

      dispatch({ type: 'LOGOUT' });
      Router.push('/');
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Dispatch an error action if needed
    dispatch({ type: 'LOGOUT_ERROR', payload: 'Logout failed' });
  }
};

export const employeelogin = ({ email, username, phone_number, password }) => async (dispatch) => {
  try {
    const response = await apiClient.post('/employee/login', { email, username, phone_number, password });

    // Save token and other user details
    sessionStorage.setItem("companyId", `${response.data.user.companyid}`)
    sessionStorage.setItem('accessToken', response.data.accessToken);
    sessionStorage.setItem("role", `${response.data.user.role}`)
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    Cookies.set('accessToken', `${response.data.accessToken}`);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    throw error;
  }
};