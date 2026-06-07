import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Split full name for Django's user model
    const names = fullName.trim().split(' ');
    const firstName = names[0];
    const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
    // Django requires a username, we can auto-generate one from email
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    try {
        await api.post('/api/auth/register/patient/', {
            email: email,
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName
        });
        // On success, redirect to login
        navigate('/login');
    } catch (err) {
        setError(err.response?.data?.email?.[0] || err.response?.data?.username?.[0] || 'Registration failed. Please try again.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {

    const inputs = document.querySelectorAll('input');
    const handleFocus = (e) => {
        if(e.target.parentElement) e.target.parentElement.classList.add('rotate-z-1');
    };
    const handleBlur = (e) => {
        if(e.target.parentElement) e.target.parentElement.classList.remove('rotate-z-1');
    };
    inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
    });

    const card = document.querySelector('.register-card');
    const handleEnter = () => {
        if(card) card.style.transition = 'transform 0.1s ease';
    };
    if (card) card.addEventListener('mouseenter', handleEnter);
    
    const handleMouseMove = (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        const bgBandAid = document.querySelector('.fixed.bottom-10.right-10');
        if (bgBandAid) bgBandAid.style.transform = `translate(${x}px, ${y}px) rotate(12deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        inputs.forEach(input => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        });
        if (card) card.removeEventListener('mouseenter', handleEnter);
        window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return (
    <>

<main className="min-h-screen relative flex items-center justify-center py-stack-lg px-margin-mobile">
{/* Background Decorative Elements */}
<div className="fixed inset-0 -z-10 flex">
<div className="w-1/2 bg-primary-container h-full"></div>
<div className="w-1/2 bg-background h-full border-l-4 border-on-background"></div>
</div>
<div className="fixed bottom-0 w-full h-[307px] bg-tertiary -z-10 border-t-4 border-on-background skew-y-[-2deg] origin-bottom-right"></div>
{/* Animated Band-aids in background */}
<div className="fixed bottom-10 right-10 flex flex-col items-center gap-2 rotate-12 opacity-90 z-0">
<div className="w-24 h-8 bg-[#E6B492] neo-brutalist-border rounded-full flex items-center justify-center overflow-hidden">
<div className="w-6 h-full bg-[#D49E7A] opacity-50 flex items-center justify-center">
<div className="grid grid-cols-2 gap-1">
<div className="w-1 h-1 bg-black opacity-20 rounded-full"></div>
<div className="w-1 h-1 bg-black opacity-20 rounded-full"></div>
</div>
</div>
</div>
<div className="w-24 h-8 bg-[#E6B492] neo-brutalist-border rounded-full flex items-center justify-center overflow-hidden -mt-4 -ml-6 -rotate-90">
<div className="w-6 h-full bg-[#D49E7A] opacity-50 flex items-center justify-center">
<div className="grid grid-cols-2 gap-1">
<div className="w-1 h-1 bg-black opacity-20 rounded-full"></div>
<div className="w-1 h-1 bg-black opacity-20 rounded-full"></div>
</div>
</div>
</div>
</div>
{/* Registration Card Container */}
<div className="relative w-full max-w-lg z-10">
{/* Floating "NEW_USER" Tag */}
<div className="absolute -top-6 left-8 bg-on-background px-4 py-1 rotate-z-neg-1-5 z-20">
<span className="font-tag-label text-tag-label text-white uppercase tracking-widest">NEW_USER</span>
</div>
{/* The Card */}
<section className="register-card bg-white neo-brutalist-border neo-brutalist-shadow p-8 md:p-12 relative overflow-visible">
{/* Band-aid on top right corner of card */}
<div className="absolute -top-4 -right-6 rotate-12 transition-transform hover:scale-110 cursor-pointer">
<div className="w-28 h-10 bg-[#E6B492] neo-brutalist-border rounded-full flex items-center justify-center overflow-hidden">
<div className="w-8 h-full bg-[#D49E7A] border-x-2 border-on-background opacity-50 flex items-center justify-center">
<div className="grid grid-cols-2 gap-1">
<div className="w-1.5 h-1.5 bg-black opacity-20 rounded-full"></div>
<div className="w-1.5 h-1.5 bg-black opacity-20 rounded-full"></div>
<div className="w-1.5 h-1.5 bg-black opacity-20 rounded-full"></div>
<div className="w-1.5 h-1.5 bg-black opacity-20 rounded-full"></div>
</div>
</div>
</div>
</div>
<form className="space-y-6" onSubmit={handleRegister}>
{error && <div className="bg-error text-on-error p-3 border-4 border-on-background font-body-md font-bold">{error}</div>}
{/* Field: Full Name */}
<div className="space-y-1">
<label className="font-tag-label text-tag-label text-on-background block uppercase" htmlFor="full_name">FULL_NAME</label>
<input className="w-full neo-brutalist-border p-4 font-body-md text-on-background focus:ring-0 focus:border-secondary outline-none transition-all placeholder:text-on-surface-variant/30" id="full_name" placeholder="JOHN DOE" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
</div>
{/* Field: Email Address */}
<div className="space-y-1">
<label className="font-tag-label text-tag-label text-on-background block uppercase" htmlFor="email_address">EMAIL_ADDRESS</label>
<input className="w-full neo-brutalist-border p-4 font-body-md text-on-background focus:ring-0 focus:border-secondary outline-none transition-all bg-secondary-fixed/10" id="email_address" placeholder="captainmatchos@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
</div>
{/* Field: Password */}
<div className="space-y-1">
<label className="font-tag-label text-tag-label text-on-background block uppercase" htmlFor="password">PASSWORD</label>
<input className="w-full neo-brutalist-border p-4 font-body-md text-on-background focus:ring-0 focus:border-secondary outline-none transition-all bg-secondary-fixed/10" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
</div>
{/* Actions */}
<div className="pt-4 space-y-4">
{/* Primary Blue Button */}
<button className="w-full bg-secondary text-white neo-brutalist-border neo-brutalist-shadow-sm neo-brutalist-shadow-active neo-brutalist-shadow-hover p-4 flex items-center justify-between group transition-all disabled:opacity-50" type="submit" disabled={loading}>
<span className="font-button-text text-button-text uppercase tracking-widest">{loading ? 'CREATING...' : 'CREATE ACCOUNT'}</span>
<span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
</button>
{/* Google Auth Button */}
<button className="w-full bg-white text-on-background neo-brutalist-border neo-brutalist-shadow-sm neo-brutalist-shadow-active neo-brutalist-shadow-hover p-4 flex items-center justify-center gap-3 transition-all" type="button">
<img alt="Google Logo" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwzdBs77ACiWtItChjPnwo19-NjzMK1j-h6vMBj2KOiWbl39lIbQdeg__sBegRq6PuYtPjfM0IlutpUBP7ARctXY6Iv4uTonp5F3aA4H4NOtCWg9yRSON194Bu3MzaAmlg2vxYCarWNZZ5DS8NJcp8uJxujJbdz4x2wUSZDXKu5-Zr4_VDyaWIaVrsvY8FVO-RvbT0SOj7uSRu3zyOUB8jVPdVkrmnpz000gBniT6-RgSwC_IdJpW9G8sbZovn0sMNlxcBnhMfr2vb" />
<span className="font-tag-label text-tag-label uppercase">CONTINUE WITH GOOGLE</span>
</button>
</div>
</form>
{/* Footer Links */}
<div className="mt-12 flex flex-col gap-4">
<a onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="cursor-pointer group flex items-center gap-2 font-tag-label text-tag-label text-on-background hover:text-secondary transition-colors" href="#">
<span className="material-symbols-outlined text-sm">arrow_right_alt</span>
<span>ALREADY HAVE AN ACCOUNT? LOGIN</span>
</a>
<a onClick={(e) => { e.preventDefault(); navigate('/apply-doctor'); }} className="cursor-pointer group flex items-center gap-2 font-tag-label text-tag-label text-on-background hover:text-tertiary transition-colors" href="#">
<span className="material-symbols-outlined text-sm">arrow_right_alt</span>
<span>I AM A DOCTOR</span>
</a>
</div>
</section>
{/* Decorative Illustrations around card */}
<div className="absolute -bottom-16 -left-16 w-32 h-32 hidden md:block">
<img alt="Emergency Icon" className="w-full h-full object-contain filter grayscale invert brightness-0 opacity-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIh6BzQuBpc58TvKHu4RUjK8arVLpoi6wxmBS1KePgf5DRFD3D5LLMhH2IF32QmejcTu7df6XY1AKkByufQY3NqvmwOzlabw9o5QYgPFrmOJhqA1i4ZNrkZC92g8TIfuJ8YOP8Nv5Ey3ZlzG0ov_90AwD93pL06FAahGsqd0EuWE85TuaBtQKdY8AiX7unUaWUP_ErgvP2ReLSaz1yY69F6onaePCVs_YnxeYeCzdm5901TkfhaE_KORU8isEMFXxKPaSSHnY-MfMi" />
</div>
</div>
{/* System Watermark */}
<div className="fixed bottom-4 left-4 rotate-z-neg-1 opacity-50 select-none pointer-events-none">
<p className="font-tag-label text-[10px] text-on-background tracking-[0.4em] uppercase">DOC_FINDER_SYS_REV_4.0.1</p>
</div>
</main>
<footer className="w-full py-stack-md px-margin-desktop flex flex-col md:flex-row justify-between items-center bg-on-background text-on-primary border-t-4 border-on-background">
<div className="font-button-text text-button-text text-secondary-fixed rotate-z-neg-1">DOC_FINDER.EXE</div>
<div className="flex flex-wrap gap-gutter mt-4 md:mt-0">
<a className="font-tag-label text-[12px] opacity-80 hover:opacity-100 hover:underline transition-all" href="#">TERMS_OF_SERVICE</a>
<a className="font-tag-label text-[12px] opacity-80 hover:opacity-100 hover:underline transition-all" href="#">PRIVACY_PROTOCOL</a>
<a className="font-tag-label text-[12px] opacity-80 hover:opacity-100 hover:underline transition-all" href="#">SYSTEM_RESOURCES</a>
</div>
<div className="font-tag-label text-[10px] mt-4 md:mt-0 opacity-60">©2024 DOC_FINDER_MEDICAL_GROUP // NO_BS_HEALTHCARE</div>
</footer>

    </>
  );
}
