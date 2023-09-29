import { mongoose } from "../../lib/index.js";

const project = mongoose.Schema({
    title: {
        type: String,
    },
    technologies: {
        type: [String]
    },
    fs: {
        type: [String],
        alias: "frontend skills"
    },
    bs: {
        type: [String],
        alias: "backend skills"
    },
    databases: {
        type: [String],
    },
    infrastructure: {
        type: [String],
    },
    availability: {
        type: String,
    }
});

const Project = mongoose.model("project", project);

export { Project }