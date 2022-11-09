import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Spinner from "./Spinner";
import Alert from "./Alert";

import { greet } from "../chain/interactions";

const Greeter = (props: { isOpen: boolean; close: any }) => {
    const [alertInfo, setAlertInfo] = useState({
        isOpen: false,
        message: "",
        type: "successs",
    } as any);

    const [spinnerInfo, setSpinnerInfo] = useState({
        isOpen: false,
        message: "",
    } as any);
    const updateAlertInfo = (newValues: any) => {
        setAlertInfo({ ...alertInfo, ...newValues });
    };
    const updateSpinnerInfo = (newValues: any) => {
        setSpinnerInfo({ ...spinnerInfo, ...newValues });
    };
    const closeAlert = () => {
        updateAlertInfo({ isOpen: false });
    };

    if (props.isOpen == false) {
        return null;
    }

    return (
        <div className="GreeterContainer">
            <Alert
                isOpen={alertInfo.isOpen}
                message={alertInfo.message}
                type={alertInfo.type}
                close={closeAlert}
            ></Alert>
            <Spinner
                isOpen={spinnerInfo.isOpen && alertInfo.isOpen == false}
                message="Broadcasting..."
            ></Spinner>
            <div className="Greeter">
                <div className="Container0">
                    <h1>Greeter Interaction</h1>
                    <h1 className="CloseButton" onClick={() => props.close()}>
                        Close
                    </h1>
                </div>
                <div className="FieldsContainer">
                    <div className="Field">
                        <div className="Name">Current message:</div>
                        <div className="CurrentMessage">
                            <div className="Value">Hello zkSync</div>
                            <div className="Button1">Refresh</div>
                        </div>
                    </div>
                    <div className="Field">
                        <div className="Name">New message:</div>
                        <input className="Input0"></input>
                    </div>
                    <div className="Field">
                        <div className="Name">Amount:</div>
                        <input className="Input0"></input>
                    </div>
                </div>
                <div
                    className="Button0"
                    onClick={async () => {
                        updateSpinnerInfo({ isOpen: true });
                        const { err } = await greet({
                            message: "Hello",
                            amount: "0.2",
                        });
                        updateSpinnerInfo({ isOpen: false });
                        if (err == "") {
                            updateAlertInfo({
                                isOpen: true,
                                message: "Success: Transaction submitted",
                                type: "success",
                            });
                        } else {
                            updateAlertInfo({
                                isOpen: true,
                                message: `Error: ${err}`,
                                type: "error",
                            });
                        }
                    }}
                >
                    Submit
                </div>
            </div>
        </div>
    );
};

export default Greeter;
