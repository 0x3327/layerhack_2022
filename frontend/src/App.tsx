import { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Deployment from "./pages/Deployment";
import Management from "./pages/Management";

import "./style/css/App.css";
import "./style/css/config.css";
import Home from "./pages/Home";

const App = () => {
    const [state, setState] = useState({
        loggedIn: false,
        account: "",
    } as any);

    const updateState = (newValues: any) => {
        setState({ ...state, ...newValues });
    };

    console.log({ state });

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar state={state} updateState={updateState}></Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home state={state} updateState={updateState} />
                        }
                    ></Route>

                    <Route path="/deployment" element={<Deployment />}></Route>
                    <Route path="/management" element={<Management />}></Route>
                    <Route
                        path="/management/:initialAaAddr"
                        element={<Management />}
                    ></Route>

                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
