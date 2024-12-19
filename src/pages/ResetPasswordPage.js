import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'reset'
  const [formErrors, setFormErrors] = useState({});

  const { requestPasswordReset, resetPassword, loading, error } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const validateRequestForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateResetForm = () => {
    const errors = {};

    if (!resetToken) {
      errors.resetToken = 'Reset token is required';
    }

    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!validateRequestForm()) return;

    try {
      await requestPasswordReset(email);
      setStep('reset');
    } catch (err) {
      console.error('Password reset request error:', err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateResetForm()) return;

    try {
      await resetPassword(email, resetToken, newPassword);
      navigate('/login', { 
        state: { 
          message: 'Password successfully reset. Please log in.' 
        } 
      });
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: theme.background,
    },
    form: {
      backgroundColor: theme.cardBackground || '#16213e',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      width: '400px',
      textAlign: 'center',
    },
    title: {
      color: theme.primary || '#00b3ff',
      marginBottom: '30px',
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '15px 50px 15px 20px',
      borderRadius: '10px',
      border: `1px solid ${theme.primary || '#00b3ff'}`,
      backgroundColor: 'transparent',
      color: theme.text || '#fff',
    },
    inputError: {
      border: '1px solid #ff4136',
    },
    errorText: {
      color: '#ff4136',
      fontSize: '0.8rem',
      textAlign: 'left',
      marginTop: '-15px',
      marginBottom: '10px',
    },
    icon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: theme.primary || '#00b3ff',
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: theme.primary || '#00b3ff',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: loading ? 0.5 : 1,
    },
    globalError: {
      color: '#ff4136',
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: 'rgba(255, 65, 54, 0.1)',
      borderRadius: '5px',
    },
    infoText: {
      color: theme.secondaryText || '#6c757d',
      marginBottom: '20px',
    }
  };

  return (
    <Layout showNavbar={false}>
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>
            {step === 'request' ? 'Reset Password' : 'Set New Password'}
          </h2>

          {error && <p style={styles.globalError}>{error}</p>}

          {step === 'request' ? (
            <form onSubmit={handleRequestReset}>
              <p style={styles.infoText}>
                Enter your email to receive a password reset token
              </p>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(formErrors.email ? styles.inputError : {})
                  }}
                />
                <FaEnvelope style={styles.icon} />
                {formErrors.email && (
                  <p style={styles.errorText}>{formErrors.email}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                style={styles.button}
                disabled={loading}
              >
                {loading ? <FaSpinner /> : 'Request Reset Token'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <p style={styles.infoText}>
                Check your email for the reset token and enter a new password
              </p>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Reset Token"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(formErrors.resetToken ? styles.inputError : {})
                  }}
                />
                {formErrors.resetToken && (
                  <p style={styles.errorText}>{formErrors.resetToken}</p>
                )}
              </div>

              <div style={styles.inputContainer}>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(formErrors.newPassword ? styles.inputError : {})
                  }}
                />
                <FaLock style={styles.icon} />
                {formErrors.newPassword && (
                  <p style={styles.errorText}>{formErrors.newPassword}</p>
                )}
              </div>

              <div style={styles.inputContainer}>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(formErrors.confirmPassword ? styles.inputError : {})
                  }}
                />
                <FaLock style={styles.icon} />
                {formErrors.confirmPassword && (
                  <p style={styles.errorText}>{formErrors.confirmPassword}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                style={styles.button}
                disabled={loading}
              >
                {loading ? <FaSpinner /> : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;