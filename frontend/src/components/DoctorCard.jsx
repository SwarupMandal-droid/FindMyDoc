import React from 'react';
import { useNavigate } from 'react-router-dom';

// Color scheme for each available day tag — alternates between the design system's
// three accent colors so the row of tags feels alive and readable at a glance.
const DAY_PALETTE = {
  MON: { bg: 'bg-secondary',         text: 'text-white'           },
  TUE: { bg: 'bg-primary-container', text: 'text-on-background'   },
  WED: { bg: 'bg-secondary',         text: 'text-white'           },
  THU: { bg: 'bg-tertiary',          text: 'text-white'           },
  FRI: { bg: 'bg-primary-container', text: 'text-on-background'   },
  SAT: { bg: 'bg-on-background',     text: 'text-white'           },
  SUN: { bg: 'bg-tertiary',          text: 'text-white'           },
};

/**
 * DoctorCard — Neo-Brutalist search result card.
 *
 * Props:
 *   doctor {object} — A DoctorSummarySerializer payload from /api/doctors/search/
 */
export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const {
    id,
    full_name       = '',
    specialization  = '',
    experience_years = 0,
    qualification   = '',
    clinic_name     = '',
    city            = '',
    available_days  = '',
    profile_image_url,
  } = doctor;

  // Parse "MON,WED,FRI" → ['MON', 'WED', 'FRI']
  const days = available_days
    ? available_days.split(',').map(d => d.trim().toUpperCase()).filter(Boolean)
    : [];

  // Initials avatar fallback when no profile photo is uploaded
  const initials = full_name
    ? full_name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'DR';

  return (
    <article
      className="bg-white border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px]
                 transition-all duration-150 relative group"
    >
      {/* ── Verified stamp — top-right corner ─────────────────────────── */}
      <div className="absolute -top-3 -right-3 bg-primary-container border-4 border-on-background
                      px-2 py-0.5 font-tag-label text-[10px] text-on-background rotate-[2deg] z-10
                      shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        ✓ VERIFIED
      </div>

      <div className="p-5">

        {/* ── SECTION 1: Side-by-side profile ──────────────────────────── */}
        <div className="flex gap-4 items-start">

          {/* Left: square profile image with thick frame */}
          <div className="flex-shrink-0">
            {profile_image_url ? (
              <img
                src={profile_image_url}
                alt={`Dr. ${full_name}`}
                className="w-[96px] h-[96px] object-cover border-4 border-on-background
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            ) : (
              /* Initials avatar when photo is absent */
              <div className="w-[96px] h-[96px] bg-primary-container border-4 border-on-background
                              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="font-headline-lg text-[32px] text-on-background leading-none">
                  {initials}
                </span>
              </div>
            )}
          </div>

          {/* Right: professional statistics */}
          <div className="flex-1 min-w-0">

            {/* Name — blue highlight strip */}
            <div className="bg-secondary inline-block px-2 py-1 mb-2 max-w-full">
              <p className="font-button-text text-[15px] text-white leading-tight truncate">
                DR. {full_name.toUpperCase()}
              </p>
            </div>

            {/* Specialization */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-secondary flex-shrink-0"
                    style={{ fontSize: '15px' }}>local_hospital</span>
              <span className="font-tag-label text-tag-label text-on-background truncate">
                {specialization}
              </span>
            </div>

            {/* Qualification */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0"
                    style={{ fontSize: '15px' }}>school</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {qualification}
              </span>
            </div>

            {/* Experience badge */}
            <div className="inline-block bg-tertiary text-white border-2 border-on-background px-2 py-0.5">
              <span className="font-tag-label text-[11px] tracking-wider">
                {experience_years}+ YRS EXP
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="border-t-4 border-on-background my-4" />

        {/* ── SECTION 2: Clinic location ────────────────────────────────── */}
        <div className="flex items-start gap-2 mb-4">
          <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0 mt-0.5"
                style={{ fontSize: '16px' }}>location_on</span>
          <div className="min-w-0">
            <p className="font-tag-label text-tag-label text-on-background truncate">{clinic_name}</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider">
              {city}
            </p>
          </div>
        </div>

        {/* ── SECTION 3: Available days ─────────────────────────────────── */}
        {days.length > 0 ? (
          <div className="mb-4">
            <p className="font-tag-label text-[11px] text-on-surface-variant mb-1.5 uppercase tracking-widest">
              Available:
            </p>
            <div className="flex flex-wrap gap-1">
              {days.map(day => {
                const palette = DAY_PALETTE[day] || { bg: 'bg-surface-container', text: 'text-on-background' };
                return (
                  <span key={day}
                        className={`${palette.bg} ${palette.text} border-2 border-on-background
                                    px-2 py-0.5 font-tag-label text-[11px] tracking-wider`}>
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <span className="font-tag-label text-[11px] text-on-surface-variant italic">
              Contact clinic for schedule
            </span>
          </div>
        )}

        {/* ── SECTION 4: CTA button ─────────────────────────────────────── */}
        <button
          onClick={() => navigate(`/doctors/${id}`)}
          className="w-full bg-on-background text-white border-4 border-on-background
                     font-button-text text-button-text py-3 px-4
                     flex items-center justify-center gap-3
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:bg-secondary hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[-1px] hover:translate-y-[-1px]
                     active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                     transition-all group/btn"
        >
          VIEW FULL DETAILS
          <span className="material-symbols-outlined group-hover/btn:translate-x-2 transition-transform">
            arrow_forward
          </span>
        </button>

      </div>
    </article>
  );
}
