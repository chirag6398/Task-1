import { Project } from "./index.js";

export const projectRepository = () => {
    const insertMany = async ({ projects }) => {
        const res = await Project.insertMany(projects)
        return res;
    };

    const find = async (props) => {
        const { filters = null, projections = null, options = null } = props
        const res =await Project.find(filters, projections, options);
        return res;
    };

    return { insertMany, find }
}