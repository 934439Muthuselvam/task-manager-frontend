import axios from "axios";
import apiurl from "../../apiendpoint/apiendpoint";
export const apiAddtask=async(datas)=>{
    // console.log(datas)
    const  res=await axios.post(`${apiurl()}/authtask/apiAddtask`,datas,{headers:{}})
    return res.data
}

export const apiGettask=async(datas)=>{
    // console.log(datas)
    const  res=await axios.get(`${apiurl()}/authtask/apiGettask`,{params:datas})
    return res.data
}
export const apiupdatetask=async(datas)=>{
    // console.log(datas)
    const  res=await axios.put(`${apiurl()}/authtask/apiupdatetask`,datas)
    return res.data
} 
// export const apideleteUser=async(datas)=>{
//     // console.log(datas)
//     const  res=await axios.get(`${apiurl()}/authuser/apideleteuser`)
//     return res.data
// }
