import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Rejestracja from "./strony/Rejestracja";
import Logowanie from "./strony/Logowanie";
import Wczytywanie from "./strony/Wczytywanie";
import Glowna from "./strony/Glowna";
import Autor from "./strony/Autor";
import PasekM from "./komponenty/PasekM";
import Stopka from "./komponenty/Stopka";
import "./style.scss"
import Menu from "./komponenty/Menu";



const Elementy = ()=>{
  return (
    <>
    <PasekM/>
    <Outlet/>
    <Stopka/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Elementy/>,
    children:[
      {
        path: "/",
        element: <Glowna/>
      },
      {
        path: "/autor/:id",
        element: <Autor/>
      },
      {
        path: "/wczytywanie",
        element: <Wczytywanie/>
      },
    ]
      
  },
  
  {
    path: "/rejestracja",
    element: <Rejestracja/>,
  },
  {
    path: "/logowanie",
    element: <Logowanie/>,
  },
]);

function App() {
  return(
    <div className="app">
      <div className="kontener">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}


export default App;
