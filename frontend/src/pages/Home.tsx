import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { init, getSigner, getAccount } from "../chain/interactions";

const Home = (props: { state: any; updateState: any }) => {
    const navigate = useNavigate();
    const { state, updateState } = props;
    const { loggedIn } = state;

    console.log(updateState);

    // useEffect(() => {
    //     const { err, signer } = getSigner();
    //     if (err == "") {
    //         updateState({ loggedIn: true });
    //     } else {
    //         updateState({ loggedIn: false });
    //     }
    // }, []);

    if (loggedIn) {
        return (
            <div className="Home">
                <h1>AA Plugin Manager</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
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
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
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
