import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem("user");
const initialState = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        settingUser: (state, action) => {
            const newUser = {
                firstName: action.payload.firstname,
                lastName: action.payload.lastname,
                email: action.payload.email,
                password: action.payload.password,
                role:action.payload.role,
                token:action.payload.token,
                status:action.payload.status
            }
            localStorage.setItem('user', JSON.stringify(newUser));
            return state = newUser;
        },
        revertUser: (state, action) => {
            localStorage.removeItem('user');
            return state = null;
        }
    }

})


export default userSlice.reducer;
export const { settingUser, revertUser } = userSlice.actions;