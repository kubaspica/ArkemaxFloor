import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, ArrowRight, Sparkles, Building2, Users } from 'lucide-react';

const TOOLS = [
  {
    title: '3D Půdorysy',
    description: 'Převod 2D náčrtů na profesionální 3D vizualizace.',
    icon: Box,
    path: '/floor-plan',
    color: 'bg-amber-600',
  },
  {
    title: 'Správa Klientů',
    description: 'Efektivní správa databáze klientů a poptávek.',
    icon: Users,
    path: '/clients', // Placeholder
    color: 'bg-slate-700',
  },
  {
    title: 'Nemovitosti',
    description: 'Přehled a editace vašeho portfolia nemovitostí.',
    icon: Building2,
    path: '/properties', // Placeholder
    color: 'bg-slate-900',
  },
];

export function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-12 shadow-2xl shadow-slate-900/20"
      >
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
            <Sparkles size={14} />
            <span>Vítejte zpět, Jane</span>
          </div>
          <h1 className="text-5xl font-serif font-bold tracking-tight leading-tight">
            Vaše realitní kancelář <br />
            <span className="text-amber-500">budoucnosti.</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            Využijte sílu umělé inteligence pro rychlejší prodej a lepší prezentaci nemovitostí.
            Všechny nástroje, které potřebujete, na jednom místě.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              to="/floor-plan"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-900/20 flex items-center gap-2"
            >
              Vytvořit 3D Půdorys <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TOOLS.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Link
              to={tool.path}
              className="group block h-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {tool.description}
              </p>
              <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-600">
                <ArrowRight size={24} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
