import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Spinner from "../components/Spinner";

const Greeter = (props: { isOpen: boolean; close: any }) => {
    if (props.isOpen == false) {
        return null;
    }

    return (
        <div className="GreeterContainer">
            <Spinner isOpen={true} message="Broadcasting..."></Spinner>
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
                <div className="Button0">Submit</div>
            </div>
        </div>
    );
};

export default Greeter;
