import { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Deployment from "./pages/Deployment";
import Management from "./pages/Management";

import Navbar from "./components/Navbar";

import "./style/css/App.css";
import "./style/css/config.css";

const App = () => {
    const [state, setState] = useState({
        loggedIn: false,
        account: "",
    } as any);

    const updateState = (newValues: any) => {
        setState({ ...state, ...newValues });
    };

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

                    <Route
                        path="/deployment"
                        element={
                            <Deployment
                                state={state}
                                updateState={updateState}
                            />
                        }
                    ></Route>
                    <Route
                        path="/management"
                        element={
                            <Management
                                state={state}
                                updateState={updateState}
                            />
                        }
                    ></Route>
                    <Route
                        path="/management/:initialAaAddr"
                        element={
                            <Management
                                state={state}
                                updateState={updateState}
                            />
                        }
                    ></Route>

                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
