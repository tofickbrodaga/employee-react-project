import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: "",
    services: [],
    mainNews: []
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.mainNews = action.payload
        },
        setServices: (state, action) => {
            state.services = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setNews, setServices, setUser } = projectSlice.actions;

export const store = configureStore({
    reducer: projectSlice.reducer
});