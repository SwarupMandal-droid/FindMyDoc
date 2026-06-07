import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import DoctorCard from '../components/DoctorCard';

// Quick-search hint chips shown in the idle state
const SEARCH_HINTS = [
  'Cardiologist', 'Chest Pain', 'Orthopedist', 'Dermatologist',
  'Neurologist', 'Diabetes', 'Pediatrician', 'Psychiatrist',
];

export default function SearchDashboard() {
  const navigate = useNavigate();

  // ── Auth state ──────────────────────────────────────────────────────────
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); }
    catch { return null; }
  })();
  const isLoggedIn = !!localStorage.getItem('access');

  // ── Search state ────────────────────────────────────────────────────────
  const [query, setQuery]           = useState('');
  const [city, setCity]             = useState('');
  const [localMode, setLocalMode]   = useState(false);
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef(null);

  // ── Logout ──────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ── Core search function ─────────────────────────────────────────────────
  const performSearch = useCallback(async (q, c, local) => {
    const trimQ    = (q ?? query).trim();
    const trimCity = (c ?? city).trim();
    const isLocal  = local ?? localMode;

    // Nothing to search
    if (!trimQ && !(isLocal && trimCity)) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    const params = {};
    if (trimQ)               params.q    = trimQ;
    if (isLocal && trimCity) params.city = trimCity;

    try {
      const response = await api.get('/api/doctors/search/', { params });
      setResults(response.data);
    } catch (err) {
      setError('Connection lost. Could not reach the doctor database. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, city, localMode]);

  // ── Debounced trigger on input changes ───────────────────────────────────
  useEffect(() => {
    const shouldSearch = query.trim() || (localMode && city.trim());
    if (!shouldSearch) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(query, city, localMode);
    }, 420);

    return () => clearTimeout(debounceRef.current);
  }, [query, city, localMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hint chip click — set query AND search immediately ───────────────────
  const handleHintClick = (hint) => {
    setQuery(hint);
    clearTimeout(debounceRef.current);
    performSearch(hint, city, localMode);
  };

  // ── Local mode toggle ───────────────────────────────────────────────────
  const toggleLocalMode = () => {
    const next = !localMode;
    setLocalMode(next);
    // If turning OFF local mode, re-run with city cleared
    if (!next) {
      clearTimeout(debounceRef.current);
      if (query.trim()) performSearch(query, '', false);
    }
  };

  // Whether we have anything to show
  const showResults  = !loading && hasSearched && results.length > 0;
  const showNoResult = !loading && hasSearched && results.length === 0;
  const showIdle     = !loading && !hasSearched;

  return (
    <>
      {/* ── STICKY HEADER ─────────────────────────────────────────────── */}
      <header className="bg-background w-full px-margin-desktop py-4 flex justify-between items-center
                         border-b-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                         z-50 sticky top-0">
        {/* Branding */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="font-display-xl text-[24px] leading-tight tracking-tighter
                       text-on-background bg-primary-container px-3 py-1 border-4 border-on-background
                       rotate-[-1.5deg] hover:rotate-0 transition-all"
          >
            DOC_FINDER.EXE
          </button>
          <nav className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-tag-label text-[12px] text-on-surface-variant uppercase tracking-widest">
              SEARCH_CONSOLE_ACTIVE
            </span>
          </nav>
        </div>

        {/* Right side: user info + logout / login */}
        <div className="flex items-center gap-3">
          {isLoggedIn && user ? (
            <>
              <div className="hidden sm:block border-4 border-on-background px-3 py-1
                              bg-surface-container font-tag-label text-[11px] text-on-surface-variant">
                <span className="text-secondary">{user.role}</span>_{user.email}
              </div>
              <button
                onClick={handleLogout}
                className="bg-tertiary text-white px-5 py-2 border-4 border-on-background
                           font-button-text text-[14px]
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:translate-x-[-2px] hover:translate-y-[-2px]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                           transition-all"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/register')}
                className="bg-primary-container text-on-background px-5 py-2 border-4 border-on-background
                           font-button-text text-[14px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:translate-x-[-2px] hover:translate-y-[-2px]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                           transition-all"
              >
                REGISTER
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-secondary text-white px-5 py-2 border-4 border-on-background
                           font-button-text text-[14px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:translate-x-[-2px] hover:translate-y-[-2px]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                           transition-all"
              >
                LOGIN
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto py-stack-lg px-4 md:px-margin-desktop">

        {/* ══ HERO SEARCH PANEL ══════════════════════════════════════════ */}
        <section className="relative bg-primary-container border-4 border-on-background
                            shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-stack-lg">

          {/* Floating label — stuck to top-left corner */}
          <div className="absolute -top-5 left-8 z-10 bg-secondary text-white
                          px-4 py-1 border-4 border-on-background
                          font-tag-label text-tag-label rotate-[-1.5deg]
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            PATIENT_SEARCH_CONSOLE
          </div>

          {/* Decorative RX watermark */}
          <div className="absolute bottom-0 right-4 font-display-xl text-[120px] leading-none
                          text-on-background opacity-[0.06] pointer-events-none select-none">
            RX
          </div>

          <div className="p-8 pt-12 relative z-10">

            {/* Big search input */}
            <div className="relative mb-stack-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2
                               text-on-surface-variant pointer-events-none z-10"
                    style={{ fontSize: '24px' }}>
                search
              </span>
              <input
                id="main-search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && performSearch()}
                placeholder='Search symptoms, diseases, or specialties (e.g., "Chest pain", "Orthopedist")...'
                className="w-full border-4 border-on-background bg-white
                           pl-12 pr-36 py-5
                           font-body-md text-on-background text-[17px]
                           placeholder:text-on-surface-variant/50
                           focus:outline-none focus:border-secondary
                           shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           transition-all"
              />
              <button
                onClick={() => performSearch()}
                className="absolute right-0 top-0 bottom-0
                           bg-on-background text-white border-l-4 border-on-background
                           px-6 font-button-text text-[15px] tracking-wider
                           hover:bg-secondary transition-colors flex items-center gap-2"
              >
                SEARCH
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </button>
            </div>

            {/* ── Local Doctor Toggle row ───────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-stack-sm">

              {/* Toggle button — visually acts like a checkbox */}
              <button
                id="local-doctor-toggle"
                onClick={toggleLocalMode}
                className={`flex items-center gap-3 px-5 py-3 border-4 border-on-background
                            font-tag-label text-tag-label uppercase tracking-wider
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                            hover:translate-x-[-1px] hover:translate-y-[-1px]
                            active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
                            transition-all
                            ${localMode
                              ? 'bg-on-background text-white'
                              : 'bg-white text-on-background'
                            }`}
              >
                {/* Physical checkbox square */}
                <div className={`w-5 h-5 border-4 flex items-center justify-center flex-shrink-0
                                 ${localMode
                                   ? 'border-white bg-primary-container'
                                   : 'border-on-background bg-white'
                                 }`}>
                  {localMode && (
                    <span className="material-symbols-outlined text-on-background"
                          style={{ fontSize: '12px', fontVariationSettings: "'wght' 700" }}>
                      check
                    </span>
                  )}
                </div>
                LOCAL_DOCTOR_FILTER
              </button>

              {/* City input — slides in when local mode is ON */}
              {localMode && (
                <div className="flex items-center gap-2">
                  <span className="font-tag-label text-[12px] text-on-background uppercase">CITY:</span>
                  <input
                    id="city-filter-input"
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. KOLKATA"
                    autoFocus
                    className="border-4 border-on-background bg-white
                               px-4 py-2 w-44
                               font-tag-label text-tag-label text-on-background uppercase
                               placeholder:normal-case placeholder:text-on-surface-variant/50
                               focus:outline-none focus:border-secondary
                               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                               transition-all"
                  />
                </div>
              )}

              {/* Hint when local mode is ON but city is empty */}
              {localMode && !city.trim() && (
                <p className="font-tag-label text-[11px] text-on-background opacity-60 italic">
                  ↑ Type your city to filter results
                </p>
              )}
            </div>

          </div>
        </section>

        {/* ── ERROR BANNER ─────────────────────────────────────────────── */}
        {error && (
          <div className="bg-error text-white border-4 border-on-background
                          shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                          p-4 mb-stack-md flex items-center gap-3">
            <span className="material-symbols-outlined flex-shrink-0">warning</span>
            <span className="font-tag-label text-tag-label">{error}</span>
          </div>
        )}

        {/* ── LOADING SPINNER ───────────────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col items-center py-16 gap-stack-md">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-on-background border-t-secondary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-background"
                      style={{ fontSize: '24px' }}>
                  local_hospital
                </span>
              </div>
            </div>
            <p className="font-tag-label text-tag-label text-on-surface-variant uppercase tracking-widest">
              SCANNING_DATABASE...
            </p>
          </div>
        )}

        {/* ══ RESULTS GRID ════════════════════════════════════════════════ */}
        {showResults && (
          <>
            {/* Results counter */}
            <div className="flex items-center gap-4 mb-stack-md">
              <div className="bg-secondary text-white border-4 border-on-background
                              px-4 py-2 font-tag-label text-tag-label
                              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-0.5deg]">
                {results.length}&nbsp;RESULT{results.length !== 1 ? 'S' : ''}_FOUND
              </div>
              {localMode && city.trim() && (
                <div className="bg-primary-container border-4 border-on-background
                                px-4 py-2 font-tag-label text-tag-label
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  LOCAL: {city.trim().toUpperCase()}
                </div>
              )}
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md">
              {results.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </>
        )}

        {/* ══ NO RESULTS ══════════════════════════════════════════════════ */}
        {showNoResult && (
          <div className="flex flex-col items-center py-16">
            <div className="bg-white border-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                            p-12 text-center max-w-md relative overflow-visible">
              <div className="absolute -top-5 left-8 bg-tertiary text-white
                              px-4 py-1 border-4 border-on-background
                              font-tag-label text-tag-label rotate-[2deg]">
                QUERY_RETURNED_NULL
              </div>
              <span className="material-symbols-outlined text-on-surface-variant mb-stack-md block"
                    style={{ fontSize: '64px' }}>
                manage_search
              </span>
              <p className="font-headline-lg text-[28px] text-on-background uppercase mb-3">
                NO_RESULTS
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                No verified doctors matched your search. Try different keywords or remove the city filter.
              </p>
              <button
                onClick={() => { setQuery(''); setCity(''); setLocalMode(false); setHasSearched(false); setResults([]); }}
                className="bg-secondary text-white border-4 border-on-background
                           px-6 py-3 font-button-text text-[14px]
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           hover:translate-x-[-1px] hover:translate-y-[-1px]
                           transition-all"
              >
                RESET_SEARCH
              </button>
            </div>
          </div>
        )}

        {/* ══ IDLE / EMPTY STATE ══════════════════════════════════════════ */}
        {showIdle && (
          <div className="flex flex-col items-center py-10">
            <div className="w-full max-w-lg bg-white border-4 border-on-background
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10 text-center relative overflow-visible">

              {/* Tag */}
              <div className="absolute -top-5 left-8 bg-on-background text-white
                              px-4 py-1 border-4 border-on-background
                              font-tag-label text-tag-label rotate-[-1.5deg]
                              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                AWAITING_QUERY
              </div>

              {/* Animated medical kit icon */}
              <div className="relative flex justify-center mb-stack-md">
                <div className="w-28 h-28 bg-primary-container border-4 border-on-background
                                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                                flex items-center justify-center rotate-12
                                hover:rotate-0 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                                transition-all duration-300 cursor-default">
                  <span className="material-symbols-outlined text-on-background"
                        style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}>
                    medical_services
                  </span>
                </div>
                {/* Pulsing dot */}
                <div className="absolute top-1 right-1/4 w-4 h-4 bg-tertiary
                                border-2 border-on-background rounded-full animate-bounce" />
              </div>

              <p className="font-headline-lg text-[32px] text-on-background uppercase mb-3">
                TYPE A SYMPTOM
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                Enter a disease, specialty, or doctor name above to find verified healthcare professionals.
              </p>

              {/* Quick-search hints */}
              <div className="border-t-4 border-on-background pt-stack-md">
                <p className="font-tag-label text-[11px] text-on-surface-variant uppercase tracking-widest mb-3">
                  Quick Search:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SEARCH_HINTS.map(hint => (
                    <button
                      key={hint}
                      onClick={() => handleHintClick(hint)}
                      className="px-3 py-1.5 bg-secondary-fixed border-2 border-on-background
                                 font-tag-label text-[12px] text-on-background
                                 hover:bg-primary-container
                                 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                 hover:translate-x-[-1px] hover:translate-y-[-1px]
                                 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                                 transition-all"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats strip below idle card */}
            <div className="flex flex-wrap justify-center gap-stack-md mt-8">
              {[
                { label: 'VERIFIED_DOCS', val: '120+', color: 'bg-secondary text-white' },
                { label: 'SPECIALTIES',   val: '40+',  color: 'bg-primary-container text-on-background' },
                { label: 'CITIES_COVERED', val: '25+', color: 'bg-tertiary text-white' },
              ].map(stat => (
                <div key={stat.label}
                     className={`${stat.color} border-4 border-on-background
                                 px-6 py-3 text-center
                                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                  <div className="font-display-xl text-[32px] leading-none">{stat.val}</div>
                  <div className="font-tag-label text-[10px] mt-1 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
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
