import axios from "axios";
import apiurl from "../../apiendpoint/apiendpoint";
export const apiAddUser=async(datas)=>{
    // console.log(datas)
    const  res=await axios.post(`${apiurl()}/authuser/apiadduser`,datas,{headers:{}})
    return res.data
}

export const apiGetUser=async(datas)=>{
    // console.log(datas)
    const  res=await axios.get(`${apiurl()}/authuser/apigetuser`)
    return res.data
}

export const apiupdateUser=async(datas)=>{
    // console.log(datas)
    const  res=await axios.put(`${apiurl()}/authuser/apiputuser`,datas)
    return res.data
} 

export const apideleteUser=async(datas)=>{
    // console.log(datas)
    const  res=await axios.get(`${apiurl()}/authuser/apideleteuser`)
    return res.data
}
