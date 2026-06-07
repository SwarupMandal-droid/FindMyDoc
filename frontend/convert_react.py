import re

def html_to_jsx(html_body):
    jsx = html_body
    jsx = jsx.replace('class=', 'className=')
    jsx = jsx.replace('for=', 'htmlFor=')
    jsx = jsx.replace('<!--', '{/*')
    jsx = jsx.replace('-->', '*/}')
    jsx = re.sub(r'<input([^>]*?)>', r'<input\1 />', jsx)
    jsx = re.sub(r'<img([^>]*?)>', r'<img\1 />', jsx)
    jsx = re.sub(r'<br>', r'<br />', jsx)
    jsx = jsx.replace('style="font-variation-settings: \'FILL\' 1;"', 'style={{ fontVariationSettings: "\'FILL\' 1" }}')
    return jsx

apply_doctor_html = """
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
<form action="#" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-stack-lg" method="POST">
{/* Left Column: Personal Info */}
<div className="space-y-stack-md">
<div className="inline-block bg-primary-container text-on-primary-fixed-variant px-3 py-1 ink-trap-border-sm mb-4 font-tag-label">
                        PERSONAL INFO
                    </div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Full Name</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="JOHN DOE" type="text" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Email</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none bg-secondary-fixed/20" placeholder="captainmatchos@gmail.com" type="email" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Password</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none bg-secondary-fixed/20" placeholder="••••••••••••" type="password" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Phone Number</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="+1 (555) 000-0000" type="tel" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">About You</label>
<textarea className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none resize-none" placeholder="Brief professional biography..." rows="4"></textarea>
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
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="e.g., Cardiologist" type="text" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Qualification</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="MEDS_MD" type="text" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Clinic Name</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="METRO_GENERAL_HOSPITAL" type="text" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">Clinic Address</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="123 EMERGENCY LANE" type="text" />
</div>
<div className="grid grid-cols-2 gap-gutter">
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">City</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="NEW_YORK" type="text" />
</div>
<div className="space-y-stack-sm">
<label className="block font-tag-label text-on-background uppercase">ZIP_CODE</label>
<input className="w-full ink-trap-border-sm p-3 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none" placeholder="10001" type="text" />
</div>
</div>
{/* Upload Sections */}
<div className="grid grid-cols-1 gap-gutter mt-8">
<div className="group relative ink-trap-border-sm border-dashed p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
<span className="material-symbols-outlined text-4xl mb-2 group-hover:scale-110 transition-transform">cloud_upload</span>
<span className="font-tag-label uppercase text-center">UPLOAD PROFILE IMAGE</span>
<input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
</div>
<div className="group relative ink-trap-border-sm border-dashed p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
<span className="material-symbols-outlined text-4xl mb-2 group-hover:scale-110 transition-transform">description</span>
<span className="font-tag-label uppercase text-center">UPLOAD REGISTRATION CERTIFICATE</span>
<input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
</div>
</div>
</div>
{/* Footer Action */}
<div className="md:col-span-2 mt-8 flex flex-col items-center gap-stack-md">
<button className="w-full bg-secondary text-on-secondary px-8 py-5 border-4 border-on-background font-button-text text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-4" type="submit">
                        SUBMIT APPLICATION <span className="material-symbols-outlined text-3xl">trending_flat</span>
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
"""

login_html = """
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
<form className="space-y-6">
{/* Email Field */}
<div className="space-y-2">
<label className="font-tag-label text-tag-label uppercase text-on-background block" htmlFor="email">EMAIL_ADDRESS</label>
<input className="w-full border-4 border-on-background p-4 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none text-on-background" id="email" placeholder="swarup@docfinder.com" required="" type="email" />
</div>
{/* Password Field */}
<div className="space-y-2">
<label className="font-tag-label text-tag-label uppercase text-on-background block" htmlFor="password">PASSWORD</label>
<input className="w-full border-4 border-on-background p-4 font-body-md focus:ring-0 focus:border-secondary transition-all outline-none text-on-background" id="password" required="" type="password" defaultValue="••••••••••••••••" />
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
"""

register_html = """
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
<form className="space-y-6">
{/* Field: Full Name */}
<div className="space-y-1">
<label className="font-tag-label text-tag-label text-on-background block uppercase" htmlFor="full_name">FULL_NAME</label>
<input className="w-full neo-brutalist-border p-4 font-body-md text-on-background focus:ring-0 focus:border-secondary outline-none transition-all placeholder:text-on-surface-variant/30" id="full_name" placeholder="JOHN DOE" type="text" />
</div>
{/* Field: Email Address */}
<div className="space-y-1">
<label className="font-tag-label text-tag-label text-on-background block uppercase" htmlFor="email_address">EMAIL_ADDRESS</label>
<input className="w-full neo-brutalist-border p-4 font-body-md text-on-background focus:ring-0 focus:border-secondary outline-none transition-all bg-secondary-fixed/10" id="email_address" placeholder="captainmatchos@gmail.com" type="email" />
</div>
{/* Field: Password */}
<div className="space-y-1">
<label className="font-tag-label text-tag-label text-on-background block uppercase" htmlFor="password">PASSWORD</label>
<input className="w-full neo-brutalist-border p-4 font-body-md text-on-background focus:ring-0 focus:border-secondary outline-none transition-all bg-secondary-fixed/10" id="password" type="password" defaultValue="..............." />
</div>
{/* Actions */}
<div className="pt-4 space-y-4">
{/* Primary Blue Button */}
<button className="w-full bg-secondary text-white neo-brutalist-border neo-brutalist-shadow-sm neo-brutalist-shadow-active neo-brutalist-shadow-hover p-4 flex items-center justify-between group transition-all" type="submit">
<span className="font-button-text text-button-text uppercase tracking-widest">CREATE ACCOUNT</span>
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
"""

landing_page_html = """
<header className="bg-background w-full px-margin-desktop py-4 flex justify-between items-center border-b-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 sticky top-0">
<div className="flex items-center gap-6">
<div className="font-display-xl text-[24px] leading-tight tracking-tighter text-on-background bg-primary-container px-3 py-1 border-4 border-on-background rotate-[-1.5deg]">
                DOC_FINDER.EXE
            </div>
<nav className="hidden md:flex gap-6">
<a className="text-on-background border-b-4 border-secondary font-button-text text-button-text" href="#">Find Doctors</a>
<a className="text-on-surface-variant font-button-text text-button-text hover:text-on-background transition-all" href="#">System Status</a>
<a className="text-on-surface-variant font-button-text text-button-text hover:text-on-background transition-all" href="#">Emergency</a>
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
<button onClick={() => navigate('/login')} className="bg-secondary text-on-secondary px-10 py-5 border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-button-text text-[24px] flex items-center gap-4 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
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
<div className="md:col-span-2 bg-white border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
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
<div className="bg-on-background text-on-primary border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
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
"""

def create_component(name, html_body, js_logic):
    return f'''import React, {{ useEffect }} from 'react';
import {{ useNavigate }} from 'react-router-dom';

export default function {name}() {{
  const navigate = useNavigate();

  useEffect(() => {{
{js_logic}
  }}, []);

  return (
    <>
{html_body}
    </>
  );
}}
'''

doctor_js = """
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
"""

login_js = """
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
"""

register_js = """
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
"""

landing_js = """
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
"""

index_html = """<!doctype html>
<html lang="en" class="light">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOC_FINDER.EXE</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-primary": "#ffffff",
              "on-secondary": "#ffffff",
              "surface-container-highest": "#e5e2e1",
              "surface-container-low": "#f6f3f2",
              "error": "#ba1a1a",
              "secondary-container": "#0448ff",
              "primary": "#5c6300",
              "on-primary-fixed": "#1b1d00",
              "secondary": "#0035c6",
              "surface-container": "#f0edec",
              "on-secondary-container": "#d6daff",
              "tertiary-fixed": "#ffdad9",
              "surface-dim": "#dcd9d9",
              "outline": "#787961",
              "on-background": "#1c1b1b",
              "on-secondary-fixed": "#001257",
              "on-error": "#ffffff",
              "surface-container-high": "#ebe7e7",
              "on-tertiary-fixed": "#410008",
              "error-container": "#ffdad6",
              "inverse-surface": "#313030",
              "surface-container-lowest": "#ffffff",
              "on-primary-fixed-variant": "#454b00",
              "on-primary-container": "#6c7500",
              "primary-container": "#efff43",
              "on-tertiary": "#ffffff",
              "surface": "#fcf9f8",
              "outline-variant": "#c8c8ad",
              "inverse-primary": "#c2d000",
              "surface-bright": "#fcf9f8",
              "inverse-on-surface": "#f3f0ef",
              "tertiary": "#bf002c",
              "on-surface-variant": "#474834",
              "on-surface": "#1c1b1b",
              "primary-fixed-dim": "#c2d000",
              "secondary-fixed": "#dde1ff",
              "tertiary-container": "#fff1f0",
              "surface-variant": "#e5e2e1",
              "primary-fixed": "#deed30",
              "on-secondary-fixed-variant": "#0033c0",
              "background": "#fcf9f8",
              "on-tertiary-container": "#df0035",
              "on-error-container": "#93000a",
              "surface-tint": "#5c6300",
              "secondary-fixed-dim": "#b9c3ff",
              "tertiary-fixed-dim": "#ffb3b2",
              "on-tertiary-fixed-variant": "#92001f"
            },
            borderRadius: {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
            },
            spacing: {
              "margin-desktop": "40px",
              "stack-sm": "8px",
              "unit": "4px",
              "margin-mobile": "20px",
              "gutter": "16px",
              "stack-lg": "48px",
              "stack-md": "24px"
            },
            fontFamily: {
              "button-text": ["Anton"],
              "body-md": ["Hanken Grotesk"],
              "body-sm": ["Hanken Grotesk"],
              "headline-lg-mobile": ["Anton"],
              "headline-lg": ["Anton"],
              "tag-label": ["JetBrains Mono"],
              "display-xl": ["Anton"]
            },
            fontSize: {
              "button-text": ["18px", {"lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "400"}],
              "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "500"}],
              "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
              "headline-lg-mobile": ["32px", {"lineHeight": "36px", "fontWeight": "400"}],
              "headline-lg": ["40px", {"lineHeight": "44px", "fontWeight": "400"}],
              "tag-label": ["14px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700"}],
              "display-xl": ["72px", {"lineHeight": "72px", "fontWeight": "400"}]
            }
          }
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""

index_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.neo-brutal-shadow {
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
}
.neo-brutal-shadow-sm {
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}
.ink-trap-border {
    border: 4px solid #1c1b1b;
}
.ink-trap-border-sm {
    border: 2px solid #1c1b1b;
}

.neo-brutalism-border { border: 4px solid #1c1b1b; }
.neo-brutalism-shadow { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
.comic-angle { transform: rotate(-1.5deg); }
.counter-rotate { transform: rotate(1.5deg); }

.login-canvas {
    background: linear-gradient(105deg, #fcf9f8 49.9%, #1c1b1b 50%, #1c1b1b 50.1%, #efff43 50.2%);
    min-height: 100vh;
}

@media (max-width: 768px) {
    .login-canvas {
        background: #efff43;
    }
}

.neo-brutalist-border {
    border: 4px solid #1c1b1b;
}
.neo-brutalist-shadow {
    box-shadow: 8px 8px 0px 0px rgba(28, 27, 27, 1);
}
.neo-brutalist-shadow-sm {
    box-shadow: 4px 4px 0px 0px rgba(28, 27, 27, 1);
}
.neo-brutalist-shadow-hover:hover {
    box-shadow: 12px 12px 0px 0px rgba(28, 27, 27, 1);
    transform: translate(-2px, -2px);
}
.neo-brutalist-shadow-active:active {
    box-shadow: 2px 2px 0px 0px rgba(28, 27, 27, 1);
    transform: translate(2px, 2px);
}
.ink-trap {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
}
.rotate-z-1 { transform: rotate(1deg); }
.rotate-z-neg-1 { transform: rotate(-1deg); }
.rotate-z-neg-1-5 { transform: rotate(-1.5deg); }

.neo-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
.neo-shadow-lg { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }

body {
    background-color: #fcf9f8;
    color: #1c1b1b;
    font-family: 'Hanken Grotesk', sans-serif;
    overflow-x: hidden;
}
"""

with open('f:/FindMyDoc/frontend/src/pages/DoctorApplication.jsx', 'w', encoding='utf-8') as f:
    f.write(create_component("DoctorApplication", html_to_jsx(apply_doctor_html), doctor_js))
    
with open('f:/FindMyDoc/frontend/src/pages/Login.jsx', 'w', encoding='utf-8') as f:
    f.write(create_component("Login", html_to_jsx(login_html), login_js))
    
with open('f:/FindMyDoc/frontend/src/pages/Register.jsx', 'w', encoding='utf-8') as f:
    f.write(create_component("Register", html_to_jsx(register_html), register_js))
    
with open('f:/FindMyDoc/frontend/src/pages/LandingPage.jsx', 'w', encoding='utf-8') as f:
    f.write(create_component("LandingPage", html_to_jsx(landing_page_html), landing_js))

with open('f:/FindMyDoc/frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)
    
with open('f:/FindMyDoc/frontend/src/index.css', 'w', encoding='utf-8') as f:
    f.write(index_css)

print("SUCCESS")
