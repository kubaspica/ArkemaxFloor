import { Link, useLocation } from 'react-router-dom';
import { Home, Box, Settings, User, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Přehled', path: '/', icon: Home },
  { name: '3D Půdorysy', path: '/floor-plan', icon: Box },
  { name: 'Nastavení', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col z-40">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-900/20">
            A
          </div>
          <div>
            <h1 className="text-white font-serif font-bold text-lg tracking-tight">ARKEMAX</h1>
            <p className="text-xs text-amber-500 font-medium tracking-wider uppercase">Toolkit</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-amber-600/10 text-amber-500 font-medium shadow-sm border border-amber-500/20'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <item.icon
                size={20}
                className={`transition-colors ${isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-white'}`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Makléř Jan</p>
            <p className="text-xs text-slate-500 truncate">jan@arkemax.cz</p>
          </div>
          <LogOut size={16} className="text-slate-500 hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}
