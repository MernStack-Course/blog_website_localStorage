import { useAuthContext } from '../context/Auth'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
    const {isAuth} = useAuthContext();
  return (
    <div>
        {
            isAuth ? children : <Navigate to= '/signin'/>
        }
    </div>
  )
}

export default ProtectedRoutes