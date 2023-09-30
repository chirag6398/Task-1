import { projectRepository } from "./index.js";

export const projectService = (() => {
    const getAll = async (req, res) => {
        try {
            const q = req.query.input || "";
            const updatedQuery = q.split(/[,\s]+/);
            let filters = {}
            if (q.length) {
                filters = {
                    $or: [
                        { title: { $regex: `\\b${q}\\b`, $options: 'i' } },
                        {
                            technologies: {
                                $elemMatch: {
                                    $in: updatedQuery.map((term) => new RegExp(term, 'i')), // 'i' flag makes it case-insensitive
                                }
                            }
                        },
                        {
                            fs: {
                                $elemMatch: {
                                    $in: updatedQuery.map((term) => new RegExp(term, 'i')), // 'i' flag makes it case-insensitive
                                }
                            }
                        },
                        {
                            bs: {
                                $elemMatch: {
                                    $in: updatedQuery.map((term) => new RegExp(term, 'i')), // 'i' flag makes it case-insensitive
                                }
                            }
                        },
                        {
                            databases: {
                                $elemMatch: {
                                    $in: updatedQuery.map((term) => new RegExp(term, 'i')), // 'i' flag makes it case-insensitive
                                }
                            }
                        },
                        {
                            infrastructure: {
                                $elemMatch: {
                                    $in: updatedQuery.map((term) => new RegExp(term, 'i')), // 'i' flag makes it case-insensitive
                                }
                            }
                        },
                        { availability: { $regex: q, $options: 'i' } },
                    ],
                }
            }
            const result = await projectRepository().find({ filters });

            return res.send(result);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err)
        }
    }

    const filter = async (req, res) => {
        try {
            const q = req.query;
            const filters = {
                ...(q.tg && { technologies: { $in: q.tg } }),
                ...(q.fs && { fs: { $in: q.fs } }),
                ...(q.bs && { bs: { $in: q.bs } }),
                ...(q.db && { databases: { $in: q.db } }),
                ...(q.infrastructure && { infrastructure: { $in: q.infrastructure } })
            }
            const result = await projectRepository().find({ filters });

            return res.status(200).send(result);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err)
        }
    }

    return { getAll, filter }
})()

