import {
    AnchorWallet,
    useAnchorWallet,
    useConnection,
    useWallet,
    WalletNotSelectedError,
} from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import { FC, useCallback } from "react";
import * as anchor from "@project-serum/anchor";
import { BN, Idl, Program, AnchorProvider, toInstruction } from "@project-serum/anchor";
import { Journalist } from "../data/journalist";
import * as idl from "../data/journalist.json";
import { NodeWallet } from "@metaplex/js";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";

export const UploadArticle: FC = () => {
    const { connection } = useConnection();
    // const { publicKey, sendTransaction } = useWallet();
    // const leakedKp = Keypair.fromSecretKey(
    //     Uint8Array.from([
    //         208, 175, 150, 242, 88, 34, 108, 88, 177, 16, 168, 75, 115, 181, 199, 242, 120, 4, 78, 75, 19, 227, 13, 215,
    //         184, 108, 226, 53, 111, 149, 179, 84, 137, 121, 79, 1, 160, 223, 124, 241, 202, 203, 220, 237, 50, 242, 57,
    //         158, 226, 207, 203, 188, 43, 28, 70, 110, 214, 234, 251, 15, 249, 157, 62, 80,
    //     ])
    // );
    // const wallet = new NodeWallet(leakedKp);
    
    // if(!publicKey) throw new WalletNotConnectedError();
    // const wallet = useAnchorWallet();
    const PROGRAM_ID = "CV1DphaGKtzK1mMskXjDhSGQAnaXEqtq2dqFYSnXMrJm";
    const { publicKey, sendTransaction, wallet } = useWallet();
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
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            alert('Wallet not Connected!');
            return;
        }
        try {
            let authorAccount: PublicKey;
            let author = "samuel";
            let mint_address = "GoMp6aZ3U7KxsxVCo3FmZ8gkEaxPhcE9aL82Z695zrss";
            let timestamp = new BN(Date.now());
            [authorAccount] = PublicKey.findProgramAddressSync(
                [
                    publicKey.toBytes(),
                    timestamp.toArrayLike(Buffer, 'be', 8),
                ],
                new PublicKey(PROGRAM_ID)
            );
            const transaction = new Transaction();
            const ix = journalistProgram.methods.upload()??????????????????;
            transaction.add(ix);
            // await connection.confirmTransaction({
            //     blockhash: (await connection.getLatestBlockhash("max")).blockhash,
            //     lastValidBlockHeight: (await connection.getLatestBlockhash("max")).lastValidBlockHeight,
            //     signature: tx,
            // });
            // alert("Transaction Confirmed!");
                
            console.log("werk?");
        } catch (error: any) {
            alert(error);
            console.log(error);
        }
    }, []);
    return (
        <div>
            <button onClick={onClick}>Upload Test!!</button>
        </div>
    );
};
