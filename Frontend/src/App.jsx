import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './routes/AppRouter';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              style: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
            },
            error: {
              style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
