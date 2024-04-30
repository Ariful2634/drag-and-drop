import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import ViewPage from "../ViewPage/ViewPage";
import Page1 from "../ViewPage/Page1";
import Page2 from "../ViewPage/Page2";
import Page3 from "../ViewPage/Page3";

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
        },
        {
          path:`/page1/:name`,
          element:<Page1></Page1>,
          loader:()=>fetch('http://192.168.60.127:8085/get-source-info/')
        },
        {
          path:`/page2/:name`,
          element:<Page2></Page2>,
          loader:()=>fetch('http://192.168.60.127:8085/get-source-info/')
        },
        {
          path:`/page3/:name`,
          element:<Page3></Page3>,
          loader:()=>fetch('http://192.168.60.127:8085/get-source-info/')
        },
      ]
    },
  ]);