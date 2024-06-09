import { Dashboard, Home, Projects, SignIn, SignUp, About } from "@/views";
import { Layout } from "../components";

export default [
  {
    path:'/',
    element:<Layout />,
    children:[
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ]
  }
];
