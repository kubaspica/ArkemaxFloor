import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AIChat } from './AIChat';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Sidebar />
      <main className="pl-64 min-h-screen transition-all duration-300">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
      <AIChat />
    </div>
  );
}
