import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
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
       <Router>
            <LinksContainer/>
           <div>
               <Routes>
                   {/*PUBLIC ROUTES*/}
                   <Route path={"/"} element={<MainPage/>} />
                   <Route path={"/registration"} element={<Registration/>} />
                   <Route path={"/log-in"} element={<Login/>} />

                   {/*PRIVATE ROUTES*/}
                   <Route element={<RequireAuth />} >
                        <Route path={"/query"} element={<DataHandler/>} />
                   </Route>
               </Routes>
           </div>
       </Router>
        </>
    );
}

export default App;
