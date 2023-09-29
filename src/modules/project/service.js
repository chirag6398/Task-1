import { projectRepository } from "./index.js";

export const projectService = (() => {
    const getAll = async (req, res) => {
        try {
            const q = req.query.input || "";
            let filters = {}
            if (q.length) {
                filters = {
                    $or: [
                        { title: { $regex: `\\b${q}\\b`, $options: 'i' } },
                        { technologies: { $in: [new RegExp(q, 'i')] } },
                        { fs: { $in: [new RegExp(q, 'i')] } },
                        { bs: { $in: [new RegExp(q, 'i')] } },
                        { databases: { $in: [new RegExp(q, 'i')] } },
                        { infrastructure: { $in: [new RegExp(q, 'i')] } },
                        { availability: { $regex: q, $options: 'i' } },
                    ],
                }
            }
            const result = await projectRepository().find({ filters });

            return res.send(result);
        } catch (err) {
            console.log(err);
            return res.send(err)
        }

    }
    return { getAll }
})()

