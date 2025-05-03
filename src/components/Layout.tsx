
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                A
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                Academic Risk Compass
              </h1>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
        {children}
      </main>
      <footer className="border-t mt-auto bg-background">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-muted-foreground">
            EduMetrics - By Dipak Kale
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
