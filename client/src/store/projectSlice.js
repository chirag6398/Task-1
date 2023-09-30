import { createSlice } from "@reduxjs/toolkit"

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        filteredResult: null,
        selectedProjectId: "",
        fs: [],
        bs: [],
        databases: [],
        infrastructure: [],
        technologies: [],
        isProcessing: true
    },
    reducers: {
        setProjects(state, action) {
            return { ...state, projects: action.payload }
        },
        filtered(state, action) {
            return { ...state, filteredResult: action.payload }
        },
        setVariables(state, action) {
            return { ...state, ...action.payload }
        },
        setProcessing(state, action) {
            return { ...state, isProcessing: action.payload }
        }
    }

})

export const { setProjects, filtered, setVariables, setProcessing } = projectSlice.actions;
export default projectSlice.reducer;