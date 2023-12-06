import {createSlice} from '@reduxjs/toolkit'

const initialState={
    id:null,
    username:null,
    email:null,
    role:null,
    isApproved:false,
    isAdmin:false,
    isAuthenticated:false

}

// type userDetails={
//     id:string,
//     username:string,
//     email:string,
//     role:string,
//     isApproved:boolean;
//     isAdmin:boolean
// }


const authSlice=createSlice({
    name:'userDetails',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.id=action.payload.id
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.role=action.payload.role;
            state.isApproved=action.payload.isApproved;
            state.isAuthenticated=true
        },

        logout:(state)=>{
            state.id=null;
            state.username=null;
            state.email=null;
            state.role=null;
            state.isApproved=false;
            state.isAuthenticated=false
        }
    }
})

export const{login,logout}=authSlice.actions
export default authSlice.reducer