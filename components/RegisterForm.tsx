
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Sprout, ShoppingCart, Truck, ChevronLeft, ArrowRight, MapPin, AtSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterForm: React.FC<{ onSuccess: (role: UserRole, data: any) => void, onBack: () => void }> = ({ onSuccess, onBack }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    location: '', 
    farmType: '', 
    capacity: '' 
  });

  const roles = [
    { id: UserRole.PRODUCTEUR, icon: Sprout, label: "Producteur", desc: "Artisan de la terre" },
    { id: UserRole.ACHETEUR, icon: ShoppingCart, label: "Acheteur", desc: "Grossiste ou Bonne Dame" },
    { id: UserRole.LOGISTIQUE, icon: Truck, label: "Logistique", desc: "Transporteur certifié" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) onSuccess(role, form);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#E67E22] mb-10 hover:translate-x-[-4px] transition-transform">
        <ChevronLeft size={14} /> Revenir au marché
      </button>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-[#1B3C35] mb-3">S'unir pour nourrir</h2>
        <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">Le réseau agricole de confiance au Bénin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {roles.map(r => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 text-center apple-shadow ${role === r.id ? 'border-[#E67E22] bg-white scale-105' : 'border-transparent bg-white/50 opacity-70 hover:opacity-100'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${role === r.id ? 'bg-[#1B3C35] text-white' : 'bg-gray-100 text-gray-400'}`}>
              <r.icon size={28} />
            </div>
            <div>
              <span className="block text-xs font-black uppercase tracking-widest mb-1">{r.label}</span>
              <span className="text-[10px] text-gray-400 font-medium">{r.desc}</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {role && (
          <motion.form
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-[3rem] apple-shadow space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#E67E22]">Nom / Organisation</label>
                <input required className="w-full p-4 bg-[#FDFBF7] rounded-2xl outline-none text-sm font-bold" 
                  value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="Ferme Songhaï..." />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E67E22]">Localisation</label>
                <input required className="w-full p-4 bg-[#FDFBF7] rounded-2xl outline-none text-sm font-bold" 
                  value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Ville, Commune" />
              </div>

              {role === UserRole.PRODUCTEUR && (
                <div className="space-y-2 md:col-span-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E67E22]">Type de Culture / Élevage</label>
                   <select className="w-full p-4 bg-[#FDFBF7] rounded-2xl outline-none text-sm font-bold">
                     <option>Maraîchage (Tomate, Piment...)</option>
                     <option>Fruitiers (Ananas, Agrumes...)</option>
                     <option>Céréales (Maïs, Riz...)</option>
                     <option>Petits ruminants / Volailles</option>
                   </select>
                </div>
              )}
            </div>

            <button className="w-full py-5 bg-[#1B3C35] text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-[#E67E22] transition-all shadow-xl">
              Confirmer l'inscription <ArrowRight size={16} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterForm;
