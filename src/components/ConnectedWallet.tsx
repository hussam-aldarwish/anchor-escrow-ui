'use client';
import { alertService } from '@/services/alertService';
import { useWallet } from '@solana/wallet-adapter-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

function ConnectedWallet() {
  const { connected } = useWallet();

  useEffect(() => {
    if (!connected) {
      alertService.sendAlert(
        'You need to connect your wallet to use the Anchor Escrow System.',
        'error'
      );

      redirect('/');
    }
  }, [connected]);

  return null;
}

export default ConnectedWallet;
