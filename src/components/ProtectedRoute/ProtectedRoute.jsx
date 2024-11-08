import useAuth from '../../Shared/hooks/useAuth'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const{Issignin}=useAuth();
    if(!Issignin){
        return<Navigate to={'/'}/>
    }
  return  children;
}
