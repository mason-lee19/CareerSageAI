import { LayoutProps } from '../types/layout';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ 
  children,
  className = ''
}: LayoutProps): JSX.Element {
  return (
    <div className={`w-full min-h-screen bg-neutral-300 shadow-lg flex flex-col ${className}`}>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}