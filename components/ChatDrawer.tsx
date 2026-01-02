
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, MessageCircle } from 'lucide-react';
import { Post } from '../types';

interface ChatDrawerProps {
  post: Post | null;
  onClose: () => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ post, onClose }) => {
  const [message, setMessage] = useState('');

  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0F1A17] border-l border-white/10 z-[100] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#1B3C35]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 p-0.5">
              <img src={post.userAvatar} className="w-full h-full object-cover rounded-full" alt="" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{post.userName}</h4>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">En ligne</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="text-white/40" size={20} />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-2 mb-10">
            <ShieldCheck className="text-[#D4AF37]/30" size={32} />
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] max-w-[200px]">
              Discussion sécurisée par AgriConnect Bénin
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Message Producer */}
            <div className="max-w-[80%] bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
              <p className="text-sm text-gray-300 leading-relaxed">
                Bonjour ! Merci de l'intérêt pour mon lot de {post.productType}. Nos stocks de {post.quantity} sont certifiés Bio. Comment puis-je vous aider ?
              </p>
              <span className="text-[9px] text-white/20 mt-2 block uppercase tracking-widest">Il y a 2 min</span>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-8 bg-[#0F1A17] border-t border-white/5">
          <div className="relative">
            <input
              type="text"
              placeholder="Votre message..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-colors"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D4AF37] text-[#0F1A17] rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatDrawer;
