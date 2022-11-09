import { ethers } from "ethers";
import { utils, Wallet, Provider, EIP712Signer, types } from "zksync-web3";

import { MetaMaskInpageProvider } from "@metamask/providers";

import AA_FACTORY_ARTIFACT from "./artifacts-zk/contracts/AAFactory.sol/AAFactory.json";
import MOCK_AA_ARTIFACT from "./artifacts-zk/contracts/MockAccount.sol/MockAccount.json";
import LIMITER_PLUGIN_ARTIFACT from "./artifacts-zk/contracts/LimiterPlugin.sol/Plugin.json";
import GREETER_ARTIFACT from "./artifacts-zk/contracts/Greeter.sol/Greeter.json";

const AA_FACTORY_ADDRESS = "0x28309d4f66C92Fe59E66C2b51aaa7E2aFa9DAF67";
const MOCK_AA_ADDRESS = "0xbA6ea71dA2bE007e3A7b1664305D2fA9709d0be5";
const LIMITER_PLUGIN_ADDRESS = "0x1e1284665417cFd5f7e723A2812dB53F52F644Fc";
const GREETER_ADDRESS = "0xA47B01Cfb50e668dA4a1b0Ae2fFE56dca34Cae65";

let url = "https://zksync2-testnet.zksync.dev";
let zkSyncProvider = new Provider(url);
const dummyWallet = new Wallet(
    "ca5d6fbfc07e61202eff0dd5bd253cd1e698e650fd7f4715a818eadde3e9cd04"
).connect(zkSyncProvider);

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

let _ethereum: MetaMaskInpageProvider;
let provider: any;
let signer: any;
let account: any;
let aaFactory: any;
let mockAccount: any;
let limiterPlugin: any;
let greeter: any;

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
        const _init = async () => {
            _ethereum = ethereum;
            await ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await ethereum.request({ method: "eth_accounts" });
            account = (accounts as any)[0];
            const _provider = new ethers.providers.Web3Provider(
                ethereum as any,
                "any"
            );
            console.log(_provider);
            await _provider.send("eth_requestAccounts", []);
            provider = _provider;
            signer = provider.getSigner();
            aaFactory = new ethers.Contract(
                AA_FACTORY_ADDRESS,
                AA_FACTORY_ARTIFACT.abi,
                signer
            );
            mockAccount = new ethers.Contract(
                MOCK_AA_ADDRESS,
                MOCK_AA_ARTIFACT.abi,
                signer
            );
            limiterPlugin = new ethers.Contract(
                LIMITER_PLUGIN_ADDRESS,
                LIMITER_PLUGIN_ARTIFACT.abi,
                dummyWallet
            );
            greeter = new ethers.Contract(
                GREETER_ADDRESS,
                GREETER_ARTIFACT.abi,
                dummyWallet
            );
        };

        await _init();

        ethereum.on("accountsChanged", async (accounts) => {
            props.updateState({ account: (accounts as any)[0] });
            await _init();
        });
        return { err: "" };
    }
    return { err: "Need to install Metamask" };
};

const deployNewAA = async (props: { ownerAddr: string }) => {
    console.log("called", { deployNewAA: props });
    const { ownerAddr } = props;

    await delay();
    const salt = ethers.constants.HashZero;

    const tx = await aaFactory.deployAccount(salt, ownerAddr);
    await tx.wait();
    // Getting the address of the deployed contract
    const abiCoder = new ethers.utils.AbiCoder();
    const pluginableAccountAddress = utils.create2Address(
        AA_FACTORY_ADDRESS,
        await aaFactory.aaBytecodeHash(),
        salt,
        abiCoder.encode(["address"], [ownerAddr])
    );
    return {
        err: "",
        aaAddr: pluginableAccountAddress,
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

const createLimitPlugin = async (props: {
    aaAddr: string;
    address: string;
    limit: string;
}) => {
    console.log("called", { createLimitPlugin: props });

    let aaTx = await limiterPlugin.populateTransaction.addWallets([
        {
            spender: props.address,
            amount: props.limit,
        },
    ]);

    const gasLimit = ethers.BigNumber.from("2000000");
    const gasPrice = await provider.getGasPrice();

    aaTx = {
        ...aaTx,
        from: props.aaAddr,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        chainId: (await provider.getNetwork()).chainId,
        nonce: await provider.getTransactionCount(props.aaAddr),
        type: 113,
        customData: {
            ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
        } as types.Eip712Meta,
        value: ethers.BigNumber.from(0),
    };

    const signedTxHash = EIP712Signer.getSignedDigest(aaTx);

    const signature = await _ethereum?.request({
        method: "eth_sign",
        params: [account, signedTxHash],
    });

    aaTx.customData = {
        ...aaTx.customData,
        customSignature: signature,
    };

    console.log(aaTx);

    const sentTx = await zkSyncProvider.sendTransaction(utils.serialize(aaTx));
    await sentTx.wait();

    console.log({ sentTx });

    return { err: "" };
};

const setGreeting = async (props: {
    aaAddr: string;
    message: string;
    amount: string;
}) => {
    console.log("called", { greet: props });

    let aaTx = await greeter.populateTransaction.setGreeting(props.message);

    const gasLimit = await zkSyncProvider.estimateGas(aaTx);
    //ethers.BigNumber.from("2000000");
    const gasPrice = await zkSyncProvider.getGasPrice();

    aaTx = {
        ...aaTx,
        from: props.aaAddr,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        chainId: (await zkSyncProvider.getNetwork()).chainId,
        nonce: await zkSyncProvider.getTransactionCount(props.aaAddr),
        type: 113,
        customData: {
            ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
        } as types.Eip712Meta,
        value: ethers.BigNumber.from(0),
    };

    const signedTxHash = EIP712Signer.getSignedDigest(aaTx);

    const signature = await _ethereum?.request({
        method: "eth_sign",
        params: [account, signedTxHash],
    });

    aaTx.customData = {
        ...aaTx.customData,
        customSignature: signature,
    };

    console.log(aaTx);

    const sentTx = await zkSyncProvider.sendTransaction(utils.serialize(aaTx));
    await sentTx.wait();

    console.log({ sentTx });

    return { err: "" };
};

const retrieveGreeting = async () => {
    const greeting = await greeter.greet();
    console.log(greeting);
    return { err: "", greeting };
};

export {
    init,
    deployNewAA,
    getAA_Info,
    getSigner,
    getAccount,
    createLimitPlugin,
    setGreeting,
    retrieveGreeting,
};
