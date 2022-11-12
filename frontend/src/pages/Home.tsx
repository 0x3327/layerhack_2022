import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { init, getSigner, getAccount } from "../chain/interactions";

const INTRO_TEXT = "Built for the Encode.Club's LayerHack 2022";

const Home = (props: { state: any; updateState: any }) => {
    const navigate = useNavigate();
    const { state, updateState } = props;
    const { loggedIn } = state;

    console.log(updateState);

    if (loggedIn) {
        return (
            <div className="Home">
                <h1>AA Plugin Manager</h1>
                <p>{INTRO_TEXT}</p>
                <div className="Entry">
                    <div
                        className="Button0"
                        onClick={() => navigate("/deployment")}
                    >
                        Deploy new AA
                    </div>
                </div>
                <div className="Entry">
                    <div
                        className="Button0"
                        onClick={() => navigate("/management")}
                    >
                        Manage an existing AA
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Home">
                <h1>AA Plugin Manager</h1>
                <p>{INTRO_TEXT}</p>
                <div className="Entry">
                    <div
                        className="Button0"
                        onClick={async () => {
                            const { err } = await init({ updateState });
                            if (err == "") {
                                const { err, account } = getAccount();
                                if (err == "") {
                                    updateState({ loggedIn: true, account });
                                }
                            }
                        }}
                    >
                        Connect Metamask
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;
