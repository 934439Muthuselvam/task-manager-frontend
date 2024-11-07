import axios from "axios";
import apiurl from "../../apiendpoint/apiendpoint";
export const apisignup=async(datas)=>{
    // console.log(datas)
    const  res=await axios.post(`${apiurl()}/authuser/apiusersignup`,datas,{headers:{}})
    return res.data
}
