import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await api.post('/api/auth/login/', { email, password });
        // Save tokens
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        // Save user info (if provided by custom serializer)
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/search');
        } else {
            navigate('/search');
        }
    } catch (err) {
        setError('Invalid credentials or network error.');
        console.error(err);
    }
  };

  useEffect(() => {

    const inputs = document.querySelectorAll('input');
    const handleFocus = (e) => {
        if(e.target.parentElement) e.target.parentElement.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '6px 6px 0px 0px #0035c6';
    };
    const handleBlur = (e) => {
        if(e.target.parentElement) e.target.parentElement.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
    };
    inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
    });

    const handleMouseMove = (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        const decor = document.querySelector('.stethoscope-img');
        if (decor) {
            decor.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-1.5deg)`;
        }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        inputs.forEach(input => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        });
        window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return (
    <>

<main className="login-canvas flex items-center justify-center p-6 relative overflow-hidden">
{/* Abstract Medical Decoration */}
<div className="absolute top-10 left-10 hidden md:block comic-angle">
<div className="bg-secondary text-on-secondary font-button-text text-button-text px-6 py-2 border-4 border-on-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                URGENT_ACCESS
            </div>
</div>
{/* Main Login Card */}
<div className="relative z-10 w-full max-w-[480px]">
{/* Tag Label stuck on top */}
<div className="absolute -top-5 left-8 z-20 bg-secondary text-on-secondary px-4 py-2 border-4 border-on-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
<span className="font-tag-label text-tag-label">SYSTEM_LOGIN</span>
</div>
{/* Login Container */}
<div className="bg-white neo-brutalism-border p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
<form className="space-y-6" onSubmit={handleLogin}>
{error && <div className="bg-error text-on-error p-3 border-4 border-on-background font-body-md font-bold">{error}</div>}
{/* Email Field */}
<div className="space-y-2">
<label className="font-tag-label text-tag-label uppercase text-on-background block" htmlFor="email">EMAIL_ADDRESS</label>
<input className="w-full border-4 border-on-background p-4 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none text-on-background" id="email" placeholder="swarup@docfinder.com" required="" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</div>
{/* Password Field */}
<div className="space-y-2">
<label className="font-tag-label text-tag-label uppercase text-on-background block" htmlFor="password">PASSWORD</label>
<input className="w-full border-4 border-on-background p-4 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none text-on-background" id="password" required="" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
</div>
{/* Primary Action: Enter System */}
<button className="w-full bg-primary-container text-on-background font-button-text text-button-text py-5 border-4 border-on-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-3 group" type="submit">
                        ENTER SYSTEM
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</button>
{/* Google Divider (Visual Only) */}
<div className="flex items-center gap-4 py-2">
<div className="h-1 flex-1 bg-on-background"></div>
<span className="font-tag-label text-tag-label opacity-50">OR</span>
<div className="h-1 flex-1 bg-on-background"></div>
</div>
{/* Secondary Action: Google Login */}
<button className="w-full bg-white text-on-background font-tag-label text-tag-label py-4 border-4 border-on-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-surface-container transition-all flex items-center justify-center gap-3" type="button">
<img alt="G" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVWl_iqUPjJSO2V9fm8LB3tSVXntFoHv8LOxc8wQzt9X5d_JfdmnwgPPMB_OtjB8RNR2MHTATbve_2MiFfS943IXTbSHBg6fi0fr_OrmTKg9K0Y6I-lrEf7QPxGdS-cq4_LYqpN5HkRcgyDrGqp2wiFK5uGULov48087jJtgrLQ_vroccrJtPfR_xhsaTDTIhdcjYq0F2aaq-hWTzjmknRbUUXRwIT4tJk15Y7tfS4OhoZm6W0qNBcQVFkeQQqpqszSCb1WteO0nsz" />
                        CONTINUE WITH GOOGLE
                    </button>
</form>
{/* Auxiliary Links */}
<div className="mt-10 space-y-3 font-tag-label text-tag-label">
<a onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="cursor-pointer flex items-center gap-2 hover:text-secondary transition-colors group" href="#">
<span className="group-hover:translate-x-1 transition-transform">→</span> 
                        NEW USER? REGISTER HERE
                    </a>
<a onClick={(e) => { e.preventDefault(); navigate('/apply-doctor'); }} className="cursor-pointer flex items-center gap-2 hover:text-secondary transition-colors group" href="#">
<span className="group-hover:translate-x-1 transition-transform">→</span> 
                        APPLY AS DOCTOR
                    </a>
</div>
</div>
</div>
{/* Stethoscope Illustration */}
<div className="absolute bottom-[-20px] right-[-20px] md:bottom-10 md:right-20 pointer-events-none opacity-90">
<img className="stethoscope-img w-64 h-64 comic-angle drop-shadow-[8px_8px_0px_rgba(0,0,0,0.2)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcw1OPIThf_xWhn1I9MlXgz-GFUFsyvtwgc9LtiwSf34n7g91kqU6nydl8hrW8YWQV9jIupB3U6daNeYRPSrteMDV8L6AWxeVnhWn5qFQo9hN90iptstseX7FqAhZO0wACU0gvt0mRsh4NjipmXnPspV9zjy7KWK1Uo59r1HiD8hi_U1lLz0vOEGKijtHZ7lJRSrYvb94yfwziEYb4EdScB4PNAoBedVfg0lIkh4n6GPK7SHrWWGd920ygejR6MxJGlQ_sAAhsA3_r" />
</div>
{/* Band-aid sticker decoration */}
<div className="absolute bottom-20 left-10 rotate-12 opacity-80 hidden lg:block">
<div className="w-32 h-12 bg-[#ffc1a1] border-4 border-on-background relative flex items-center justify-center">
<div className="grid grid-cols-3 gap-1">
<div className="w-1 h-1 bg-on-background/20 rounded-full"></div>
<div className="w-1 h-1 bg-on-background/20 rounded-full"></div>
<div className="w-1 h-1 bg-on-background/20 rounded-full"></div>
</div>
<div className="absolute top-0 bottom-0 left-1/4 right-1/4 border-x-2 border-on-background/10"></div>
</div>
</div>
</main>
{/* Footer from JSON Mapping */}
<footer className="w-full py-stack-md px-margin-desktop flex flex-col md:flex-row justify-between items-center bg-on-background text-on-primary border-t-4 border-on-background">
<div className="font-button-text text-button-text text-secondary-fixed mb-4 md:mb-0">
            DOC_FINDER.EXE
        </div>
<div className="font-tag-label text-tag-label uppercase tracking-widest text-center md:text-left mb-4 md:mb-0">
            ©2024 DOC_FINDER_MEDICAL_GROUP // NO_BS_HEALTHCARE
        </div>
<div className="flex gap-6 font-tag-label text-tag-label uppercase">
<a className="text-on-primary opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">TERMS_OF_SERVICE</a>
<a className="text-on-primary opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">PRIVACY_PROTOCOL</a>
</div>
</footer>

    </>
  );
}
