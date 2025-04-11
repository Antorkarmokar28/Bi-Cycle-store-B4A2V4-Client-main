import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
      const token = useAppSelector(useCurrentToken);
      if(!token){
            return <Navigate to="/signin" />
      }
      return children;
};

export default ProtectedRoute;