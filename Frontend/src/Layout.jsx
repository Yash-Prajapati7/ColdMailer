import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";

export default function Layout() {
    const layoutStyle = {
        backgroundColor: "#111827", 
        color: "#FFFFFF",
        minHeight: "100vh", 
        margin: 0,
        padding: 0,
    };

    return (
        <div style={layoutStyle}>
            <Header />
            <Outlet />
        </div>
    );
}
