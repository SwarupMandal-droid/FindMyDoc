import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function DoctorApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      aboutYou: '',
      specialization: '',
      qualification: '',
      clinicName: '',
      clinicAddress: '',
      city: '',
      zipCode: '',
      experienceYears: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      const names = formData.fullName.trim().split(' ');
      const firstName = names[0];
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
      const username = formData.email.split('@')[0] + Math.floor(Math.random() * 1000);
      const fullAddress = `${formData.clinicAddress}, ${formData.zipCode}`;

      try {
          await api.post('/api/auth/register/doctor/', {
              email: formData.email,
              username: username,
              password: formData.password,
              first_name: firstName,
              last_name: lastName,
              phone_number: formData.phoneNumber,
              about_you: formData.aboutYou,
              specialization: formData.specialization,
              qualification: formData.qualification,
              clinic_name: formData.clinicName,
              clinic_address: fullAddress,
              city: formData.city,
              experience_years: parseInt(formData.experienceYears) || 0,
          });
          // Redirect to login after successful application
          navigate('/login');
      } catch (err) {
          setError(err.response?.data?.email?.[0] || 'Application failed. Please check the form.');
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {

    const inputs = document.querySelectorAll('input, textarea');
    const handleFocus = (e) => {
        if(e.target.parentElement) {
            e.target.parentElement.classList.add('scale-[1.01]');
        }
        e.target.style.transform = 'translate(-2px, -2px)';
        e.target.style.boxShadow = '4px 4px 0px 0px #0035c6';
    };
    const handleBlur = (e) => {
        if(e.target.parentElement) {
            e.target.parentElement.classList.remove('scale-[1.01]');
        }
        e.target.style.transform = 'none';
        e.target.style.boxShadow = 'none';
    };
    inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
    });
    return () => {
        inputs.forEach(input => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        });
    };

  }, []);

  return (
    <>

<header className="bg-background border-b-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center w-full px-margin-desktop py-4 sticky top-0 z-50">
<div className="flex items-center gap-4">
<div className="font-display-xl text-display-xl tracking-tighter text-on-background bg-primary-container px-2 border-4 border-on-background rotate-[-1.5deg]">
                DOC_FINDER.EXE
            </div>
</div>
<nav className="hidden md:flex gap-gutter items-center">
<a className="text-on-surface-variant font-button-text hover:text-on-background transition-all" href="#">Find Doctors</a>
<a className="text-on-surface-variant font-button-text hover:text-on-background transition-all" href="#">System Status</a>
<a className="text-on-surface-variant font-button-text hover:text-on-background transition-all" href="#">Emergency</a>
</nav>
<div className="flex gap-stack-sm">
<button onClick={() => navigate('/apply-doctor')} className="bg-secondary text-on-secondary px-6 py-2 border-4 border-on-background font-button-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                APPLY_AS_DOCTOR
            </button>
<button onClick={() => navigate('/login')} className="bg-primary-container text-on-primary-container px-6 py-2 border-4 border-on-background font-button-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                LOGIN
            </button>
</div>
</header>
<main className="max-w-6xl mx-auto py-stack-lg px-4 md:px-margin-desktop">
{/* Application Shell Container */}
<div className="relative bg-white ink-trap-border neo-brutal-shadow p-8 mt-12">
{/* Floating Header Tag */}
<div className="absolute -top-10 left-8 bg-tertiary text-on-tertiary px-6 py-3 ink-trap-border rotate-[-2deg] z-10">
<h1 className="font-headline-lg text-headline-lg uppercase tracking-tight">DOCTOR_APPLICATION</h1>
</div>
{/* Main Form Content */}
<form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-stack-lg" onSubmit={handleApply}>
{/* Error message span full width */}
{error && <div className="md:col-span-2 bg-error text-on-error p-4 border-4 border-on-background font-bold">{error}</div>}

{/* Left Column: Personal Info */}
<div className="space-y-stack-md">
<div className="inline-block bg-primary-container text-on-primary-fixed-variant px-3 py-1 ink-trap-border-sm mb-4 font-tag-label">
                        PERSONAL INFO
                    </div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Full Name</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="fullName" placeholder="JOHN DOE" type="text" value={formData.fullName} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Email</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none bg-secondary-fixed/20" name="email" placeholder="captainmatchos@gmail.com" type="email" value={formData.email} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Password</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none bg-secondary-fixed/20" name="password" placeholder="••••••••••••" type="password" value={formData.password} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Phone Number</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="phoneNumber" placeholder="+1 (555) 000-0000" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">About You</label>
<textarea className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none resize-none" name="aboutYou" placeholder="Brief professional biography..." rows="4" value={formData.aboutYou} onChange={handleChange}></textarea>
</div>
</div>
{/* Right Column: Professional Info */}
<div className="space-y-stack-md relative">
<div className="flex justify-between items-start">
<div className="inline-block bg-primary-container text-on-primary-fixed-variant px-3 py-1 ink-trap-border-sm mb-4 font-tag-label">
                            PROFESSIONAL INFO
                        </div>
{/* Caduceus Symbol */}
<div className="text-6xl text-primary-fixed-dim/80 rotate-12 absolute -right-4 -top-8 pointer-events-none opacity-40">
<span className="material-symbols-outlined !text-[80px]">medical_services</span>
</div>
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Specialization</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="specialization" placeholder="e.g., Cardiologist" type="text" value={formData.specialization} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Years of Experience</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="experienceYears" placeholder="10" type="number" min="0" value={formData.experienceYears} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Qualification</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="qualification" placeholder="MEDS_MD" type="text" value={formData.qualification} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Clinic Name</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="clinicName" placeholder="METRO_GENERAL_HOSPITAL" type="text" value={formData.clinicName} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Clinic Address</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="clinicAddress" placeholder="123 EMERGENCY LANE" type="text" value={formData.clinicAddress} onChange={handleChange} required />
</div>
<div className="grid grid-cols-2 gap-gutter">
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">City</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="city" placeholder="NEW_YORK" type="text" value={formData.city} onChange={handleChange} required />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">ZIP_CODE</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" name="zipCode" placeholder="10001" type="text" value={formData.zipCode} onChange={handleChange} />
</div>
</div>
</div>
{/* Footer Action */}
<div className="md:col-span-2 mt-8 flex flex-col items-center gap-stack-md">
<button disabled={loading} className="w-full bg-secondary text-on-secondary px-8 py-5 border-4 border-on-background font-button-text text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                        {loading ? 'SUBMITTING...' : 'SUBMIT APPLICATION'} <span className="material-symbols-outlined text-3xl">trending_flat</span>
</button>
<a onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="cursor-pointer font-tag-label text-on-surface-variant hover:text-on-background uppercase tracking-widest flex items-center gap-2 group" href="#">
<span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        CANCEL AND RETURN TO LOGIN
                    </a>
</div>
</form>
{/* Decorative Elements */}
<div className="absolute -bottom-8 -right-8 w-24 h-24 hidden md:block">
<img alt="Decorative medical icon" className="opacity-10 scale-150 rotate-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAdPpSvHsMo1lixBjjXuWwA-BlsqodfxBjALSMGaJD3Yyx-5t7gHZX-xWwqIadMF_Ug4yPzhceXKz8yaO2ZFKk56gytYgceYBGtjS6ls5fgHSeIsB4liWpuJ-UXT8sN4f9ga-ZGgHe2foBb9_JZoT-ZH20qcJ9F-z0piTexukPaHa9OyW_pg_-KO5p6hhCeLLL59dvsXWnww26leyONL2lFc5_kJ-ya0gxdeD0pU8UlsjnkyRCgf3eImQN78Zy9th7wH2ENOAYgpql" />
</div>
{/* Band-aid decorative element */}
<div className="absolute -top-6 -right-10 w-32 h-12 bg-[#ffc1a1] ink-trap-border-sm rotate-45 hidden lg:flex items-center justify-center neo-brutal-shadow-sm pointer-events-none">
<div className="grid grid-cols-4 gap-1">
<div className="w-1 h-1 bg-black/20 rounded-full"></div>
<div className="w-1 h-1 bg-black/20 rounded-full"></div>
<div className="w-1 h-1 bg-black/20 rounded-full"></div>
<div className="w-1 h-1 bg-black/20 rounded-full"></div>
</div>
</div>
</div>
</main>
{/* Footer */}
<footer className="w-full py-stack-md px-margin-desktop flex flex-col md:flex-row justify-between items-center bg-on-background text-on-primary border-t-4 border-on-background mt-stack-lg gap-gutter">
<div className="font-button-text text-button-text text-secondary-fixed">
            DOC_FINDER_MEDICAL_GROUP // NO_BS_HEALTHCARE
        </div>
<div className="flex gap-gutter">
<a className="font-tag-label text-tag-label uppercase tracking-widest opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-colors underline" href="#">TERMS_OF_SERVICE</a>
<a className="font-tag-label text-tag-label uppercase tracking-widest opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-colors underline" href="#">PRIVACY_PROTOCOL</a>
<a className="font-tag-label text-tag-label uppercase tracking-widest opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-colors underline" href="#">SYSTEM_RESOURCES</a>
</div>
<div className="font-tag-label text-tag-label uppercase tracking-widest opacity-60">
            ©2024 DOC_FINDER.EXE
        </div>
</footer>

    </>
  );
}
