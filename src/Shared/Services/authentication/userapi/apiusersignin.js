import axios from "axios";
import apiurl from "../../apiendpoint/apiendpoint";
export const apisignin=async(datas)=>{
    // console.log(datas)
    const  res=await axios.post(`${apiurl()}/authuser/apiusersignin`,datas,{headers:{}})
    return res.data
}
