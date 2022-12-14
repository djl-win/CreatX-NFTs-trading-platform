/*
local storage
*/
const USER_NAME = 'userUsername';

export const storageUtils = {
    //save username
    saveUser(userUsername){
        // localStorage.setItem(USER_NAME, JSON.stringify(userUsername));
        localStorage.setItem(USER_NAME, userUsername);
    },
    //read user
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_NAME) || '{}');
        return localStorage.getItem(USER_NAME) || '';
    },
    //delete user
    removeUser(){
        localStorage.removeItem(USER_NAME);
    }
}