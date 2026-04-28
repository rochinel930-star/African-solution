import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Leaf, 
  Zap, 
  ShieldCheck, 
  BatteryCharging, 
  Flame, 
  Clock, 
  MessageCircle, 
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  Play,
  Pause
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Constants ---
const WA_NUMBER = "+242061151490";
const NEW_ORDER_LINK = "https://ginseng-commande.vercel.app";

const TESTIMONIALS = [
  { name: "Marc, 34 ans", city: "Brazzaville", text: "J'étais toujours fatigué après le travail. Depuis que je prends ce thé, j'ai retrouvé mon énergie de jeunesse.", rating: 5 },
  { name: "Jean-Claude, 42 ans", city: "Kinshasa", text: "Très efficace. Je le recommande publiquement à tous les hommes qui ressentent une baisse de régime.", rating: 5 },
  { name: "Eric, 39 ans", city: "Pointe-Noire", text: "Le goût est agréable et les effets sont réels. J'ai repris confiance en moi, fini la honte.", rating: 5 },
  { name: "Fabrice, 48 ans", city: "Dolisie", text: "C'est devenu ma routine du matin. Ça m'aide énormément pour la concentration et le physique.", rating: 4 }
];

const TestimonialSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToNext = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const itemWidth = scrollRef.current.children[0]?.clientWidth || clientWidth;
        scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }
  }, []);

  const scrollToPrev = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (scrollLeft <= 0) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        const itemWidth = scrollRef.current.children[0]?.clientWidth || clientWidth;
        scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        scrollToNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, scrollToNext]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Disable autoplay when user interacts via keyboard
    if (e.key === 'ArrowLeft') {
      setIsAutoPlaying(false);
      scrollToPrev();
    } else if (e.key === 'ArrowRight') {
      setIsAutoPlaying(false);
      scrollToNext();
    }
  };

  return (
    <div 
      className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-[24px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Testimonials slider. Use left and right arrow keys to navigate."
    >
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar space-x-4 pb-8 -mx-4 px-4 focus:outline-none"
      >
        {TESTIMONIALS.map((item, i) => (
          <div key={i} className="min-w-[85vw] md:min-w-[350px] snap-center bg-brand-dark border border-[#333] p-6 rounded-[24px] flex-shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageCircle className="w-20 h-20" />
            </div>
            <div className="flex text-brand-gold mb-3">
              {[...Array(item.rating)].map((_, j) => <StarIcon key={j} />)}
            </div>
            <p className="text-gray-300 italic mb-6 relative z-10 font-medium leading-relaxed">
              "{item.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center font-bold font-serif text-white">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-sm text-gray-500">{item.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Play/Pause Button */}
      <div className={`absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-20`}>
        <button 
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-brand-gold/90 text-brand-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform backdrop-blur-sm cursor-pointer border-2 border-brand-gold/50 flex outline-none focus-visible:ring-4 focus-visible:ring-white"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoPlaying ? <Pause className="w-8 h-8 fill-brand-black" /> : <Play className="w-8 h-8 fill-brand-black" />}
        </button>
      </div>
    </div>
  );
};

// --- UI Components ---
const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 px-4 md:px-8 max-w-lg mx-auto md:max-w-3xl lg:max-w-5xl ${className}`}>
    {children}
  </section>
);

const ButtonOrder = ({ className = "", fullWidth = true }: { className?: string, fullWidth?: boolean }) => {
  return (
    <div className={`flex flex-col items-center ${fullWidth ? 'w-full' : ''} ${className}`}>
      <div className="animate-pulse mb-3 bg-brand-gold/10 border border-brand-gold/30 px-4 py-1.5 rounded-full">
        <span className="text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-md text-center block">
          ⚡ Stock limité — Commandez aujourd'hui !
        </span>
      </div>
      <a
        href={NEW_ORDER_LINK}
        className={`
          group relative flex flex-col items-center justify-center
          bg-gradient-to-b from-[#166534] to-[#14532d] 
          hover:from-[#15803d] hover:to-[#166534]
          border border-[#4ade80]/30
          text-white rounded-[16px] 
          shadow-[0_8px_0_#064e3b,0_15px_30px_rgba(22,101,52,0.4)]
          hover:shadow-[0_5px_0_#064e3b,0_10px_20px_rgba(22,101,52,0.4)]
          hover:translate-y-[3px] transition-all duration-200
          active:shadow-[0_0px_0_#064e3b,0_0px_0px_rgba(22,101,52,0)]
          active:translate-y-[8px]
          px-4 py-4 md:px-6 overflow-hidden animate-breathe
          ${fullWidth ? 'w-full' : 'px-10'}
        `}
      >
        <div className="absolute top-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-shimmer" />
        <span className="font-black text-lg md:text-2xl drop-shadow-md mb-1 uppercase tracking-wide flex items-center gap-2 text-center leading-tight">
          🛒 Commander maintenant
        </span>
        <span className="text-[10px] md:text-[11px] font-bold text-[#bbf7d0] tracking-[2px] uppercase opacity-90 text-center">
          Paiement à la livraison • Livraison rapide
        </span>
      </a>
    </div>
  );
};

const SectionTitle = ({ children, subtitle, gold }: { children: React.ReactNode, subtitle?: string, gold?: boolean }) => (
  <div className="mb-10 w-full border-l-[4px] border-brand-red pl-5">
    <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-2 uppercase text-brand-gold leading-none`}>
      {children}
    </h2>
    {subtitle && <p className="text-gray-400 text-lg uppercase tracking-[3px] mt-2">{subtitle}</p>}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-red selection:text-white pb-24 md:pb-0">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-red flex items-center justify-center font-black text-white">AS</div>
          <span className="font-black text-lg tracking-wider text-brand-gold uppercase">African Solution</span>
        </div>
        <a href={NEW_ORDER_LINK} className="bg-gradient-to-r from-[#166534] to-[#14532d] border border-[#4ade80]/30 text-white px-4 py-2 rounded-lg shadow-lg animate-breathe font-bold text-xs uppercase tracking-wider flex items-center gap-2">
          🛒 Commander
        </a>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden bg-gradient-to-b from-brand-dark via-[#1a0505] to-brand-dark">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544367567-0f2fcb046eb9?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark" />
        
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-brand-gold text-brand-black px-2 py-[2px] rounded font-black text-[10px] uppercase w-fit mb-6"
          >
            Nouveau au Congo
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-[1.1] uppercase tracking-tighter text-brand-gold"
          >
            Retrouvez Votre <span className="text-brand-gold">Puissance</span> d'Homme
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 font-medium leading-snug mb-10"
          >
            Le secret 100% naturel pour vaincre la fatigue chronique, retrouver une énergie inépuisable et dominer vos journées.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md mt-6"
          >
            <ButtonOrder />
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <Section className="bg-brand-dark rounded-[24px] border border-[#333] mt-8 relative z-20">
        <SectionTitle>La vérité que beaucoup d'hommes cachent...</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mt-12 w-full">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed text-gray-300">
              Le stress quotidien, le travail acharné et l'âge réduisent silencieusement votre vitalité. 
            </p>
            <ul className="space-y-4">
              {[
                "Vous vous réveillez déjà fatigué le matin ?",
                "Coup de barre incontournable l'après-midi ?",
                "Baisse de performances et d'endurance ?",
                "Perte de confiance en vous face à la pression sociale ?"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="mt-1 bg-red-900/50 p-2 rounded-full">
                    <BatteryCharging className="w-5 h-5 text-brand-red" />
                  </div>
                  <span className="text-base text-gray-200 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 grayscale mix-blend-luminosity opacity-80">
            <img 
              src="https://images.unsplash.com/photo-1542385151-efd5e239275a?q=80&w=800&auto=format&fit=crop" 
              alt="Homme fatigué" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-bold text-2xl text-white">Ne laissez pas la fatigue dicter votre vie.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SOLUTION SECTION */}
      <Section className="bg-gradient-to-b from-brand-black to-brand-dark isolate relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556942004-98dfec985b88?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-screen" />
        
        <div className="relative z-10 flex flex-col items-center">
          <SectionTitle gold>La Solution Naturelle</SectionTitle>
          
          <div className="bg-brand-red text-white font-bold px-6 py-3 rounded-lg uppercase tracking-wider mb-8">
            African Solution Ginseng Tea
          </div>

          <div className="w-full relative aspect-video max-w-lg mx-auto mb-10 rounded-lg overflow-hidden border border-brand-gold shadow-2xl bg-cover flex flex-col items-center justify-center font-bold text-white uppercase" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1596715094246-871d3466f28a?auto=format&fit=crop&q=80&w=800')" }}>
            <h3 className="text-2xl font-serif text-brand-gold mb-2 tracking-widest">Extrait Pur de Ginseng</h3>
            <p className="text-sm text-gray-300 tracking-[2px]">[ Boîte de Thé ]</p>
          </div>

          <p className="text-center text-xl md:text-2xl font-medium leading-relaxed max-w-2xl text-gray-200">
            Une infusion puissante formulée à partir de racines de <span className="text-brand-gold font-bold">Ginseng Rouge premium</span>, 
            utilisée depuis des millénaires pour ses vertus tonifiantes.
          </p>
        </div>
      </Section>

      {/* BENEFITS SECTION */}
      <Section>
        <SectionTitle>Résultats Garantis</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-10">
          {[
            { icon: <Zap />, title: "Énergie Explosive", desc: "Soyez en pleine forme du matin au soir sans baisse de régime." },
            { icon: <TrendingUp />, title: "Performance Maximale", desc: "Retrouvez votre endurance et votre vigueur masculine naturelle." },
            { icon: <ShieldCheck />, title: "Système Immunitaire", desc: "Renforce vos défenses naturelles contre le stress et la fatigue." },
            { icon: <Leaf />, title: "100% Naturel", desc: "Sans produits chimiques, sans effets secondaires nocifs." }
          ].map((benefit, i) => (
            <div key={i} className="bg-brand-dark border border-[#333] p-6 rounded-[24px] flex items-start gap-5 hover:border-brand-gold/50 transition-colors">
              <div className="bg-brand-red/10 p-3 rounded-xl">
                <div className="text-brand-red w-8 h-8 flex items-center justify-center">{benefit.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 w-full max-w-md mx-auto">
          <ButtonOrder />
        </div>
      </Section>

      {/* WHATSAPP PROOF SECTION */}
      <Section className="bg-zinc-950">
        <SectionTitle>Ils nous écrivent tous les jours</SectionTitle>
        <div className="max-w-sm mx-auto bg-brand-dark rounded-[24px] overflow-hidden border border-[#333] shadow-2xl relative">
          {/* WA Header */}
          <div className="bg-[#050505] border-b border-[#222] text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#444] rounded-full flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506803682983-33e9b46281a8?w=100&h=100&fit=crop" alt="avatar" />
            </div>
            <div>
              <p className="font-bold text-sm">CLIENT TEA 167</p>
              <p className="text-[10px] text-[#25D366]">en ligne</p>
            </div>
          </div>
          {/* WA Body */}
          <div className="p-4 bg-[#050505] min-h-[300px] flex flex-col gap-3">
            <div className="bg-[#E2FFC7] text-[#303030] p-[10px] rounded-[10px] max-w-[85%] text-[13px] self-start mt-2">
              Bonjour boss, j'ai bien reçu la commande. J'ai commencé hier avec une tasse le matin.
              <span className="text-[10px] text-gray-500 block text-right mt-1">10:14</span>
            </div>
            <div className="bg-white text-[#303030] p-[10px] rounded-[10px] max-w-[85%] self-end text-[13px]">
              Bonjour ! Super, tenez-nous au courant des résultats d'ici 3 à 4 jours. 🙏
              <span className="text-[10px] text-gray-500 block text-right mt-1">10:42 ✓✓</span>
            </div>
            <div className="w-full text-center my-2 text-xs text-gray-500 font-medium mx-auto rounded-full py-1">
              Aujourd'hui
            </div>
            <div className="bg-[#E2FFC7] text-[#303030] p-[10px] rounded-[10px] max-w-[90%] text-[13px] self-start">
              Mon frère, ce thé c'est la magie ! 🤯 La fatigue a totalement disparu. Je suis en pleine forme au travail et... à la maison madame est très très contente. Je veux prendre 2 boîtes en plus pour mon stock.
              <span className="text-[10px] text-gray-500 block text-right mt-1">14:05</span>
            </div>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS SLIDER */}
      <Section className="overflow-hidden">
        <SectionTitle gold>Des Hommes Satisfaits</SectionTitle>
        <TestimonialSlider />
      </Section>

      {/* EXPERT SECTION */}
      <Section className="bg-brand-dark border-y border-[#333]">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 w-full">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-gold/30 shrink-0 mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1537213459972-e1d871d3a681?q=80&w=600&auto=format&fit=crop" 
              alt="Expert santé" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-brand-gold">
               <Award className="w-5 h-5" />
               <h3 className="font-bold uppercase tracking-wide">Naturel & Efficace</h3>
             </div>
             <p className="text-xl leading-relaxed text-gray-300 italic mb-6">
                "Le Ginseng est reconnu scientifiquement pour sa capacité à améliorer la circulation sanguine, booster la testostérone naturelle et réduire drastiquement la fatigue liée au stress. C'est le bouclier naturel de l'homme moderne."
             </p>
             <p className="font-bold text-white uppercase tracking-wider">Le choix des hommes forts</p>
          </div>
        </div>
      </Section>

      {/* PRICING / OFFERS */}
      <Section id="commander">
        <SectionTitle>Choisissez Votre Cure</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Pack 1 */}
          <div className="bg-brand-dark border border-[#333] rounded-[24px] p-6 flex flex-col">
            <h3 className="text-xl font-bold uppercase mb-2 text-brand-gold">Cure Découverte</h3>
            <p className="text-gray-400 text-sm mb-6">Idéal pour tester les premiers effets</p>
            <div className="mb-6 pb-6 border-b border-[#333]">
              <span className="text-4xl font-black">1</span> <span className="text-xl text-gray-400">Boîte</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-red" /> regain d'énergie initial</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-red" /> diminution de la fatigue</li>
            </ul>
            <ButtonOrder />
          </div>

          {/* Pack 2 - Highlight */}
          <div className="bg-[rgba(212,175,55,0.05)] border border-brand-gold rounded-[24px] p-6 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-black font-black uppercase text-[10px] tracking-widest py-1 px-3 rounded">
              OFFRE SPÉCIALE
            </div>
            <h3 className="text-xl font-bold uppercase mb-2 text-brand-gold">Cure Intense</h3>
            <p className="text-white/80 text-sm mb-6">Le choix numéro 1 de nos clients</p>
            <div className="mb-6 pb-6 border-b border-brand-gold/30">
              <span className="text-4xl font-black text-white">2</span> <span className="text-xl text-white/80">Boîtes</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Performances maximales</li>
              <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Vitalité constante toute la journée</li>
              <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Effets prolongés</li>
            </ul>
            <ButtonOrder />
          </div>

          {/* Pack 3 */}
          <div className="bg-brand-dark border border-[#333] rounded-[24px] p-6 flex flex-col md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold uppercase mb-2 text-brand-gold">Cure Complète</h3>
            <p className="text-gray-400 text-sm mb-6">Pour une transformation totale</p>
            <div className="mb-6 pb-6 border-b border-[#333]">
              <span className="text-4xl font-black">3</span> <span className="text-xl text-gray-400">Boîtes</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Traitement de fond</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Énergie d'un homme de 20 ans</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Système immunitaire blindé</li>
            </ul>
            <ButtonOrder />
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black py-8 border-t border-white/10 text-center px-4 mb-20 md:mb-0 mt-10">
        <div className="flex items-center justify-center gap-2 mb-4 grayscale opacity-50">
          <div className="w-6 h-6 rounded bg-brand-red flex items-center justify-center font-black text-white text-xs">AS</div>
          <span className="font-bold tracking-wider uppercase">African Solution</span>
        </div>
        <p className="text-sm text-gray-500">Service certifié - Livraison confidentielle en main propre.</p>
        <p className="text-xs text-gray-600 mt-2">© {new Date().getFullYear()} African Solution. Tous droits réservés.</p>
      </footer>

      {/* FLOATING MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-black/95 backdrop-blur-md border-t border-brand-gold/20 z-50 md:hidden">
         <ButtonOrder />
      </div>
      
      {/* FLOATING DESKTOP BUTTON */}
      <a 
        href={NEW_ORDER_LINK} 
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#166534] to-[#14532d] border border-[#4ade80]/30 text-white px-8 py-4 rounded-[16px] shadow-[0_6px_0_#064e3b,0_15px_30px_rgba(22,101,52,0.4)] hover:translate-y-[2px] hover:shadow-[0_4px_0_#064e3b,0_10px_20px_rgba(22,101,52,0.4)] active:translate-y-[6px] active:shadow-[0_0px_0_#064e3b,0_0px_0_rgba(22,101,52,0)] transition-all animate-breathe font-black text-xl uppercase tracking-widest items-center gap-3 overflow-hidden group"
      >
        <div className="absolute top-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-shimmer" />
        🛒 Commander
      </a>

    </div>
  );
}

// Simple internal icon for stars to avoid importing more from lucide if not needed, or just use plain SVG
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

