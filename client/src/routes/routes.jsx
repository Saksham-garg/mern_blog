import { Dashboard, Home, Projects, SignIn, SignUp, About } from "@/views";
import { Header } from "../components";

export default [
  {
    path:'/',
    element:<Header />,
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
