# FindMyDoc — Deep Architecture Sync Report
**Generated:** 2026-05-28 | **Analyst:** Lead Software Architect

---

## 1. Functional Mapping — Core User Flows

### How Frontend Talks to Backend

```
React (Vite, port 5173)
        │
        │  HTTP/JSON  (via Axios, baseURL: http://127.0.0.1:8000)
        │  Authorization: Bearer <JWT access token>  ← injected by interceptor in api.js
        ▼
Django (Gunicorn/runserver, port 8000)
        │
        │  CorsMiddleware allows: localhost:5173, localhost:3000
        │  JWTAuthentication verifies token on protected endpoints
        ▼
SQLite (db.sqlite3, located at backend/db.sqlite3)
```

**Auth Token Storage (Frontend):**
- `access` token → `localStorage.getItem('access')`
- `refresh` token → `localStorage.getItem('refresh')`
- `user` object (id, email, role, first_name, last_name) → `localStorage.getItem('user')`

> [!IMPORTANT]
> The project brief mentions **Oracle 10g** as the target database. The current implementation
> uses **SQLite**. This is a major CRITICAL_MISSING_CONTEXT item — see Section 4.

---

### Implemented User Flows (What Actually Works Today)

| Flow | Frontend Route | API Endpoint | Status |
|---|---|---|---|
| View landing page | `/` → `LandingPage.jsx` | None (static) | ✅ Done |
| Patient registration | `/register` → `Register.jsx` | `POST /api/auth/register/patient/` | ✅ Done |
| Doctor application | `/apply-doctor` → `DoctorApplication.jsx` | `POST /api/auth/register/doctor/` | ✅ Done |
| Login | `/login` → `Login.jsx` | `POST /api/auth/login/` | ✅ Done |
| Token refresh | (no UI yet) | `POST /api/auth/login/refresh/` | ✅ API ready |
| Doctor search | ❌ Not built | ❌ Not built | 🚧 TODO |
| Doctor profile view | ❌ Not built | ❌ Not built | 🚧 TODO |
| Logout | ❌ Not built | N/A (clear localStorage) | 🚧 TODO |

---

## 2. Technical Audit — Project Structure, Conventions & Technical Debt

### Directory Structure

```
f:\FindMyDoc\
├── backend\                        ← Django project root
│   ├── core\                       ← Django "project" package (settings, urls, wsgi, asgi)
│   │   ├── settings.py
│   │   ├── urls.py                 ← ROOT router: only mounts /admin/ and /api/auth/
│   │   └── ...
│   ├── authentication\             ← Django app: User model, JWT, registration
│   │   ├── models.py               ← Custom User (AbstractUser + role + phone_number)
│   │   ├── serializers.py          ← PatientReg, DoctorReg, CustomTokenObtainPair
│   │   ├── views.py                ← PatientRegistrationView, DoctorRegistrationView
│   │   ├── urls.py                 ← /register/patient/, /register/doctor/, /login/, /login/refresh/
│   │   ├── admin.py                ← CustomUserAdmin (adds role + phone_number to fieldsets)
│   │   └── migrations\0001_initial.py
│   ├── doctors\                    ← Django app: DoctorProfile model
│   │   ├── models.py               ← DoctorProfile (OneToOne → User)
│   │   ├── admin.py                ← DoctorProfileAdmin with bulk approve action
│   │   ├── views.py                ← EMPTY (only a comment)
│   │   └── migrations\0001_initial.py
│   ├── db.sqlite3                  ← Current live database
│   └── manage.py
│
└── frontend\                       ← Vite + React project
    ├── index.html                  ← Tailwind CDN loaded here (NOT via npm package)
    ├── vite.config.js              ← Minimal config, no proxy configured
    ├── package.json                ← axios, react, react-dom, react-router-dom
    └── src\
        ├── main.jsx                ← ReactDOM.createRoot entry
        ├── App.jsx                 ← BrowserRouter + 4 Routes
        ├── api.js                  ← Axios instance + Bearer token interceptor
        ├── index.css               ← Tailwind @imports + Neo-Brutalist utility classes
        └── pages\
            ├── LandingPage.jsx     ← Static landing (no API calls)
            ├── Login.jsx           ← POST /api/auth/login/ → stores tokens
            ├── Register.jsx        ← POST /api/auth/register/patient/
            └── DoctorApplication.jsx ← POST /api/auth/register/doctor/
```

### Naming Conventions

| Layer | Convention | Notes |
|---|---|---|
| Django apps | `snake_case` | `authentication`, `doctors` ✅ |
| Django models | `PascalCase` | `User`, `DoctorProfile` ✅ |
| Django URLs | `kebab-case` (mostly) | `register/patient/` ✅ |
| Django views | `PascalCase` class names | ✅ |
| React components | `PascalCase` | `Login`, `Register`, `DoctorApplication` ✅ |
| React pages dir | `pages/` | ✅ |
| JS state vars | `camelCase` | `fullName`, `experienceYears` ✅ |
| API payload keys | `snake_case` | `first_name`, `clinic_address` ✅ |
| CSS classes | Neo-Brutalist utility pattern | Mix of `neo-brutal-*`, `neo-brutalism-*`, `neo-brutalist-*` ⚠️ **3 different naming prefixes** |

### Hardcoded Configurations (Technical Debt)

| Location | Hardcoded Value | Risk Level |
|---|---|---|
| `core/settings.py:11` | `SECRET_KEY = 'django-insecure-...'` | 🔴 CRITICAL — must never reach production |
| `core/settings.py:14` | `DEBUG = True` | 🔴 CRITICAL — exposes stack traces |
| `core/settings.py:16` | `ALLOWED_HOSTS = []` | 🔴 CRITICAL — no host validation |
| `core/settings.py:69-74` | `ENGINE = 'django.db.backends.sqlite3'` | 🔴 CRITICAL — not suitable for production |
| `core/settings.py:101` | `TIME_ZONE = 'UTC'` | 🟡 MEDIUM — India is IST (+5:30), affects timestamps |
| `frontend/src/api.js:4` | `baseURL: 'http://127.0.0.1:8000'` | 🟡 MEDIUM — hardcoded dev URL, no env variable |
| `frontend/index.html:8` | Tailwind via CDN `<script>` | 🟡 MEDIUM — CDN Tailwind in production is bad practice |
| `frontend/vite.config.js` | No proxy configured | 🟡 MEDIUM — CORS workaround instead of proper proxy |
| `doctors/migrations/0001_initial.py:29` | `registration_certificate` is `NOT NULL` | 🔴 CRITICAL — `DoctorApplication.jsx` never uploads a file! |

---

## 3. Logic Verification — Step-by-Step Request Traces

### Flow A: Patient Registers

```
1. User fills Register.jsx form (fullName, email, password)
2. handleRegister() fires on submit
3. Frontend splits fullName → firstName + lastName
4. Generates username = email.split('@')[0] + random 3-digit number
5. POSTs to /api/auth/register/patient/ (no auth header needed, AllowAny)
   Payload: { email, username, password, first_name, last_name }

6. Django: CorsMiddleware checks origin → allowed
7. Django: Routes to authentication.urls → PatientRegistrationView
8. PatientRegistrationView.create() called
9. PatientRegistrationSerializer.is_valid() runs:
   - Validates email uniqueness
   - Validates username uniqueness (username is also unique at DB level)
   - No password confirm field — only 1 password field
10. serializer.save() → PatientRegistrationSerializer.create()
    - Calls User.objects.create_user(role=PATIENT)
    - Django hashes password with PBKDF2
    - Saves to authentication_user table in db.sqlite3
11. Returns HTTP 201: { user: {id, email, role}, message }

12. Frontend: navigate('/login')
```

**⚠️ Issue in Step 4:** `username` generated with `Math.random()` is not guaranteed to be unique. A collision will return a 400 error that the frontend partially handles (`err.response?.data?.username?.[0]`).

---

### Flow B: Doctor Applies

```
1. User fills DoctorApplication.jsx (personal info + professional info)
2. handleApply() fires on submit
3. Frontend builds: fullAddress = clinicAddress + ", " + zipCode
4. POSTs to /api/auth/register/doctor/ (AllowAny)
   Payload: { email, username, password, first_name, last_name,
              phone_number, about_you, specialization, qualification,
              clinic_name, clinic_address, city, experience_years }

5. Django routes to DoctorRegistrationView
6. DoctorRegistrationSerializer.is_valid() validates fields
7. DoctorRegistrationSerializer.create() runs:
   a. Pops profile fields out of validated_data
   b. Creates User (role=DOCTOR) via create_user()
   c. Creates DoctorProfile(user=user, **profile_data)
      → DoctorProfile.is_verified defaults to False
      → DoctorProfile.registration_certificate is NOT NULL in DB

8. ⚠️ CRITICAL BUG: The form has NO file upload input.
   The serializer has NO file field for registration_certificate.
   BUT the DB column is NOT NULL.
   This WILL raise an IntegrityError when the model tries to save.
   (Or Django validation will block it first.)

9. Returns HTTP 201 → frontend navigates to /login
```

---

### Flow C: User Logs In

```
1. User fills Login.jsx (email, password)
2. handleLogin() fires
3. POSTs to /api/auth/login/ (AllowAny)
   Payload: { email, password }

4. CustomTokenObtainPairView → CustomTokenObtainPairSerializer.validate()
5. SimpleJWT calls authenticate() with email as USERNAME_FIELD
6. Django checks hashed password
7. CustomTokenObtainPairSerializer.validate() adds extra data:
   { access, refresh, user: {id, email, role, first_name, last_name} }

8. Frontend receives response:
   - localStorage.setItem('access', response.data.access)
   - localStorage.setItem('refresh', response.data.refresh)
   - localStorage.setItem('user', JSON.stringify(response.data.user))

9. Navigation: Both DOCTOR and PATIENT roles navigate to '/'
   (Doctor dashboard route not yet defined)

10. All subsequent API calls from api.js will automatically attach:
    Authorization: Bearer <access_token>
```

---

### Flow D: Admin Verifies a Doctor

```
1. Admin logs into /admin/ with superuser credentials
2. Navigates to Doctors → Doctor Profiles
3. List view shows: Doctor Name | Specialization | City | Is Verified | Created At
4. Can filter sidebar by: is_verified, city, specialization
5. Two ways to verify:
   a. Single: Click doctor → check 'is_verified' checkbox → Save
   b. Bulk:   Select checkboxes → Action dropdown → "Mark selected as Verified" → Go
      (This calls queryset.update(is_verified=True))

6. DB: UPDATE doctors_doctorprofile SET is_verified=1 WHERE id IN (...)
```

---

## 4. Gap Analysis — Missing Pieces, Security & Scalability Issues

### 🔴 CRITICAL BUGS (Will Break Things Right Now)

#### CRITICAL_MISSING_CONTEXT #1 — Oracle 10g vs SQLite
> The project brief states Oracle 10g as the database. The code uses SQLite. These are completely
> different engines. Oracle requires `cx_Oracle` or `oracledb` driver, different `DATABASE` config
> in settings.py, and likely a different `DEFAULT_AUTO_FIELD`. **Clarify: Is Oracle the actual target,
> or was the brief describing a future migration plan?**

#### CRITICAL_MISSING_CONTEXT #2 — DoctorApplication Has No File Upload
The `DoctorProfile.registration_certificate` field is defined as:
```python
registration_certificate = models.FileField(upload_to='certificates/')  # NOT NULL, no blank=True
```
But `DoctorApplication.jsx` has **zero file inputs** and `DoctorRegistrationSerializer` has **no `registration_certificate` field**. This means:
- If Django's model validation runs before save → `ValidationError`
- If it reaches the DB layer → `IntegrityError` (NOT NULL constraint)
- **The Doctor Application flow is currently broken.** Either make the field `blank=True, null=True` in the model (and add a migration), or add a proper file upload field to the form and serializer.

#### CRITICAL_MISSING_CONTEXT #3 — `doctors` app has no URL file
```python
# core/urls.py currently only has:
path('api/auth/', include('authentication.urls')),
# Missing:
# path('api/doctors/', include('doctors.urls')),
```
The `doctors` app has no `urls.py` file at all. The search and profile APIs you want to build have no route to be mounted on.

---

### 🟠 SECURITY BOTTLENECKS

| Issue | File | Details |
|---|---|---|
| Secret key exposed | `settings.py:11` | Literal string in source code. Use `python-decouple` or `os.environ` |
| No token refresh logic | `api.js` | When `access` token expires (SimpleJWT default: 5 min), all API calls return 401. No interceptor handles 401 → refresh → retry. Users will be silently broken. |
| No rate limiting | All endpoints | Registration and login endpoints are fully open to brute force. |
| JWT in localStorage | `Login.jsx` | Susceptible to XSS attacks. `httpOnly` cookies are safer but require backend changes. |
| Google Login is fake | `Login.jsx`, `Register.jsx` | The "CONTINUE WITH GOOGLE" button is `type="button"` with no handler — it does nothing. |
| No CSRF protection for DRF | `settings.py` | DRF with JWT authentication correctly bypasses Django's CSRF middleware for API calls, but this should be documented. |
| `DEBUG = True` in production | `settings.py:14` | Will expose full stack traces and settings to end users. |
| `ALLOWED_HOSTS = []` | `settings.py:16` | Empty list means Django allows all hosts when `DEBUG=True`. Must be set for production. |
| No `available_days` field | `DoctorProfile` | The brief mentions "available days" on doctor cards, but this field does not exist in the model. |

---

### 🟡 MISSING FEATURES (The "What's Left" List — Mapped to Code Gaps)

#### Backend Gaps

| Missing Piece | Where to Add |
|---|---|
| `doctors/urls.py` — does not exist | Create `backend/doctors/urls.py` |
| Mount doctors URLs in root | Add `path('api/doctors/', include('doctors.urls'))` to `core/urls.py` |
| `DoctorSummarySerializer` | Create `backend/doctors/serializers.py` |
| `DoctorDetailSerializer` | Same file |
| `DoctorSearchView` (GET `/api/doctors/search/`) | `backend/doctors/views.py` |
| `DoctorDetailView` (GET `/api/doctors/<id>/`) | `backend/doctors/views.py` |
| `available_days` field | Add to `DoctorProfile` model + new migration |
| Fix `registration_certificate` | Either make nullable or add file upload everywhere |

#### Frontend Gaps

| Missing Piece | Where to Add |
|---|---|
| `DoctorCard.jsx` component | `frontend/src/components/DoctorCard.jsx` (needs `components/` dir) |
| `SearchResults.jsx` page | `frontend/src/pages/SearchResults.jsx` |
| `DoctorProfile.jsx` page | `frontend/src/pages/DoctorProfile.jsx` |
| Register these routes | `frontend/src/App.jsx` |
| Logout button + handler | Navbar in any authenticated page |
| JWT 401 refresh interceptor | `frontend/src/api.js` — response interceptor |

---

### 🔵 SCALABILITY & STRUCTURAL ISSUES

| Issue | Details |
|---|---|
| **CSS naming inconsistency** | 3 different shadow/border naming prefixes: `neo-brutal-*`, `neo-brutalism-*`, `neo-brutalist-*`. Will cause bugs as more components are added. Unify into one system. |
| **Tailwind via CDN** | The Tailwind config in `index.html` uses `<script src="https://cdn.tailwindcss.com">`. This means Tailwind is loaded at runtime on every page load (large JS file). For production, install Tailwind as an npm package and use the CLI to purge unused styles. |
| **No `.env` files** | `api.js` hardcodes `http://127.0.0.1:8000`. Should be `import.meta.env.VITE_API_URL`. |
| **No `components/` directory** | The `src/` folder only has `pages/`. Reusable components like `DoctorCard`, `Navbar`, `Footer` have no home. Create `src/components/`. |
| **Footer is duplicated** | Each page (`Login.jsx`, `Register.jsx`, `DoctorApplication.jsx`) copy-pastes the footer JSX. It should be extracted into `components/Footer.jsx`. |
| **No global auth context** | Auth state (is logged in, user role) is stored in `localStorage` and read ad-hoc. There's no React Context or state management (Zustand, Redux) to share auth state. This will cause issues with protected routes. |
| **No protected routes** | Any unauthenticated user can navigate directly to `/apply-doctor`. There's no route guard checking for a valid token. |
| **`username` collision risk** | Both `Register.jsx` and `DoctorApplication.jsx` generate `username = email.split('@')[0] + Math.random()`. With enough users, collisions will occur (birthday problem). Better strategy: use `email` itself as the username, or use UUID. |
| **SQLite not thread-safe** | SQLite has write-locking issues under concurrent load. Not suitable for production or even local multi-user testing. |
| **No search index** | The planned search API will do `icontains` queries on `specialization`, `clinic_name`, `about_you`. These are full table scans. For scale, add `db_index=True` to `specialization` and `city` fields, or use `django-haystack` with a search backend. |
| **`TIME_ZONE = 'UTC'`** | All `created_at` timestamps will be stored in UTC. The admin panel will show UTC times. Consider setting `TIME_ZONE = 'Asia/Kolkata'`. |

---

## 5. Immediate Action Plan (Before Building Search)

These items must be resolved first to unblock development:

1. **Fix the `registration_certificate` bug** — either add `blank=True, null=True` to the field and create a new migration, or add file upload to the form. This is the highest priority.
2. **Create `doctors/urls.py`** and mount it in `core/urls.py`.
3. **Add `available_days` to `DoctorProfile` model** + migration (needed for doctor cards).
4. **Unify CSS naming** — pick one prefix (`neo-brutal-`) and refactor `index.css`.
5. **Add `.env` support** — move `baseURL` to `VITE_API_BASE_URL` in a `.env` file.
6. **Add 401 interceptor** in `api.js` to handle expired access tokens.

---

## 6. Summary — What the Architecture Looks Like Today

```
                    ┌─────────────────────────────┐
                    │   React 19 + Vite + Router   │
                    │   TailwindCSS (CDN) + Anton   │
                    │   Neo-Brutalist design system │
                    │                              │
                    │  / → LandingPage.jsx         │
                    │  /login → Login.jsx          │
                    │  /register → Register.jsx    │
                    │  /apply-doctor → DocApp.jsx  │
                    └──────────┬───────────────────┘
                               │ Axios (api.js)
                               │ Bearer JWT header
                               │ baseURL: 127.0.0.1:8000
                               ▼
                    ┌─────────────────────────────┐
                    │   Django 5.2 + DRF + JWT    │
                    │                              │
                    │  CORS: localhost:5173, 3000  │
                    │  Auth: JWTAuthentication     │
                    │  Default perm: IsAuthenticated│
                    │                              │
                    │  /api/auth/                  │
                    │    register/patient/ [POST]  │
                    │    register/doctor/  [POST]  │
                    │    login/            [POST]  │
                    │    login/refresh/    [POST]  │
                    │                              │
                    │  /api/doctors/   ← NOT BUILT │
                    └──────────┬───────────────────┘
                               │ Django ORM
                               ▼
                    ┌─────────────────────────────┐
                    │   SQLite (db.sqlite3)        │
                    │                              │
                    │  authentication_user         │
                    │    id, email*, username*     │
                    │    password (PBKDF2 hash)    │
                    │    role (PATIENT/DOCTOR/ADMIN)│
                    │    phone_number, first/last  │
                    │                              │
                    │  doctors_doctorprofile       │
                    │    id, user_id (FK → user)   │
                    │    specialization, exp_years │
                    │    qualification, about_you  │
                    │    clinic_name, clinic_addr  │
                    │    city, profile_image       │
                    │    registration_certificate  │
                    │    is_verified (default=F)   │
                    │    created_at                │
                    └─────────────────────────────┘
```
