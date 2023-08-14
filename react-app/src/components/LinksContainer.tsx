import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import Login from "./components/Login.tsx";
import Registration from "./components/Registration.tsx";
import MainPage from "./components/MainPage.tsx";
import DataHandler from "./components/DataHandler.tsx";


function LinksContainer() {
    const [showLinks, setShowLinks] = useState(true);
    const location = useLocation();

    const handleLinkClick = () => {
        setShowLinks(false);
    };

    // Reset showLinks state to true when location changes (route changes)
    React.useEffect(() => {
        setShowLinks(true);
    }, [location.pathname]);

    return (
        <div>
            {showLinks && (
                <>
                    <Link
                        className={"link-property"}
                        to={"/registration"}
                        onClick={handleLinkClick}
                    >
                        SIGN UP
                    </Link>
                    <Link
                        className={"link-property"}
                        to={"/log-in"}
                        onClick={handleLinkClick}
                    >
                        SIGN IN
                    </Link>
                    <Link
                        className={"link-property"}
                        to={"/query"}
                        onClick={handleLinkClick}
                    >
                        QUERY
                    </Link>
                </>
            )}
        </div>
    );
}


export default LinksContainer