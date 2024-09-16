import {Navigate, Outlet} from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean | undefined;
    redirectPath?: string;
}

const PrivateRoute = ({isAuthenticated, redirectPath = '/'}: PrivateRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace/>;
    }

    return <Outlet/>;
};

export default PrivateRoute;
