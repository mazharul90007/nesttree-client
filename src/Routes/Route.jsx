import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import Dashboard from "../Layout/Dashboard";
import Error from "../Pages/Error/Error";
import Profile from "../Components/Profile/Profile";
import AddProperty from "../Pages/Dashboard/AddProperty/AddProperty";
import AdminRoute from "./AdminRoute";
import MyAddedProperties from "../Pages/Dashboard/MyAddedProperties/MyAddedProperties";
import UpdateProperty from "../Pages/Dashboard/updateProperty/updateProperty";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageProperties from "../Pages/Dashboard/ManageProperties/ManageProperties";
import PrivateRoute from "./PrivateRoute";


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
          element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
        },
        
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        
        //Agent Dashboard
        {
          path: 'agentProfile',
          element: <Profile></Profile>
        },
        {
          path: 'addProperty',
          element: <AddProperty></AddProperty>
        },
        {
          path: 'addedProperties',
          element: <MyAddedProperties></MyAddedProperties>
        },
        {
          path: 'updateProperty/:id',
          element: <UpdateProperty></UpdateProperty>,
          loader: ({params})=> fetch(`http://localhost:3000/property/${params.id}`)
        },
        //Admin Dashboard
        {
          path: 'adminProfile',
          element: <AdminRoute><Profile></Profile></AdminRoute>
        },
        {
          path: 'users',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'manageProperties',
          element: <ManageProperties></ManageProperties>
        }
      ]
    }
  ]);

  export default router;