import { GraduationCap, Home, Calendar, Building2, History, MessageCircleQuestion, UserCircle, Bell, Search, Menu, X, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Building2, label: 'About Us', path: '/about' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Users, label: 'Student Access', path: '/student-access' },
  { icon: MessageCircleQuestion, label: 'Help', path: '/help' },
];

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant h-16 flex items-center">
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {onMenuClick && (
            <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
              <Menu size={24} />
            </button>
          )}
          <div className="flex items-center gap-2 text-primary">
            <img src="https://terv.pro/terv-logo.png" alt="TERV PRO Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight">TERV PRO</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors hidden sm:block">
            <Search size={22} />
          </button>
          <div className="relative">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
              <Bell size={22} />
            </button>
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
          </div>
          <button className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
            <UserCircle size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 w-80 bg-white border-r border-outline-variant pt-24 pb-8">
      <div className="px-6 mb-8">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Campus Central</h2>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-secondary-container text-on-secondary-container font-bold translate-x-1 shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:translate-x-1'
              }`
            }
          >
            <item.icon size={22} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="px-6 mt-auto">
        <div className="p-4 bg-surface-container rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white">
            <UserCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">Admin User</p>
            <p className="text-xs text-on-surface-variant">Campus Management</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-[280px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <img src="https://terv.pro/terv-logo.png" alt="TERV PRO Logo" className="w-10 h-10 object-contain" />
                <h1 className="text-lg font-bold">TERV PRO</h1>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-lg">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 py-4 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3 px-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-secondary-container text-on-secondary-container font-bold' 
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`
                  }
                >
                  <item.icon size={22} />
                  <span className="font-semibold">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white border-t border-outline-variant px-2 py-3 flex justify-around items-center rounded-t-2xl shadow-lg">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              isActive 
                ? 'bg-primary-container text-white scale-110 shadow-md' 
                : 'text-on-surface-variant hover:bg-surface-container'
            }`
          }
        >
          <item.icon size={20} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
