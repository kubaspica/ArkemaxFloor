import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <SettingsIcon className="text-amber-600" /> Nastavení
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center py-20">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SettingsIcon size={32} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Ve vývoji</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Tato sekce je momentálně ve fázi vývoje. Brzy zde naleznete nastavení profilu, notifikací a integrací.
        </p>
      </div>
    </div>
  );
}
