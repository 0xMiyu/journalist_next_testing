import {
    AnchorWallet,
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import {
    Keypair,
    PublicKey,
    SystemProgram
} from "@solana/web3.js";
import { FC, useCallback } from "react";
import * as anchor from "@project-serum/anchor";
import { BN, Idl, Program, AnchorProvider } from "@project-serum/anchor";
import { Journalist } from "../data/journalist";
import * as idl from "../data/journalist.json";
import { NodeWallet } from "@metaplex/js";
import { Metaplex } from "@metaplex-foundation/js";

export const GetArticle: FC = () => {
    const { connection } = useConnection();
    const metaplex = new Metaplex(connection);
    // const { publicKey, sendTransaction } = useWallet();
    const dummyKp = Keypair.fromSecretKey(
        Uint8Array.from([
            208, 175, 150, 242, 88, 34, 108, 88, 177, 16, 168, 75, 115, 181, 199, 242, 120, 4, 78, 75, 19, 227, 13, 215,
            184, 108, 226, 53, 111, 149, 179, 84, 137, 121, 79, 1, 160, 223, 124, 241, 202, 203, 220, 237, 50, 242, 57,
            158, 226, 207, 203, 188, 43, 28, 70, 110, 214, 234, 251, 15, 249, 157, 62, 80,
        ])
    );
    const wallet = new NodeWallet(dummyKp);
    const PROGRAM_ID = "CV1DphaGKtzK1mMskXjDhSGQAnaXEqtq2dqFYSnXMrJm";
    
    const provider = new AnchorProvider(
        connection,
        wallet as any,
        AnchorProvider.defaultOptions()
    );
    const journalistProgram = new anchor.Program<Journalist>(
        idl as any,
        PROGRAM_ID,
        provider
    );
    const onClick = useCallback(async () => {
        try {
            let pdas = await journalistProgram.account.articleAccountState.all();
            // console.log(pdas);
            // let lmfao = await connection.getParsedAccountInfo(new PublicKey("GoMp6aZ3U7KxsxVCo3FmZ8gkEaxPhcE9aL82Z695zrss"))
            // 
            const mintAddress = new PublicKey(pdas[2].account.mintAddress)
            const nft = await metaplex.nfts().findByMint({mintAddress})
            // console.log(nft.uri);
            let data  = await (await fetch(nft.uri)).json();
            // console.log(data)
            let pdfurl = data.properties.files[0].uri;
            console.log(pdas);
            // console.log(pdfurl)
            console.log(Date.now())
            
        } catch (error: any) {
            alert(error);
            console.log(error);
        }
    }, []);
    return (
        <div>
            <button onClick={onClick}>Console.log Articles</button>
        </div>
    );
};
