import {create} from 'zustand';
const useAuth=create((set)=>({
    Issignin :localStorage.getItem('access_token')!=null?true: false,
    boolval:true,
    settoken:(token)=>set(()=>{
        localStorage.setItem("access_token",token)
        return{Issignin:true }
    }),
    userdetails:()=>{
        var token=localStorage.getItem('access_token');
        if(token!=null){
            const decode=(JSON.parse(window.atob(token.split('.')[1])));  
            return decode;
        }
        else{
            return null;
        }
    },
    logout:()=>set(()=>{
        localStorage.removeItem('access_token');
        return{Issignin:false }

    }),

    setboolval: () => set((state) => {
        return { boolval: !state.boolval }; 
    })
}))
export default useAuth;