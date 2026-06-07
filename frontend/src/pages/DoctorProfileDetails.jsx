import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

// Same day palette as DoctorCard for visual consistency
const DAY_PALETTE = {
  MON: { bg: 'bg-secondary',         text: 'text-white'         },
  TUE: { bg: 'bg-primary-container', text: 'text-on-background' },
  WED: { bg: 'bg-secondary',         text: 'text-white'         },
  THU: { bg: 'bg-tertiary',          text: 'text-white'         },
  FRI: { bg: 'bg-primary-container', text: 'text-on-background' },
  SAT: { bg: 'bg-on-background',     text: 'text-white'         },
  SUN: { bg: 'bg-tertiary',          text: 'text-white'         },
};

// ── Sub-components ─────────────────────────────────────────────────────────

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b-2 border-on-background/10 last:border-b-0">
      <span className="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5"
            style={{ fontSize: '18px' }}>
        {icon}
      </span>
      <div>
        <p className="font-tag-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="font-body-md text-body-md text-on-background">
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function DoctorProfileDetails() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [doctor, setDoctor]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // Fetch doctor data on mount
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get(`/api/doctors/${id}/`);
        setDoctor(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('This doctor profile was not found or is pending verification.');
        } else {
          setError('Failed to load profile. Please check your connection and try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  // Parse available days
  const days = doctor?.available_days
    ? doctor.available_days.split(',').map(d => d.trim().toUpperCase()).filter(Boolean)
    : [];

  // Initials fallback for avatar
  const initials = doctor?.full_name
    ? doctor.full_name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'DR';

  // Format phone for big display: e.g. "+91 98765 43210" → spaced groups
  const formatPhone = (raw = '') => {
    if (!raw) return null;
    // Leave the original string but space it with a zero-width space between every char
    // so copy is awkward but readability is perfect. We also use select-none on the wrapper.
    return raw;
  };

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <PageHeader navigate={navigate} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-stack-md">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-on-background border-t-secondary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-background" style={{ fontSize: '28px' }}>
                local_hospital
              </span>
            </div>
          </div>
          <p className="font-tag-label text-tag-label text-on-surface-variant uppercase tracking-widest">
            LOADING_PROFILE...
          </p>
        </div>
      </>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────
  if (error) {
    return (
      <>
        <PageHeader navigate={navigate} />
        <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col items-center">
          <div className="bg-white border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                          p-12 text-center relative overflow-visible w-full">
            <div className="absolute -top-5 left-8 bg-tertiary text-white
                            px-4 py-1 border-4 border-on-background
                            font-tag-label text-tag-label rotate-[1.5deg]">
              PROFILE_NOT_FOUND
            </div>
            <span className="material-symbols-outlined text-tertiary mb-stack-md block"
                  style={{ fontSize: '64px' }}>
              error_outline
            </span>
            <p className="font-headline-lg text-[28px] text-on-background uppercase mb-3">
              RECORD_NOT_FOUND
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              {error}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-secondary text-white border-4 border-on-background px-6 py-3
                         font-button-text text-[14px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                         hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              ← BACK TO SEARCH
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── Main profile render ──────────────────────────────────────────────
  return (
    <>
      <PageHeader navigate={navigate} />

      <main className="max-w-5xl mx-auto py-stack-lg px-4 md:px-margin-desktop">

        {/* ── BACK NAVIGATION ──────────────────────────────────────────── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-tag-label text-tag-label text-on-surface-variant
                     hover:text-secondary transition-colors mb-stack-md group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform"
                style={{ fontSize: '18px' }}>
            arrow_back
          </span>
          BACK_TO_SEARCH
        </button>

        {/* ══ HERO BLOCK — dark background, dramatic contrast ════════════ */}
        <section className="bg-on-background border-4 border-on-background
                            shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-stack-md relative overflow-hidden">

          {/* RX watermark */}
          <div className="absolute bottom-0 right-0 font-display-xl text-[180px] leading-none
                          text-white opacity-[0.03] pointer-events-none select-none">
            Rx
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 relative z-10">

            {/* Left: Profile photo */}
            <div className="flex-shrink-0">
              {doctor.profile_image_url ? (
                <img
                  src={doctor.profile_image_url}
                  alt={`Dr. ${doctor.full_name}`}
                  className="w-36 h-36 md:w-44 md:h-44 object-cover
                             border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]"
                />
              ) : (
                <div className="w-36 h-36 md:w-44 md:h-44
                                bg-primary-container border-4 border-white
                                shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]
                                flex items-center justify-center">
                  <span className="font-display-xl text-[56px] leading-none text-on-background">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Right: name, title, badges */}
            <div className="flex-1">

              {/* Verification badge */}
              {doctor.is_verified && (
                <div className="inline-flex items-center gap-2 bg-primary-container text-on-background
                                border-2 border-white px-3 py-1 mb-4
                                font-tag-label text-[11px] tracking-widest">
                  <span className="material-symbols-outlined"
                        style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  VERIFIED_BY_ADMIN
                </div>
              )}

              {/* Doctor name — large Anton display */}
              <h1 className="font-display-xl text-[48px] md:text-[64px] leading-[0.95]
                             text-white uppercase mb-3">
                DR. {doctor.full_name}
              </h1>

              {/* Qualification + specialization */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-secondary text-white border-2 border-white
                                 px-3 py-1 font-tag-label text-tag-label">
                  {doctor.qualification}
                </span>
                <span className="bg-white text-on-background border-2 border-white
                                 px-3 py-1 font-tag-label text-tag-label">
                  {doctor.specialization}
                </span>
              </div>

              {/* Experience */}
              <p className="font-tag-label text-[13px] text-white/70 uppercase tracking-widest">
                {doctor.experience_years}+ Years of Clinical Experience
              </p>
            </div>
          </div>
        </section>

        {/* ══ STATS STRIP — bright yellow bar ════════════════════════════ */}
        <div className="bg-primary-container border-4 border-on-background
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                        flex flex-wrap divide-x-4 divide-on-background mb-stack-md">
          {[
            { icon: 'stethoscope',  label: 'SPECIALIZATION',   val: doctor.specialization  },
            { icon: 'calendar_month', label: 'EXP_YEARS',       val: `${doctor.experience_years}+ Years` },
            { icon: 'school',       label: 'QUALIFICATION',    val: doctor.qualification   },
            { icon: 'location_city', label: 'CITY',            val: doctor.city            },
          ].map(item => (
            <div key={item.label} className="flex-1 min-w-[140px] px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-on-background"
                      style={{ fontSize: '16px' }}>{item.icon}</span>
                <span className="font-tag-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
              <p className="font-button-text text-[16px] text-on-background truncate">
                {item.val}
              </p>
            </div>
          ))}
        </div>

        {/* ══ CONTENT GRID — two columns on desktop ══════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">

          {/* Left column (2/3): About + Clinic info */}
          <div className="md:col-span-2 space-y-stack-md">

            {/* ── About clipboard card ────────────────────────────────── */}
            {doctor.about_you && (
              <div className="bg-white border-4 border-on-background
                              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-visible">
                <div className="absolute -top-5 left-6 bg-secondary text-white
                                px-4 py-1 border-4 border-on-background
                                font-tag-label text-tag-label rotate-[-1deg]
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  ABOUT_DOCTOR
                </div>
                <div className="p-8 pt-10">
                  {/* Decorative ruled lines behind text — clipboard feel */}
                  <div className="border-l-4 border-secondary pl-5">
                    <p className="font-body-md text-body-md text-on-background leading-relaxed whitespace-pre-wrap">
                      {doctor.about_you}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Clinic info card ─────────────────────────────────────── */}
            <div className="bg-white border-4 border-on-background
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-visible">
              <div className="absolute -top-5 left-6 bg-on-background text-white
                              px-4 py-1 border-4 border-on-background
                              font-tag-label text-tag-label rotate-[1deg]
                              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                CLINIC_DETAILS
              </div>
              <div className="p-8 pt-10">
                <InfoRow icon="local_hospital" label="Clinic Name"    value={doctor.clinic_name}    />
                <InfoRow icon="location_on"    label="Full Address"   value={doctor.clinic_address} />
                <InfoRow icon="location_city"  label="City"          value={doctor.city}           />
              </div>
            </div>

            {/* ── Available days card ──────────────────────────────────── */}
            <div className="bg-white border-4 border-on-background
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-visible">
              <div className="absolute -top-5 left-6 bg-primary-container text-on-background
                              px-4 py-1 border-4 border-on-background
                              font-tag-label text-tag-label rotate-[-0.5deg]
                              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                AVAILABILITY_SCHEDULE
              </div>
              <div className="p-8 pt-10">
                {days.length > 0 ? (
                  <>
                    <p className="font-tag-label text-[11px] text-on-surface-variant uppercase
                                  tracking-widest mb-4">
                      Clinic operating days:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {/* Render ALL days of week, highlight active ones */}
                      {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => {
                        const isActive = days.includes(day);
                        const palette  = DAY_PALETTE[day] || { bg: 'bg-surface-container', text: 'text-on-background' };
                        return (
                          <div key={day}
                               className={`border-4 border-on-background px-4 py-3 text-center min-w-[64px]
                                           font-tag-label text-[13px] tracking-wider
                                           shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                                           ${isActive
                                             ? `${palette.bg} ${palette.text} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                                             : 'bg-surface-container text-on-surface-variant opacity-40'
                                           }`}>
                            {day}
                          </div>
                        );
                      })}
                    </div>
                    <p className="font-tag-label text-[11px] text-on-surface-variant mt-4 italic">
                      * Greyed out days = clinic closed. Contact to confirm hours.
                    </p>
                  </>
                ) : (
                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    Schedule not specified. Please contact the clinic directly for timings.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column (1/3): Contact card ─ this is the money shot */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-stack-md">

              {/* ── CONTACT CARD — high-visibility yellow ────────────── */}
              <div className="bg-primary-container border-4 border-on-background
                              shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-visible">
                <div className="absolute -top-5 right-6 bg-tertiary text-white
                                px-4 py-1 border-4 border-on-background
                                font-tag-label text-tag-label rotate-[2deg]
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  DIRECT_CONTACT
                </div>
                <div className="p-6 pt-10 text-center">
                  <span className="material-symbols-outlined text-on-background mb-2 block"
                        style={{ fontSize: '40px', fontVariationSettings: "'FILL' 1" }}>
                    call
                  </span>
                  <p className="font-tag-label text-[11px] text-on-surface-variant uppercase
                                tracking-widest mb-3">
                    CONTACT TO INQUIRE
                  </p>
                  {/* ─ Phone number — large, blocky, select-none ────── */}
                  {formatPhone(doctor.phone_number) ? (
                    <div className="bg-on-background border-4 border-on-background
                                    p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-display-xl text-[32px] text-white leading-tight select-none"
                         style={{ letterSpacing: '0.08em', userSelect: 'none' }}>
                        {doctor.phone_number}
                      </p>
                      <p className="font-tag-label text-[10px] text-white/50 mt-1 tracking-widest">
                        PICK UP YOUR PHONE AND CALL
                      </p>
                    </div>
                  ) : (
                    <div className="bg-surface-container border-4 border-on-background p-4 mb-4">
                      <p className="font-tag-label text-[12px] text-on-surface-variant italic">
                        Contact number not provided.
                      </p>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <p className="font-tag-label text-[10px] text-on-background/60 leading-relaxed">
                    This platform provides information only. No booking or consultation is conducted through DOC_FINDER.EXE.
                  </p>
                </div>
              </div>

              {/* ── Quick-facts card ─────────────────────────────────── */}
              <div className="bg-white border-4 border-on-background
                              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5">
                <p className="font-tag-label text-[11px] text-on-surface-variant uppercase
                              tracking-widest mb-4 border-b-4 border-on-background pb-2">
                  QUICK_FACTS
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-tag-label text-[12px] text-on-surface-variant">Status</span>
                    <span className={`font-tag-label text-[12px] px-2 py-0.5 border-2 border-on-background
                                     ${doctor.is_verified
                                       ? 'bg-primary-container text-on-background'
                                       : 'bg-error text-white'
                                     }`}>
                      {doctor.is_verified ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tag-label text-[12px] text-on-surface-variant">Experience</span>
                    <span className="font-button-text text-[14px] text-secondary">
                      {doctor.experience_years}+ Yrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tag-label text-[12px] text-on-surface-variant">Location</span>
                    <span className="font-tag-label text-[12px] text-on-background">
                      {doctor.city}
                    </span>
                  </div>
                  {doctor.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="font-tag-label text-[12px] text-on-surface-variant">Listed</span>
                      <span className="font-tag-label text-[12px] text-on-surface-variant">
                        {new Date(doctor.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="bg-on-background text-white w-full py-stack-md px-margin-desktop
                         flex flex-col md:flex-row justify-between items-center
                         border-t-4 border-on-background mt-stack-lg gap-gutter">
        <div className="font-button-text text-[20px] text-primary-container tracking-tighter">
          DOC_FINDER_MEDICAL_GROUP
        </div>
        <div className="font-tag-label text-tag-label opacity-60 uppercase tracking-widest text-center">
          ©2024 DOC_FINDER // NO_BS_HEALTHCARE
        </div>
        <div className="flex gap-6 font-tag-label text-[12px]">
          <a className="opacity-80 hover:opacity-100 hover:text-primary-container hover:underline transition-all" href="#">TERMS_OF_SERVICE</a>
          <a className="opacity-80 hover:opacity-100 hover:text-primary-container hover:underline transition-all" href="#">PRIVACY_PROTOCOL</a>
        </div>
      </footer>
    </>
  );
}

// ── Shared page header ─────────────────────────────────────────────────────
function PageHeader({ navigate }) {
  const isLoggedIn = !!localStorage.getItem('access');
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-background w-full px-margin-desktop py-4 flex justify-between items-center
                       border-b-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                       z-50 sticky top-0">
      <button
        onClick={() => navigate('/search')}
        className="font-display-xl text-[24px] leading-tight tracking-tighter
                   text-on-background bg-primary-container px-3 py-1
                   border-4 border-on-background rotate-[-1.5deg]
                   hover:rotate-0 transition-all"
      >
        DOC_FINDER.EXE
      </button>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-surface-container text-on-background px-5 py-2 border-4 border-on-background
                     font-button-text text-[14px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[-2px] hover:translate-y-[-2px]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                     transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          BACK
        </button>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-tertiary text-white px-5 py-2 border-4 border-on-background
                       font-button-text text-[14px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       hover:translate-x-[-2px] hover:translate-y-[-2px]
                       hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                       active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                       transition-all"
          >
            LOGOUT
          </button>
        )}
      </div>
    </header>
  );
}
