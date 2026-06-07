import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {

    const handleScroll = () => {
        const fab = document.getElementById('fab-top');
        if (fab) {
            if (window.scrollY > 500) {
                fab.classList.remove('hidden');
            } else {
                fab.classList.add('hidden');
            }
        }
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const stickies = document.querySelectorAll('.sticky-note, .sticky-note-2');
        stickies.forEach(sticky => {
            const speed = 20;
            const deg = sticky.classList.contains('sticky-note') ? -8 : 1.5;
            sticky.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${deg}deg)`;
        });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return (
    <>

<header className="bg-background w-full px-margin-desktop py-4 flex justify-between items-center border-b-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 sticky top-0">
<div className="flex items-center gap-6">
<div className="font-display-xl text-[24px] leading-tight tracking-tighter text-on-background bg-primary-container px-3 py-1 border-4 border-on-background rotate-[-1.5deg]">
                DOC_FINDER.EXE
            </div>
<nav className="hidden md:flex gap-6">
<a onClick={(e) => { e.preventDefault(); navigate('/search'); }} className="cursor-pointer text-on-background border-b-4 border-secondary font-button-text text-button-text" href="#">Find Doctors</a>
<a onClick={(e) => { e.preventDefault(); document.getElementById('system-status')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer text-on-surface-variant font-button-text text-button-text hover:text-on-background transition-all" href="#system-status">System Status</a>
<a onClick={(e) => { e.preventDefault(); document.getElementById('emergency')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer text-on-surface-variant font-button-text text-button-text hover:text-on-background transition-all" href="#emergency">Emergency</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button onClick={() => navigate('/login')} className="bg-secondary text-on-secondary px-6 py-2 border-4 border-on-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-button-text text-button-text hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                LOGIN
            </button>
<button onClick={() => navigate('/apply-doctor')} className="hidden lg:block bg-primary-container text-on-primary-container px-6 py-2 border-4 border-on-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-button-text text-button-text hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                APPLY_AS_DOCTOR
            </button>
</div>
</header>
<main className="relative min-h-screen">
{/* Hero Section */}
<section className="bg-primary-container relative py-stack-lg px-margin-desktop min-h-[921px] flex flex-col justify-center overflow-hidden">
{/* Decorative Elements */}
<div className="absolute top-10 right-10 rotate-[5deg] hidden lg:block">
<img alt="Ambulance" className="w-96 border-4 border-on-background shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnhgBh3zC7b-NLt3wnXcEgRQMT8uDxx_kC_zc9YfxB2fpvXPoWacOQ2rn-reDTZV_y7h0VlbtWAZbL63MjY_ycwxKjCrXR2Vu3TaH-xpb_yx9a3DVOIKPftkBqsjt3RvtKQvgvzi4FdNTLv4bF52wuT-azBnpGl531_wIETk5cgJ7cfMjqmboDRhsvkdxEj4VoXalEnhEm5czp-7STYJbqV5LvcBDxYwXBYpHkKu7wgYb1EBEpa1QOl-eDLqvyVBV_qfuF6cH5KoEc" />
</div>
<div className="max-w-4xl relative z-10">
<div className="inline-block bg-on-background text-on-primary px-4 py-1 font-tag-label text-tag-label mb-6 rotate-[-1deg]">
                    URGENT_ACCESS_ONLY
                </div>
<h1 className="font-display-xl text-[80px] md:text-[120px] leading-[0.9] text-on-background uppercase mb-8">
                    FIND<br />
<span className="text-secondary">DOCTORS</span><br />
                    FAST.
                </h1>
<div className="bg-on-background p-1 inline-block mb-10 rotate-[0.5deg]">
<p className="bg-background border-2 border-on-background px-6 py-4 font-body-md text-body-md max-w-md">
                        No bullshit. Just the best healthcare professionals near you, vetted and ready for deployment. System uptime 99.99%.
                    </p>
</div>
<div className="flex flex-col sm:flex-row gap-6 items-start">
<button onClick={() => navigate('/search')} className="bg-secondary text-on-secondary px-10 py-5 border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-button-text text-[24px] flex items-center gap-4 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        START SEARCH <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
</button>
<a onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="cursor-pointer font-tag-label text-tag-label text-on-background border-b-2 border-on-background pt-4 hover:text-secondary transition-colors uppercase" href="#">
                        Doctor Login / Register
                    </a>
</div>
</div>
{/* Red Sticky Note */}
<div className="absolute bottom-20 right-20 rotate-[-8deg] bg-tertiary p-8 border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden md:block sticky-note">
<span className="material-symbols-outlined text-white text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
<div className="mt-4 font-tag-label text-white text-center">LIVE_STATS</div>
</div>
{/* Large RX Watermark */}
<div className="absolute bottom-0 right-0 font-display-xl text-[20vw] text-on-background opacity-5 pointer-events-none select-none">
                RX
            </div>
</section>
{/* Bento Grid Sections */}
<section className="bg-background py-stack-lg px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-8 border-t-4 border-on-background">
{/* Card 1: Emergency */}
<div id="emergency" className="md:col-span-2 bg-white border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
<div className="bg-tertiary border-b-4 border-on-background p-4 flex justify-between items-center">
<span className="font-tag-label text-white">CATEGORY_01: EMERGENCY</span>
<span className="material-symbols-outlined text-white">emergency</span>
</div>
<div className="p-8 flex-1">
<h3 className="font-headline-lg text-headline-lg mb-4 uppercase">CRITICAL CARE ACCESS</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-8">
                        Bypass the waiting rooms. Connect directly with trauma centers and urgent care specialists in your immediate vicinity.
                    </p>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container border-2 border-on-background p-4 neo-shadow">
<div className="font-tag-label text-[12px] opacity-60">AVG_WAIT</div>
<div className="font-button-text text-2xl text-tertiary">14_MINS</div>
</div>
<div className="bg-surface-container border-2 border-on-background p-4 neo-shadow">
<div className="font-tag-label text-[12px] opacity-60">AVAILABLE_STAFF</div>
<div className="font-button-text text-2xl text-secondary">422_OFFICERS</div>
</div>
</div>
</div>
</div>
{/* Card 2: Specialized */}
<div className="bg-primary-container border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[1.5deg] flex flex-col sticky-note-2">
<div className="bg-on-background border-b-4 border-on-background p-4 flex justify-between items-center">
<span className="font-tag-label text-on-primary">SPECIALIZED_UNIT</span>
<span className="material-symbols-outlined text-white">stethoscope</span>
</div>
<div className="p-8">
<h3 className="font-headline-lg text-[32px] leading-tight mb-4 uppercase">VERIFIED SPECIALISTS</h3>
<p className="font-body-sm text-body-sm mb-6">
                        Every doctor is verified through our 12-step validation protocol.
                    </p>
<ul className="space-y-3">
<li className="flex items-center gap-2 font-tag-label text-[12px]">
<span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            LICENSE_VALIDATED
                        </li>
<li className="flex items-center gap-2 font-tag-label text-[12px]">
<span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            PATIENT_RATING_4.8+
                        </li>
<li className="flex items-center gap-2 font-tag-label text-[12px]">
<span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            CRIMINAL_RECORD_CLEAR
                        </li>
</ul>
</div>
</div>
{/* Card 3: System Status */}
<div id="system-status" className="bg-on-background text-on-primary border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
<div className="mb-6 flex items-center gap-4">
<div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
<span className="font-tag-label tracking-widest uppercase">SYSTEM_STATION_04: ONLINE</span>
</div>
<h4 className="font-button-text text-2xl mb-2">NETWORK LATENCY: 12ms</h4>
<div className="w-full bg-surface-variant h-8 border-2 border-on-background mb-8 flex">
<div className="h-full bg-secondary w-3/4"></div>
<div className="h-full bg-tertiary w-1/4"></div>
</div>
<button className="w-full bg-white text-on-background border-4 border-on-background py-3 font-button-text hover:bg-primary-container transition-colors">
                    CHECK REGIONAL NODES
                </button>
</div>
{/* Card 4: Doctors Map Area */}
<div className="md:col-span-2 relative min-h-[300px] border-4 border-on-background bg-surface-container shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
<div className="absolute top-4 left-4 z-20 bg-on-background text-on-primary px-3 py-1 font-tag-label text-[12px] rotate-[-2deg]">
                    LIVE_LOCATION_TRACKER
                </div>
<img className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaaKTni_KAxkvC-TM22Vs5ajtyaNDVg5yijKGw6ZeUGUP9U8cPC2rQtz5U_Jg94XHQPwPTvTi8A8erwNW4WYBCeoL3Nx3l_mtBtvI-96OfMbkmXPJLx4Hemohrpxf8aYKJ8EUfyfTyQ1_9x-A4ASD9z8sKXtal-YxDG2nqnX_ahqT4IBJuH_uVTqLTc8nkaPH1un457gETyz1x2LMC4YM4L_gg7c0LJ7Qp7gerKISxmJrFGsbMg3wILsQrlwLR0gM7GhA8mSVCeQ6S" />
{/* Map UI Elements */}
<div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
<div className="bg-white border-2 border-on-background p-2 text-center rotate-[1deg]">
<div className="font-tag-label text-[10px]">ZONE_A</div>
<div className="font-button-text text-secondary">ACTIVE</div>
</div>
<div className="bg-white border-2 border-on-background p-2 text-center rotate-[-1.5deg]">
<div className="font-tag-label text-[10px]">ZONE_B</div>
<div className="font-button-text text-tertiary">STANDBY</div>
</div>
</div>
</div>
</div>
</section>
{/* Newsletter / CTA */}
<section className="bg-secondary-container py-stack-lg px-margin-desktop text-white border-y-4 border-on-background overflow-hidden relative">
<div className="absolute -top-10 -right-10 opacity-20 rotate-12">
<span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
</div>
<div className="max-w-4xl mx-auto relative z-10 text-center">
<h2 className="font-display-xl text-[48px] md:text-[64px] mb-8 leading-tight">JOIN THE MEDICAL NETWORK.</h2>
<div className="flex flex-col md:flex-row gap-4 justify-center items-center">
<input className="w-full md:w-96 bg-white border-4 border-on-background px-6 py-4 text-on-background font-tag-label focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="YOUR_EMAIL@DOCFINDER.EXE" type="email" />
<button className="bg-primary-container text-on-background border-4 border-on-background px-8 py-4 font-button-text text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
                        SUBSCRIBE_TO_ALERTS
                    </button>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-on-background text-on-primary w-full py-stack-md px-margin-desktop flex flex-col md:flex-row justify-between items-center border-t-4 border-on-background">
<div className="flex flex-col gap-2 mb-6 md:mb-0">
<div className="font-button-text text-secondary-fixed text-2xl tracking-tighter">DOC_FINDER_MEDICAL_GROUP</div>
<p className="font-tag-label text-tag-label uppercase tracking-widest opacity-80">
                ©2024 DOC_FINDER_MEDICAL_GROUP // NO_BS_HEALTHCARE
            </p>
</div>
<div className="flex flex-wrap gap-6 justify-center">
<a className="font-tag-label text-tag-label uppercase text-on-primary opacity-80 hover:opacity-100 hover:text-secondary-fixed hover:underline transition-all" href="#">TERMS_OF_SERVICE</a>
<a className="font-tag-label text-tag-label uppercase text-on-primary opacity-80 hover:opacity-100 hover:text-secondary-fixed hover:underline transition-all" href="#">PRIVACY_PROTOCOL</a>
<a className="font-tag-label text-tag-label uppercase text-on-primary opacity-80 hover:opacity-100 hover:text-secondary-fixed hover:underline transition-all" href="#">SYSTEM_RESOURCES</a>
</div>
</footer>
{/* Back to Top FAB */}
<button className="fixed bottom-10 right-10 bg-primary-container text-on-background border-4 border-on-background p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all z-40 hidden" id="fab-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
<span className="material-symbols-outlined text-[32px]">arrow_upward</span>
</button>

    </>
  );
}
