import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LimitPluginInfo = () => {
    return (
        <div className="Plugin">
            <div className="FieldsContainer">
                <div className="Field">
                    <div className="Identifier">Name:</div>
                    <div className="Value">Enforced limit</div>
                </div>
                <div className="Field">
                    <div className="Identifier">Authority</div>
                    <div className="Value">
                        0x275986f4F52a03A24C926616e53165bc27edF65e
                    </div>
                </div>
                <div className="Field">
                    <div className="Identifier">Limit</div>
                    <div className="Value">0.45 ETH</div>
                </div>
            </div>
            <div className="Container0">
                <div></div>
                <div className="Button1">Deactivate</div>
            </div>
        </div>
    );
};

export default LimitPluginInfo;
