import React, { useEffect, useState } from 'react'
import { Card, Modal } from "antd"
import Filters from './Filters'
import axios from "axios";
import ReactLoading from "react-loading";
import "./project.css"
import { setProjects, setVariables, setProcessing } from '../../store/projectSlice.js'
import { useDispatch, useSelector } from 'react-redux'
export default function Project() {
    const [selectedProject, setSelectedProject] = useState("");
    const dispatch = useDispatch();
    const state = useSelector((state) => state.project)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const apiUrl = "/projects"
                const response = await axios.get(apiUrl);
                if (response) {
                    dispatch(setProjects(response.data));
                    const meta = {
                        fs: [],
                        bs: [],
                        technologies: [],
                        infrastructure: [],
                        databases: [],
                    };

                    const uniqueValues = {
                        fs: new Set(),
                        bs: new Set(),
                        technologies: new Set(),
                        infrastructure: new Set(),
                        databases: new Set(),
                    };

                    response.data.forEach((val) => {
                        val.fs.forEach((el) => {
                            uniqueValues.fs.add(el);
                        });
                        val.bs.forEach((el) => {
                            uniqueValues.bs.add(el);
                        });
                        val.databases.forEach((el) => {
                            uniqueValues.databases.add(el);
                        });
                        val.technologies.forEach((el) => {
                            uniqueValues.technologies.add(el);
                        });
                        val.infrastructure.forEach((el) => {
                            uniqueValues.infrastructure.add(el);
                        });
                    });


                    meta.fs = [...uniqueValues.fs].map((el) => ({ value: el, label: el }));
                    meta.bs = [...uniqueValues.bs].map((el) => ({ value: el, label: el }));
                    meta.databases = [...uniqueValues.databases].map((el) => ({ value: el, label: el }));
                    meta.technologies = [...uniqueValues.technologies].map((el) => ({ value: el, label: el }));
                    meta.infrastructure = [...uniqueValues.infrastructure].map((el) => ({ value: el, label: el }));
                    dispatch(setVariables(meta));
                    dispatch(setProcessing(false));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setProcessing(false));
            }
        }
        fetchProjects();

    }, []);

    const setProjectIdHandler = (project) => {
        setSelectedProject(project);
    }

    return (<>
        <div>
            <Filters />
        </div>
        {
            state.isProcessing ?
                <div style={{ display: "flex", position: "absolute", top: "0px", left: "0px", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
                    <ReactLoading
                        type={"bars"}
                        color={"#03fc4e"}
                        height={100}
                        width={100}
                    />
                </div>
                : <div className='project_container'>
                    {
                        state.filteredResult === null ? state.projects.map((project) => {
                            return <Card

                                onClick={() => {
                                    setProjectIdHandler(project)
                                }}
                                key={project._id}
                                title={`${project.title}`}
                                bordered={true}
                                style={{
                                    width: 300,
                                }}
                            >
                                <div>
                                    <h4>
                                        Technologies
                                    </h4>
                                    <p>{(project.technologies?.length) ? project.technologies.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        frontend Skills
                                    </h4>
                                    <p>{project.fs?.length ? project.fs.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Backend Skills
                                    </h4>
                                    <p>{project.bs?.length ? project.bs.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Databases
                                    </h4>
                                    <p>{project.databases?.length ? project.databases.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Infrastructure
                                    </h4>
                                    <p>{project.infrastructure?.length ? project.infrastructure.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Availability
                                    </h4>
                                    <p>{project.availability.length ? project.availability : "-"}</p>
                                </div>
                            </Card>
                        }) : state.filteredResult?.map((project) => {
                            return <Card

                                onClick={() => {
                                    setProjectIdHandler(project)
                                }}
                                key={project._id}
                                title={`${project.title}`}
                                bordered={true}
                                style={{
                                    width: 300,
                                }}
                            >
                                <div>
                                    <h4>
                                        Technologies
                                    </h4>
                                    <p>{(project.technologies?.length) ? project.technologies.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        frontend Skills
                                    </h4>
                                    <p>{project.fs?.length ? project.fs.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Backend Skills
                                    </h4>
                                    <p>{project.bs?.length ? project.bs.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Databases
                                    </h4>
                                    <p>{project.databases?.length ? project.databases.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Infrastructure
                                    </h4>
                                    <p>{project.infrastructure?.length ? project.infrastructure.join(", ") : "-"}</p>
                                </div>
                                <div>
                                    <h4>
                                        Availability
                                    </h4>
                                    <p>{project.availability.length ? project.availability : "-"}</p>
                                </div>
                            </Card>
                        })
                    }
                </div>
        }


        <Modal
            style={{ position: "absolute", top: "0px", right: "0px", height: "100vh" }}
            open={selectedProject !== ""}
            footer={[]}
            onCancel={() => { setSelectedProject("") }}
        >
            <Card
                style={{ marginTop: "30px", boxShadow: "none" }}
                title={`${selectedProject.title}`}
            >
                <div>
                    <h4>
                        Technologies
                    </h4>
                    <p>{selectedProject && selectedProject.technologies.length ? selectedProject.technologies.join(", ") : "-"}</p>
                </div>
                <div>
                    <h4>
                        frontend Skills
                    </h4>
                    <p>{selectedProject && selectedProject.fs.length ? selectedProject.fs.join(", ") : "-"}</p>
                </div>
                <div>
                    <h4>
                        Backend Skills
                    </h4>
                    <p>{selectedProject && selectedProject.bs.length ? selectedProject.bs.join(", ") : "-"}</p>
                </div>
                <div>
                    <h4>
                        Databases
                    </h4>
                    <p>{selectedProject && selectedProject.databases.length ? selectedProject.databases.join(", ") : "-"}</p>
                </div>
                <div>
                    <h4>
                        Infrastructure
                    </h4>
                    <p>{selectedProject && selectedProject.infrastructure.length ? selectedProject.infrastructure.join(", ") : "-"}</p>
                </div>
                <div>
                    <h4>
                        Availability
                    </h4>
                    <p>{selectedProject && selectedProject.availability.length ? selectedProject.availability : "-"}</p>
                </div>
            </Card>
        </Modal>
    </>
    )
}
