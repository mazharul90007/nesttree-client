import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import Dashboard from "../Layout/Dashboard";
import Error from "../Pages/Error/Error";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Profile from "../Components/Profile/Profile";
import AddProperty from "../Pages/Dashboard/AddProperty/AddProperty";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'allProperties',
          element: <AllProperties></AllProperties>
        },
        
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'users',
          element: <AllUsers></AllUsers>
        },
        //Agent Dashboard
        {
          path: 'agentProfile',
          element: <Profile></Profile>
        },
        {
          path: 'addProperty',
          element: <AddProperty></AddProperty>
        },
        //Admin Dashboard
        {
          path: 'adminProfile',
          element: <Profile></Profile>
        },
      ]
    }
  ]);

  export default router;