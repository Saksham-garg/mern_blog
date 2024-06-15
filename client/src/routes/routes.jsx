import { Dashboard, Home, Projects, SignIn, SignUp, About, CreatePost, UpdatePost, PostPage } from "@/views";
import { Layout, PrivateComponent, PrivateCreatePostComponent } from "../components";

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
        element: <PrivateComponent>
            <Dashboard />
        </PrivateComponent>,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/create-post",
        element: <PrivateCreatePostComponent>
          <CreatePost />
        </PrivateCreatePostComponent>,
      },
      {
        path: "/update-post/:postId",
        element: <PrivateCreatePostComponent>
          <UpdatePost />
        </PrivateCreatePostComponent>,
      },
      {
        path:'post/:slug',
        element:<PostPage />
      }

    ]
  }
];
