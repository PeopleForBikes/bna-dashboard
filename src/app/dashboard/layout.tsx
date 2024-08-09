import type { ReactNode } from 'react';

import Header from '@Components/Headers';
import Sprites from '@Components/Sprites';
import Footer from '@Components/Footer';


async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="hidden">
        <Sprites />
      </div>

      <Header />
      <main className="main-layout">
        {children}
      </main>
      <Footer />
    </>
  );
}


export default Layout;
