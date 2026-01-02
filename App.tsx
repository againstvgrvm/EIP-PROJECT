
import React, { useState, useEffect } from 'react';
import { Post, User as UserType, UserRole } from './types.ts';
import Header from './components/Header.tsx';
import FeedCard from './components/FeedCard.tsx';
import RegisterForm from './components/RegisterForm.tsx';
import MouseFollower from './components/MouseFollower.tsx';
import ChatDrawer from './components/ChatDrawer.tsx';
import { storageService } from './services/storageService.ts';
import { ArrowDown, Diamond, Globe, Plus, Users, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [page, setPage] = useState<'feed' | 'register'>('feed');
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeChat, setActiveChat] = useState<Post | null>(null);

  useEffect(() => {
    storageService.getPosts().then(setPosts);
    setUser(storageService.getCurrentUser());
  }, []);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="min-h-screen bg-[#0F1A17] selection:bg-[#E67E22] selection:text-white">
      <MouseFollower />
      <Header 
        isLoggedIn={!!user} 
        onAuthClick={() => setPage('register')}
        onLogoClick={() => setPage('feed')}
        userAvatar={user?.avatar}
      />

      <AnimatePresence>
        {activeChat && (
          <ChatDrawer post={activeChat} onClose={() => setActiveChat(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {page === 'feed' ? (
          <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* HERO VERTICAL DIAMOND */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                 <motion.div 
                   animate={{ rotate: [0, 90, 180, 270, 360] }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="w-[800px] h-[800px] border border-[#D4AF37]/10 diamond-path"
                 />
              </div>

              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-6 max-w-4xl"
              >
                <div className="flex items-center justify-center gap-4 text-[#E67E22] mb-10">
                   <Diamond size={16} />
                   <span className="text-[10px] font-black uppercase tracking-[0.8em]">Bénin Excellence</span>
                   <Diamond size={16} />
                </div>
                
                <h1 className="serif-display text-7xl md:text-[10rem] text-white leading-[0.8] tracking-tighter uppercase">
                  Agri<br/>
                  <span className="text-[#D4AF37]">Connect</span>
                </h1>
                
                <p className="text-gray-500 font-medium text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mt-12">
                  L'écosystème où chaque récolte est un joyau. Connecter la terre aux marchés avec précision chirurgicale.
                </p>

                <div className="flex flex-col items-center gap-12 mt-20">
                   <button 
                     onClick={() => setPage('register')}
                     className="px-16 py-6 bg-white text-[#0F1A17] rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#E67E22] hover:text-white transition-all shadow-2xl"
                   >
                     Entrer dans le réseau
                   </button>
                   
                   <motion.div 
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="flex flex-col items-center gap-4 text-[#D4AF37]/40"
                   >
                      <span className="text-[9px] font-black uppercase tracking-widest">Explorer les lots</span>
                      <ArrowDown size={20} />
                   </motion.div>
                </div>
              </motion.div>
            </section>

            {/* LOTS FEED */}
            <section className="py-20 space-y-32 relative">
              <div className="text-center space-y-4">
                 <h2 className="serif-display text-4xl text-[#D4AF37]">Lots du Moment</h2>
                 <div className="w-12 h-px bg-[#E67E22] mx-auto" />
              </div>
              
              <div className="flex flex-col">
                {posts.slice(0, visibleCount).map((p, i) => (
                  <FeedCard key={p.id} post={p} index={i} onChatClick={setActiveChat} />
                ))}
              </div>

              {/* CHAMPS VOIR PLUS DE PRODUCTEURS */}
              {visibleCount < posts.length && (
                <div className="flex flex-col items-center justify-center py-20 pb-40">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShowMore}
                    className="group relative flex flex-col items-center gap-6"
                  >
                    <div className="relative w-24 h-24 md:w-32 md:h-32 diamond-border flex items-center justify-center bg-white/5 backdrop-blur-xl transition-all group-hover:bg-[#E67E22]/10">
                       <Plus size={32} className="text-[#D4AF37] group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                       <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Voir plus de producteurs</span>
                       <div className="flex items-center gap-2 text-white/30">
                          <Users size={12} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{posts.length - visibleCount} lots restants</span>
                       </div>
                    </div>
                    
                    <div className="absolute -inset-10 bg-[#D4AF37]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
              )}
            </section>

            {/* PRODUCTEURS VEDETTES SEARCH FIELD */}
            <section className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h3 className="serif-display text-6xl text-white">Trouver un<br/><span className="text-[#D4AF37]">Producteur</span> spécifique</h3>
                        <p className="text-gray-500 leading-relaxed max-w-md">Accédez au répertoire complet des artisans de la terre certifiés AgriConnect par zone géographique.</p>
                        <div className="relative group max-w-md">
                            <input 
                                type="text" 
                                placeholder="Rechercher par nom, ville ou culture..." 
                                className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white outline-none focus:border-[#D4AF37]/50 transition-all pr-16"
                            />
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={24} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {posts.slice(0, 4).map((p) => (
                            <div key={p.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer group">
                                <img src={p.userAvatar} className="w-12 h-12 rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all" alt="" />
                                <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">{p.userName}</h4>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">{p.location}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER DIAMOND */}
            <section className="py-40 bg-[#1B3C35] text-center rounded-[5rem_5rem_0_0] relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                  <div className="w-[1000px] h-[1000px] border-[50px] border-[#D4AF37] diamond-path" />
               </div>

               <div className="relative z-10 max-w-2xl mx-auto space-y-12 px-6">
                  <Globe className="mx-auto text-[#D4AF37]" size={40} />
                  <h3 className="serif-display text-5xl text-white">Prêt à transformer<br/>votre rendement ?</h3>
                  <p className="text-white/40 font-medium leading-relaxed">Rejoignez les 500+ producteurs Songhaï qui utilisent déjà AgriConnect pour valoriser leurs stocks et atteindre de nouveaux marchés.</p>
                  <button onClick={() => setPage('register')} className="px-12 py-5 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0F1A17] transition-all">
                    S'inscrire maintenant
                  </button>
               </div>
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="register" 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }}
            className="min-h-screen bg-[#FDFBF7] pt-32"
          >
            <RegisterForm 
              onBack={() => setPage('feed')}
              onSuccess={async (role, data) => {
                const newUser = await storageService.registerUser({...data, role});
                setUser(newUser);
                setPage('feed');
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
