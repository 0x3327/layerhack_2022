import { ethers } from "ethers";

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

let signer: any;
let account: any;

const getSigner = () => {
    if (signer == null) {
        return { err: "Need to sign in first.", signer: null };
    }
    return { err: "", signer };
};

const getAccount = () => {
    if (account == null) {
        return { err: "Need to sign in first.", account: null };
    }
    return { err: "", account };
};

const delay = async () => {
    await new Promise((r) => setTimeout(r, 2000));
};

const init = async (props: { updateState: any }) => {
    const { ethereum } = window;
    if (ethereum != null) {
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({ method: "eth_accounts" });
        account = (accounts as any)[0];
        const provider = new ethers.providers.Web3Provider(
            ethereum as any,
            "any"
        );
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        ethereum.on("accountsChanged", (accounts) => {
            props.updateState({ account: (accounts as any)[0] });
        });
        return { err: "" };
    }
    return { err: "Need to install Metamask" };
};

const deployNewAA = async (props: { ownerAddr: string }) => {
    console.log("called", { deployNewAA: props });
    const { ownerAddr } = props;

    await delay();

    return {
        err: "",
        aaAddr: "0x18237182bcfe93127389afa",
    };
};

const getAA_Info = async (props: { addr: string }) => {
    console.log("called", { getAA_Info: props });

    const { addr } = props;
    await delay();
    return {
        err: "",
        balance: "1.533367 ETH",
        plugins: [
            {
                name: "erc20-limit",
                authority: "0x275986f4F52a03A24C926616e53165bc27edF65e",
                limit: "0.123 ETH",
            },
            {
                name: "erc20-limit",
                authority: "0x275986f4F52a03A24C926616e53165bc27edF65e",
                limit: "0.523 ETH",
            },
            {
                name: "erc20-limit",
                authority: "0x9999919239192952378fa81234123151512356346346",
                limit: "0.123 ETH",
            },
        ],
    };
};

const createLimitPlugin = async (props: { address: string; limit: string }) => {
    console.log("called", { createLimitPlugin: props });

    await delay();

    return { err: "" };
};

const greet = async (props: { message: string; amount: string }) => {
    console.log("called", { greet: props });

    await delay();

    return { err: "" };
};

export {
    init,
    deployNewAA,
    getAA_Info,
    getSigner,
    getAccount,
    createLimitPlugin,
    greet,
};
