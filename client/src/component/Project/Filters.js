import React, { useState, useEffect } from 'react'
import { Input } from "antd"
import axios from "axios"
import "./filter.css"
import { useSelector, useDispatch } from 'react-redux';
import { filtered } from "../../store/projectSlice.js"
const { Search } = Input
export default function Filters() {


    const [isProcessing, setIsProcesssing] = useState(false)
    const state = useSelector((state) => state.project)
    const dispatch = useDispatch();


    const handleQuery = (e) => {
        setInputData(e.target.value);
        //******************* */ Uncomment if we need to search from frontend ****************************
        // if (e.target.value.length > 2) {
        //     setIsProcesssing(true);
        //     searchProjects(e.target.value);
        //     setIsProcesssing(false);
        // } else {
        //     dispatch(filtered([]))
        //     setIsProcesssing(false);
        // }

    }
    // const searchProjects = (query) => {
    //     const results = state.projects.filter((item) =>
    //         Object.values(item).some((value) =>
    //             value.toString().toLowerCase().includes(query.toLowerCase())
    //         )
    //     );
    //     dispatch(filtered(results))
    // }


    const [inputData, setInputData] = useState("");
    useEffect(() => {
        let timerId = null;

        setIsProcesssing(true);
        timerId = setTimeout(() => {
            (async () => {
                try {
                    const apiUrl = `/projects/?input=${inputData}`
                    const response = await axios.get(apiUrl);
                    if (response) {
                        dispatch(filtered(response.data))
                        setIsProcesssing(false)
                    }
                } catch (err) {
                    console.log(err);
                    setIsProcesssing(false)
                }
            })()
        }, 800)


        return () => {
            clearTimeout(timerId);
        };
    }, [inputData])

    return (
        <div className='filter_container'>
            <Search placeholder="Search" onChange={(e) => { handleQuery(e) }} loading={isProcessing} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                <h3>Count: <span style={{ opacity: "0.5" }}>{state.filteredResult.length ? `${state.filteredResult.length}` : `${state.projects.length}`}</span></h3>
            </div>
        </div>
    )
}
