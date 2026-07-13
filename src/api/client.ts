import axios from 'axios'

// In dev, leave VITE_API_URL empty — Vite proxy forwards /api to Symfony.
// In production, set VITE_API_URL to the real backend URL.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
