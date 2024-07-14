'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

export default function Home() {
  const { connected } = useWallet();
  return (
    <div className="flex flex-col space-y-4 text-center">
      <h1 className="text-4xl">Welcome to the Anchor Escrow System!</h1>
      <p className="text-lg">
        This is a demonstration of the Anchor Escrow System.
      </p>

      {connected ? (
        <div className="mt-4 flex flex-col items-center">
          <Link
            className="mb-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            href="/make"
          >
            Make Escrow
          </Link>
          <Link
            className="mb-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            href="/dashboard"
          >
            Review All Escrows
          </Link>
        </div>
      ) : (
        <p className="text-lg">
          You need to connect your wallet to use the Anchor Escrow System.
        </p>
      )}
    </div>
  );
}
