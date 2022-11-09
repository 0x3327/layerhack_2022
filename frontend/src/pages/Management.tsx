import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    useNavigate,
} from "react-router-dom";
import { getAA_Info, init } from "../chain/interactions";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";
import LimitPluginInfo from "../components/plugins/LimitPluginInfo";
import LimitPluginCreation from "../components/plugins/LimitPluginCreation";

import Greeter from "../components/Greeter";

type PluginData = {
    name: string;
    authority: string;
    limit: string;
};

const Management = () => {
    const navigate = useNavigate();
    const { initialAaAddr } = useParams();
    const [aaAddr, setAaAddr] = useState(
        initialAaAddr === undefined ? "" : initialAaAddr
    );
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);

    const [aaBalance, setAaBalance] = useState("");
    const [aaPlugins, setAaPlugins] = useState(Array<PluginData>);

    //overlays
    const [greeterOpen, setGreeterOpen] = useState(false);
    const [limitPluginCreationOpen, setLimitPluginCreationOpen] =
        useState(false);

    const reload = async () => {
        if (aaAddr == "") return;
        setIsLoadingInfo(true);
        setAaAddr(aaAddr);
        setAaBalance("fetching...");
        setAaPlugins([]);

        const { balance, plugins } = await getAA_Info({
            addr: aaAddr,
        });
        setAaBalance(balance);
        setAaPlugins(plugins);
        setIsLoadingInfo(false);
    };

    useEffect(() => {
        reload();
    }, []);
    return (
        <div className="Management">
            <Greeter
                isOpen={greeterOpen}
                close={() => setGreeterOpen(false)}
            ></Greeter>
            <LimitPluginCreation
                isOpen={limitPluginCreationOpen}
                close={() => setLimitPluginCreationOpen(false)}
            ></LimitPluginCreation>
            <div className="Container0">
                <h1>Management</h1>
                <div
                    className="GreeterButton"
                    onClick={() => setGreeterOpen(true)}
                >
                    Open Greeter
                </div>
            </div>

            <h3>Information:</h3>
            <div className="InputContainer">
                <input
                    className="Input0"
                    placeholder="Input AA's 0x-address"
                    value={aaAddr}
                    onChange={async (e) => {
                        const _addr = e.target.value;
                        if (_addr === "") return;
                        setAaAddr(_addr);
                    }}
                ></input>
                <div
                    className="Button0"
                    onClick={() => {
                        navigate(`/management/${aaAddr}`);
                        reload();
                    }}
                >
                    Query
                </div>
            </div>
            <div>
                <Spinner
                    isOpen={isLoadingInfo}
                    message={"Fetching account information..."}
                />
                <div className="AA_Info">
                    <div className="Field">
                        <div className="Identifier">Balance:</div>
                        <div className="Value">{aaBalance}</div>
                    </div>
                    <div className="Field">
                        <div className="Identifier">Number of plugins:</div>
                        <div className="Value">{aaPlugins.length}</div>
                    </div>
                </div>
                <div className="AddPlugin">
                    <h3>Add Plugin:</h3>
                    <div className="PluginInfoContainer">
                        <div
                            className="PluginInfo"
                            onClick={() => setLimitPluginCreationOpen(true)}
                        >
                            <h4>Enforced Limit</h4>
                            <h5 className="Live">Live</h5>
                        </div>
                        <div className="PluginInfo">
                            <h4>ERC20 Limit</h4>
                            <h5 className="ComingSoon">Coming Soon</h5>
                        </div>
                        <div className="PluginInfo">
                            <h4>NFT Limit</h4>
                            <h5 className="ComingSoon">Coming Soon</h5>
                        </div>
                    </div>
                </div>
                <div className="ActivePlugins">
                    <h3>Active plugins:</h3>
                    {aaPlugins.map((e) => (
                        <LimitPluginInfo></LimitPluginInfo>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Management;