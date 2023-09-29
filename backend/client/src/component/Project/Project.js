import React, { useEffect, useState } from 'react'
import { Card, Modal } from "antd"
import Filters from './Filters'
import axios from "axios"
import "./project.css"
import { setProjects } from '../../store/projectSlice.js'
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
                    dispatch(setProjects(response.data))
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
        <div className='project_container'>
            {
                state.filteredResult.length === 0 ? state.projects.map((project) => {
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
                }) : state.filteredResult.map((project) => {
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

        <Modal
            style={{ position: "absolute", top: "0px", right: "0px", height: "100vh" }}

            open={selectedProject !== ""}
            // onOk={}
            // confirmLoading={}
            footer={[]}
            onCancel={() => { setSelectedProject("") }}
        >
            <Card
                style={{ marginTop: "30px" }}
                title={`${selectedProject.title}`}
            >
                <div>
                    <h4>
                        Technologies
                    </h4>
                    <p>{ selectedProject && selectedProject.technologies.length ? selectedProject.technologies.join(", "):"-"}</p>
                </div>
                <div>
                    <h4>
                        frontend Skills
                    </h4>
                    <p>{ selectedProject && selectedProject.fs.length ? selectedProject.fs.join(", "):"-"}</p>
                </div>
                <div>
                    <h4>
                        Backend Skills
                    </h4>
                    <p>{ selectedProject && selectedProject.bs.length ? selectedProject.bs.join(", "):"-"}</p>
                </div>
                <div>
                    <h4>
                        Databases
                    </h4>
                    <p>{ selectedProject && selectedProject.databases.length ? selectedProject.databases.join(", "):"-"}</p>
                </div>
                <div>
                    <h4>
                        Infrastructure
                    </h4>
                    <p>{ selectedProject && selectedProject.infrastructure.length ? selectedProject.infrastructure.join(", "):"-"}</p>
                </div>
                <div>
                    <h4>
                        Availability
                    </h4>
                    <p>{ selectedProject && selectedProject.availability.length ?selectedProject.availability :"-"}</p>
                </div>
            </Card>
        </Modal>
    </>
    )
}
