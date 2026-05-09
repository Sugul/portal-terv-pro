import { ReactNode, useState } from 'react';
import { Sidebar, TopNav, BottomNav, MobileDrawer } from './Navigation';
import { Chatbot } from './Chatbot';

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <TopNav onMenuClick={() => setIsMobileDrawerOpen(true)} />
      <Sidebar />
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
      <main className="lg:ml-80 pt-24 pb-32 md:pb-12 px-4 md:px-margin max-w-7xl mx-auto">
        {children}
        
        {/* Footer */}
        <footer className="w-full py-xl mt-20 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-low rounded-[40px] px-8 border border-outline-variant">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-2xl font-display font-bold text-primary">TERV PRO</h4>
            <p className="text-sm font-medium text-on-surface-variant">© 2024 TERV PRO Campus Event Management</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Campus Directory'].map((link) => (
              <a key={link} className="text-sm font-bold text-on-surface-variant hover:text-secondary transition-colors" href="#">{link}</a>
            ))}
          </div>
        </footer>
      </main>
      <BottomNav />
      <Chatbot />
    </div>
  );
}
