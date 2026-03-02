import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Champions from "./components/Champions";
import Items from "./components/Items";
import ChampionDetail from "./components/ChampionDetail";
import ItemDetail from "./components/ItemDetail";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

    },
    {
        path: "/champions",
        element: <Champions />
    },
    {
        path: "/items",
        element: <Items />
    },
    {
        path: "/champion/:id",
        element: <ChampionDetail />
    },
    {
        path: "/item/:id",
        element: <ItemDetail />
    }
])

export default router;