import axios from "axios";

export const apiService = (() => {
    const getProjects = async ({ url }) => {
        try {

            const response = await axios.get(url);
            if (response) {
                return response;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const getFilteredProjects = async ({ url, params }) => {
        try {
            const response = await axios.get(url, { params });
            if (response) {
                return response;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return { getProjects, getFilteredProjects }
})();