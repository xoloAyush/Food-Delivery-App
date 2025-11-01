

const userSlice = createSlice({

    name: "user",
    initialState: {
        userData : null
    },

    reducers: {
        setUserData: (state, action) =>{

            state.userData = action.payload
        }
    }
})

export const { setUserData} = userSlice.action
export default userSlice.reducer