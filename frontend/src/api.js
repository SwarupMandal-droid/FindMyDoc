import axios from 'axios';

// Base URL is read from the .env file (VITE_API_BASE_URL).
// Falls back to localhost for developers who haven't created .env yet.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: BASE_URL,
});

// ─── REQUEST INTERCEPTOR ─────────────────────────────────────────────────────
// Attaches the JWT access token to every outgoing request automatically.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ────────────────────────────────────────────────────
// Handles 401 Unauthorized responses:
//   1. Tries to get a new access token using the stored refresh token.
//   2. If successful, retries the original request transparently.
//   3. If the refresh also fails (refresh token expired/invalid),
//      clears all auth data and redirects the user to /login.
api.interceptors.response.use(
    (response) => response,   // Pass-through for successful responses
    async (error) => {
        const originalRequest = error.config;

        const is401 = error.response?.status === 401;
        const isNotRetry = !originalRequest._retry;
        const isNotRefreshEndpoint = !originalRequest.url?.includes('/api/auth/login/refresh/');

        if (is401 && isNotRetry && isNotRefreshEndpoint) {
            originalRequest._retry = true;                          // Guard against infinite loops
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                try {
                    // Use a plain axios call (not `api`) to avoid the request interceptor
                    // re-attaching the expired access token to the refresh call.
                    const { data } = await axios.post(
                        `${BASE_URL}/api/auth/login/refresh/`,
                        { refresh: refreshToken }
                    );

                    // Save the new access token
                    localStorage.setItem('access', data.access);

                    // Retry the original request with the fresh token
                    originalRequest.headers.Authorization = `Bearer ${data.access}`;
                    return api(originalRequest);

                } catch (refreshError) {
                    // Refresh token is invalid or expired — force a clean logout
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token stored at all — send to login
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
