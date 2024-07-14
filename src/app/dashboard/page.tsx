import ConnectedWallet from '@/components/ConnectedWallet';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

function Dasboard() {
  return (
    <>
      <ConnectedWallet />
    </>
  );
}

export default Dasboard;
