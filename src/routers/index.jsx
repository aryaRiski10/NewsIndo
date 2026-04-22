import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Source from "../pages/Source";
import App from "../App";
import RootLayout from "../layouts/RootLayout";
import Error from "../components/Error";
import { loaderSource, loaderBySource } from "../services/newsServices";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        HydrateFallback: () => null,
        loader: loaderSource,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Homepage />,

            },
            {
                path: "/source/:sourceName",
                element: <Source />,
                loader: loaderBySource,
            }
        ]
    }
])