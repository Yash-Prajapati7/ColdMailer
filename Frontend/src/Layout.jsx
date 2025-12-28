import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-lavender-200 selection:text-lavender-900">
            <Header />
            <main className="relative z-0">
                <Outlet />
            </main>
        </div>
    );
}
