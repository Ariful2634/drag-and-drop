import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import ViewPage from "../ViewPage/ViewPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/viewPage',
          element:<ViewPage></ViewPage>
        }
      ]
    },
  ]);