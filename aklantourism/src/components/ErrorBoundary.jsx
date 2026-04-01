import { Component } from 'react';

/**
 * Error Boundary — catches runtime errors in the component tree
 * so one broken component doesn't crash the entire app.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b1f45',
          color: '#fff',
          textAlign: 'center',
          padding: '40px 20px',
          fontFamily: 'Montserrat, sans-serif',
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Something went wrong</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '32px' }}>
            An unexpected error occurred. Please refresh the page try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#fff',
              color: '#0b1f45',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
