import { AnchorEscrow } from '@/contract/anchor_escrow';
import idl from '@/contract/anchor_escrow.json';
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor';
import {
  getAssociatedTokenAddressSync,
  getMint,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  AnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { randomBytes } from 'crypto';

const useEscrowProgram = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const provider = new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: 'confirmed',
  });
  const program = new Program<AnchorEscrow>(idl as AnchorEscrow, provider);

  const getTokenProgram = async (mint: PublicKey) => {
    const mintInfo = await provider.connection.getAccountInfo(mint);
    return mintInfo?.owner.equals(TOKEN_2022_PROGRAM_ID)
      ? TOKEN_2022_PROGRAM_ID
      : TOKEN_PROGRAM_ID;
  };

  const getMintInfo = async (mint: PublicKey) => {
    const tokenProgram = await getTokenProgram(mint);
    return getMint(provider.connection, mint, undefined, tokenProgram);
  };

  const makeEscrow = async ({
    mint_a,
    mint_b,
    deposit,
    receive,
  }: {
    mint_a: string;
    mint_b: string;
    deposit: number;
    receive: number;
  }) => {
    const { publicKey } = wallet;
    if (!publicKey) return;

    const seed = new BN(randomBytes(8));
    const mintA = new PublicKey(mint_a);
    const mintB = new PublicKey(mint_b);
    const tokenProgram = await getTokenProgram(mintA);

    const makerAtaA = getAssociatedTokenAddressSync(
      mintA,
      publicKey,
      false,
      tokenProgram
    );
    const [escrow] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        publicKey.toBuffer(),
        seed.toArrayLike(Buffer, 'le', 8),
      ],
      program.programId
    );

    const vault = getAssociatedTokenAddressSync(
      mintA,
      escrow,
      true,
      tokenProgram
    );
    const mintAInfo = await getMintInfo(mintA);
    const mintAAmount = new BN(deposit).mul(
      new BN(10).pow(new BN(mintAInfo.decimals))
    );
    const mintBInfo = await getMintInfo(mintB);
    const mintBAmount = new BN(receive).mul(
      new BN(10).pow(new BN(mintBInfo.decimals))
    );

    return program.methods
      .make(seed, mintAAmount, mintBAmount)
      .accounts({
        maker: publicKey,
        mintA,
        mintB,
        makerAtaA,
        vault,
        tokenProgram,
      })
      .rpc();
  };

  return {
    makeEscrow,
  };
};

export default useEscrowProgram;
