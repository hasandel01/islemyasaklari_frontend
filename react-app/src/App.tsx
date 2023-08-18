import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, BrowserRouter} from "react-router-dom";
import Login from "./components/Login.tsx";
import Registration from "./components/Registration.tsx";
import MainPage from "./components/MainPage.tsx";
import DataHandler from "./components/DataHandler.tsx";
import {useEffect, useState} from "react";
import LinksContainer from "./components/LinksContainer.tsx";
import RequireAuth from "./components/RequireAuth.tsx";

function App() {

    const [showLinks, setShowLinks] = useState(true);
    // const location = useLocation();

    useEffect(() => {
        setShowLinks(location.pathname === "/");
    }, [location]);

    return (
        <>
       <BrowserRouter>
           <div>
               <Routes>
                   {/*PUBLIC ROUTES*/}
                   <Route path={"/registration"} element={<Registration/>} />
                   <Route path={"/log-in"} element={<Login/>} />
                   {/*PRIVATE ROUTES*/}
                   <Route element={<RequireAuth />} >
                        <Route path={"/"} element={<DataHandler/>} />
                   </Route>
               </Routes>
           </div>
       </BrowserRouter>
        </>
    );
}

export default App;
