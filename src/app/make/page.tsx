import ConnectedWallet from '@/components/ConnectedWallet';
import NewEscrowForm from '@/components/NewEscrowForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Make Escrow',
};

function MakeEscrowPage() {
  return (
    <>
      <ConnectedWallet />
      <NewEscrowForm />
    </>
  );
}

export default MakeEscrowPage;
