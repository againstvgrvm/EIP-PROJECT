
import React from 'react';
import { Post } from '../types.ts';
import { MapPin, Sparkles, MoveRight, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeedCardProps {
  post: Post;
  index: number;
  onChatClick: (post: Post) => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ post, index, onChatClick }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full max-w-7xl mx-auto py-40 flex flex-col items-center">
      
      {/* NUMÉRO EN RELIEF (L'ÉLÉMENT PILIER) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`absolute top-0 ${isEven ? 'left-4 md:left-20' : 'right-4 md:right-20'} z-20 flex flex-col items-center`}
      >
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 w-24 h-40 md:w-32 md:h-56 rounded-[3rem] flex flex-col items-center justify-between py-10 shadow-[20px_20px_60px_#050807,-20px_-20px_60px_#131e1b] transition-transform hover:-translate-y-2">
            <span className="serif-display text-5xl md:text-7xl font-black text-[#D4AF37]">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-1.5 h-12 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-40 rounded-full" />
              <span className="writing-mode-vertical text-[10px] font-black uppercase tracking-[0.5em] text-white/30 rotate-180">
                PRODUIT PREMIUM
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={`relative w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 md:gap-24 px-6`}>
        
        {/* LE LOSANGE CENTRAL */}
        <motion.div 
          initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
          whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] diamond-border group shrink-0"
        >
          <div className="w-full h-full bg-[#1B3C35] diamond-path overflow-hidden">
            <img 
              src={post.contentImage} 
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
              alt={post.productType}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F1A17]/90 via-transparent to-transparent opacity-60" />
          </div>
          
          {/* Badge flottant sur le losange */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-white">Provenance: {post.location}</span>
          </div>
        </motion.div>

        {/* LE RECTANGLE D'INFORMATION SOFT */}
        <motion.div 
          initial={{ x: isEven ? 50 : -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-[#15231F]/90 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-8">
            
            <div className={`flex items-center gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20 p-1">
                <img src={post.userAvatar} className="w-full h-full object-cover rounded-xl" alt={post.userName} />
              </div>
              <div className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">{post.userName}</span>
                <div className="flex items-center gap-1.5 mt-1 opacity-50">
                  <Heart size={10} className="text-[#E67E22]" />
                  <span className="text-[10px] font-bold text-gray-300">{post.likes} Partenaires</span>
                </div>
              </div>
            </div>

            <div className={`space-y-4 ${isEven ? 'text-left' : 'text-right'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E67E22]/10 rounded-full border border-[#E67E22]/20">
                <Sparkles size={10} className="text-[#E67E22]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#E67E22]">{post.productType}</span>
              </div>
              
              <h3 className="serif-display text-4xl md:text-5xl text-white leading-[0.9]">
                {post.quantity} <br/>
                <span className="text-[#D4AF37] italic">En Stock</span>
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed font-medium pt-2">
                "{post.description}"
              </p>
            </div>

            <div className={`pt-6 flex flex-wrap items-center gap-4 ${isEven ? 'justify-start' : 'justify-end'}`}>
              <button className="relative overflow-hidden px-8 py-5 bg-[#D4AF37] text-[#0F1A17] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 group/btn">
                <span className="relative z-10 flex items-center gap-3">
                  Réserver <MoveRight size={16} />
                </span>
              </button>
              
              <button 
                onClick={() => onChatClick(post)}
                className="flex items-center gap-3 px-8 py-5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
              >
                <MessageCircle size={16} className="text-[#E67E22]" />
                Discuter
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-px h-32 bg-gradient-to-b from-white/5 to-transparent" />
    </div>
  );
};

export default FeedCard;
