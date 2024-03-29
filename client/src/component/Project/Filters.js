import React, { useState, useEffect } from 'react';
import { Input, Modal, Button, Select, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import "./filter.css";
import { useSelector, useDispatch } from 'react-redux';
import { filtered, setProcessing } from "../../store/projectSlice.js";
import { apiService } from '../../services/api.js';
import { projectConstants as pc } from './constant';
const { Search } = Input
export default function Filters() {
    const [isProcessing, setIsProcesssing] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const state = useSelector((state) => state.project)
    const dispatch = useDispatch();

    const handleQuery = (e) => {
        setInputData(e.target.value);
    }

    const [query, setQuery] = useState({});
    const setFilterValueHandler = async (value, key) => {
        setQuery({ ...query, [key]: value })
    }

    const searchHandler = async () => {
        setIsFilter(false);
        dispatch(setProcessing(true));
        try {
            const res = await apiService.getFilteredProjects({ url: pc.GET_FILTER_PROJECT_URL, params: query })
            if (res.data) {
                dispatch(filtered(res.data));
                dispatch(setProcessing(false));
            }
        } catch (err) {
            console.log(err)
            dispatch(setProcessing(false));
        }

    }

    const [inputData, setInputData] = useState("");
    useEffect(() => {
        let timerId = null;
        if (inputData.length) {
            setIsProcesssing(true);
            dispatch(setProcessing(true));
            timerId = setTimeout(() => {
                (async () => {
                    try {
                        const apiUrl = `${pc.GET_PROJECTS_URL
                            }/?input=${inputData}`
                        const response = await apiService.getProjects({ url: apiUrl })
                        if (response.data) {
                            dispatch(filtered(response.data))
                            setIsProcesssing(false)
                            dispatch(setProcessing(false));
                        }
                    } catch (err) {
                        console.log(err);
                        setIsProcesssing(false)
                        dispatch(setProcessing(false));
                    }
                })()
            }, 800)
        } else {
            dispatch(filtered(null))
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [inputData])

    return (
        <>
            <div className='filter_container'>
                <div style={{ width: "400px" }}>
                    <Search style={{ width: "400px" }} placeholder="Search" onChange={(e) => { handleQuery(e) }} loading={isProcessing} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <h3 style={{ color: "white" }}>Count: <span style={{ opacity: "0.5" }}>{state.filteredResult ? `${state.filteredResult.length}` : `${state.projects.length}`}</span></h3>
                </div>
            </div>
            <div>
                <div onClick={() => { setIsFilter(true) }} className='filter_icon'>
                    <Tooltip placement="leftTop" title="Filter" >
                        <FilterOutlined />
                    </Tooltip>
                </div>
            </div>
            <Modal
                title="Filter"
                style={{ position: "absolute", top: "0px", right: "0px", height: "100vh", width: "480px" }}
                open={isFilter}
                footer={[<Button
                    style={{ display: "flex", minWidth: "105px", justifyContent: "center", backgroundColor: "black" }}
                    type="primary"
                    onClick={searchHandler}
                >
                    Search
                </Button>]}
                onCancel={() => { setIsFilter(false) }}
            >
                <div className='filterIcon_input'>
                    <div style={{ padding: "17px 0px 17px" }}>
                        <div>
                            <span style={{ fontWeight: "bold", opacity: "0.7" }}>
                                Select Frontend Skills:
                            </span>
                        </div>
                        <div>
                            <Select
                                mode="tags"
                                size={10}
                                placeholder="Frontend Skills"
                                defaultValue={[]}
                                onChange={(value) => { setFilterValueHandler(value, "fs") }}
                                style={{
                                    width: '100%',
                                }}
                                options={state.fs}
                            />
                        </div>
                    </div>
                    <div style={{ padding: "17px 0px 17px" }}>
                        <div>
                            <span style={{ fontWeight: "bold", opacity: "0.7" }}>
                                Select Backend Skills:
                            </span>
                        </div>
                        <div>
                            <Select
                                mode="tags"
                                size={10}
                                placeholder="Backend Skills"
                                defaultValue={[]}
                                onChange={(value) => { setFilterValueHandler(value, "bs") }}
                                style={{
                                    width: '100%',
                                }}
                                options={state.bs}
                            />
                        </div>
                    </div>
                    <div style={{ padding: "17px 0px 17px" }}>
                        <div>
                            <span style={{ fontWeight: "bold", opacity: "0.7" }}>
                                Select Database:
                            </span>
                        </div>
                        <div>
                            <Select
                                mode="tags"
                                size={10}
                                placeholder="Database"
                                defaultValue={[]}
                                onChange={(value) => { setFilterValueHandler(value, "db") }}
                                style={{
                                    width: '100%',
                                }}
                                options={state.databases}
                            />
                        </div>
                    </div>
                    <div style={{ padding: "17px 0px 17px" }}>
                        <div>
                            <span style={{ fontWeight: "bold", opacity: "0.7" }}>
                                Select Infrastructure:
                            </span>
                        </div>
                        <div>
                            <Select
                                mode="tags"
                                size={10}
                                placeholder="Infrastructure"
                                defaultValue={[]}
                                onChange={(value) => { setFilterValueHandler(value, "infrastructure") }}
                                style={{
                                    width: '100%',
                                }}
                                options={state.infrastructure}
                            />
                        </div>
                    </div>
                    <div style={{ padding: "17px 0px 17px" }}>
                        <div>
                            <span style={{ fontWeight: "bold", opacity: "0.7" }}>
                                Select Technologies:
                            </span>
                        </div>
                        <div>
                            <Select
                                mode="tags"
                                size={10}
                                placeholder="Technologies"
                                defaultValue={[]}
                                onChange={(value) => { setFilterValueHandler(value, "tg") }}
                                style={{
                                    width: '100%',
                                }}
                                options={state.technologies}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
