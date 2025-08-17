import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets"; 
import axios from "axios";
import {toast} from 'react-toastify'

export const AppContext=createContext();

export const AppContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [searchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched]=useState(false)

    const [jobs, setJobs]=useState([])
    const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    const [companyToken,setCompanyToken]=useState(null)
    const [companyData,setCompanyData]=useState(null)
    const [userData,setUserData]=useState(null)
    const [userApplication,setUserApplication]=useState(null)


    const fetchJobs= async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/jobs')
            if(data.success){
                setJobs(data.jobs)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCompanyData=async()=>{
        try {
            const {data} = await axios.get(backendUrl+'api/company/company',{headers:{token:companyToken}})
            if(data.success){
                setCompanyData(data.company)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchJobs()
        const storedCompanyToken=localStorage.getItem('companyToken')
        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }
    },[])

    useEffect(()=>{
        if(companyToken){
            fetchCompanyData()
        }
    },[companyToken])

    const value={
        setSearchFilter,searchFilter,
        setIsSearched,isSearched,
        jobs,setJobs,showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl
    };

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}