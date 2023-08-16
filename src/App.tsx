import "./App.css";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Login.tsx";
import Registration from "./components/Registration.tsx";
import DataHandler from "./components/DataHandler.tsx";
import RequireAuth from "./components/RequireAuth.tsx";

function App() {


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
