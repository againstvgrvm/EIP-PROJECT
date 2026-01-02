
import React from 'react';
import { Sprout, LogIn, Bell, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onLogoClick: () => void;
  userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onAuthClick, onLogoClick, userAvatar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 glass z-50 px-6 md:px-12">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-[#1B3C35] w-10 h-10 rounded-xl text-white flex items-center justify-center transition-transform group-hover:rotate-12">
            <Leaf size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter uppercase leading-none text-[#1B3C35]">AgriConnect</span>
            <span className="text-[9px] text-[#E67E22] font-black uppercase tracking-[0.4em]">Benin</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Bell size={20} className="text-[#1B3C35]" />
              <img src={userAvatar} className="w-9 h-9 rounded-full border border-[#E67E22]/30" />
            </div>
          ) : (
            <motion.button
              whileHover={{ y: -2 }}
              onClick={onAuthClick}
              className="bg-[#1B3C35] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl"
            >
              Nous Rejoindre
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
