import { createSlice } from "@reduxjs/toolkit"

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        filteredResult: [],
        selectedProjectId: ""
    },
    reducers: {
        setProjects(state, action) {
            return { ...state, projects: action.payload }
        },
        getByID(state, action) {

        },
        filtered(state, action) {
            return { ...state, filteredResult: action.payload }
        }
    }

})

export const { setProjects, filtered } = projectSlice.actions;
export default projectSlice.reducer;