import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <aside>
        <p>TALENT OLYMPICS | Escrow UI Chanllenge</p>
        <Link href="https://github.com/hussam-aldarwish" target="_blank">
          Hussam ALDARWISH
        </Link>
      </aside>
    </footer>
  );
}

export default Footer;
