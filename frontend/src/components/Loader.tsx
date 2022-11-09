import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Loader = (props: { isOpen: boolean; message: string }) => {
    if (props.isOpen === false) {
        return null;
    }
    return (
        <div className="LoaderContainer">
            <h3 className="Message">{props.message}</h3>
            <div className="Spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
