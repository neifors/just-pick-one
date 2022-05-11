import React from "react";
//import jwt_decode from "jwt-decode"; //look at this later
import axios from "axios";

export const loginFunction = async (formInput) => {
    try {
        
        const response = await axios.post('https://just-pick-1-api.herokuapp.com/auth/login/', formInput) 
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
        login(data)
        return "Successful Login"
    } catch(err) {
       return err.message
    }
}


function login(data) {
    localStorage.setItem("token", data.tokens)
    localStorage.setItem('username',data.username)
    localStorage.setItem('preferences', data.preferences)
}


function getHeadersWithToken() {
    console.log('I am inside getHeadersWithToken')
    const tokens = localStorage.getItem("token")
    const token = tokens.split("'access': '")[1].replace("'}","")
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }  
    }
    console.log(options)
    return options
}


export const getPreferences = async () => {
    try {
        const options = getHeadersWithToken()
        console.log(options)
        const allPreferences = await axios.get('https://just-pick-1-api.herokuapp.com/preferences/', options)
        console.log(allPreferences.data)
        const userPreferencesId = localStorage.getItem("preferences")
        // find the preferences of the user here
        const userPreferences = allPreferences.data.find(pref => pref.id == userPreferencesId)
        return userPreferences
    }catch(err) {
        return err.message
    }
}


export const createPreferences = async formInput => {
    try {
        const options = getHeadersWithToken()
        const response = await axios.post('https://just-pick-1-api.herokuapp.com/preferences/', formInput, options) 
        const data = await response.data
        console.log(data)
        if (data.err){
            throw Error(data.err)
        }
        localStorage.setItem('preferences', data.id)
        return "Successful"
    } catch(err) {
        return err.message
    }
}


export const registerFunction = async(formInput) => {
    try {

        const response = await axios.post('https://just-pick-1-api.herokuapp.com/auth/register/', formInput)
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
        return "Successful registration"
    } catch(err) {
        return err.message
    }
}
