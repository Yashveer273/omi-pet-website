import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_KEY = 'omi-pet-dashboard-auth';
const STATIC_PASSWORD = 'santosh';

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.trim().toLowerCase() === STATIC_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      console.info('[Login] Dashboard access granted for static password.');
      navigate('/dashboard', { replace: true });
      return;
    }

    setError('Incorrect password. Use the static passcode: santosh');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>Protected Admin Access</p>
        <h1 style={styles.title}>Sign in to the dashboard</h1>
        <p style={styles.subtitle}>Use the static password <strong>santosh</strong> to unlock the workspace and keep this session saved in your browser.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your static passcode"
            style={styles.input}
          />

          {error ? <p style={styles.error}>{error}</p> : null}

          <button type="submit" style={styles.button}>Open Dashboard</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)',
    padding: '24px'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.28)',
    padding: '28px'
  },
  eyebrow: {
    margin: 0,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#f59e0b',
    fontWeight: '700'
  },
  title: {
    margin: '8px 0 10px',
    fontSize: '28px',
    color: '#0f172a'
  },
  subtitle: {
    margin: '0 0 18px',
    color: '#475569',
    lineHeight: 1.5,
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontSize: '13px',
    color: '#334155',
    fontWeight: '600'
  },
  input: {
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  button: {
    marginTop: '8px',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    color: '#0f172a',
    fontWeight: '700',
    cursor: 'pointer'
  },
  error: {
    margin: 0,
    color: '#dc2626',
    fontSize: '13px'
  }
};
