import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import { FaUser, FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Registration-specific validations
    if (!isLogin) {
      // Username validation
      if (!username) {
        errors.username = 'Username is required';
      } else if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      // Confirm password validation
      if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      // Optional first and last name validations
      if (firstName && firstName.length < 2) {
        errors.firstName = 'First name must be at least 2 characters';
      }

      if (lastName && lastName.length < 2) {
        errors.lastName = 'Last name must be at least 2 characters';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        // Login
        await login(email, password);
        navigate('/'); // Navigate to home page with products
      } else {
        // Register
        await register({
          username,
          email,
          password,
          firstName, 
          lastName
        });
        navigate('/'); // Navigate to home page with products
      }
    } catch (err) {
      // Error handling is now managed by AuthContext
      console.error('Authentication error:', err);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #2b2d42, #8d99ae)',
      padding: '20px',
    },
    form: {
      backgroundColor: '#16213e',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '450px',
      textAlign: 'center',
    },
    title: {
      color: '#00b3ff',
      marginBottom: '30px',
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '20px',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #00b3ff',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: '#fff',
      boxSizing: 'border-box',
    },
    inputError: {
      border: '1px solid #ff4136',
    },
    errorText: {
      color: '#ff4136',
      fontSize: '0.8rem',
      textAlign: 'left',
      marginTop: '5px',
      marginBottom: '-15px',
    },
    icon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#00b3ff',
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#00b3ff',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: loading ? 0.5 : 1,
      marginTop: '20px',
    },
    toggleText: {
      marginTop: '20px',
      color: '#fff',
    },
    link: {
      color: '#00b3ff',
      textDecoration: 'none',
      marginLeft: '5px',
    },
    globalError: {
      color: '#ff4136',
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: 'rgba(255, 65, 54, 0.1)',
      borderRadius: '5px',
    },
    nameRow: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
    }
  };

  return (
    <Layout showNavbar={true}>
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>
          
          {error && <p style={styles.globalError}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      ...styles.input,
                      ...(formErrors.username ? styles.inputError : {})
                    }}
                  />
                  <FaUser style={styles.icon} />
                  {formErrors.username && (
                    <p style={styles.errorText}>{formErrors.username}</p>
                  )}
                </div>

                <div style={styles.nameRow}>
                  <div style={{...styles.inputContainer, flex: 1}}>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{
                        ...styles.input,
                        ...(formErrors.firstName ? styles.inputError : {})
                      }}
                    />
                    {formErrors.firstName && (
                      <p style={styles.errorText}>{formErrors.firstName}</p>
                    )}
                  </div>
                  <div style={{...styles.inputContainer, flex: 1}}>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        ...styles.input,
                        ...(formErrors.lastName ? styles.inputError : {})
                      }}
                    />
                    {formErrors.lastName && (
                      <p style={styles.errorText}>{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
              </>
            )}
            
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
            
            <div style={styles.inputContainer}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  ...(formErrors.password ? styles.inputError : {})
                }}
              />
              <FaLock style={styles.icon} />
              {formErrors.password && (
                <p style={styles.errorText}>{formErrors.password}</p>
              )}
            </div>
            
            {!isLogin && (
              <div style={styles.inputContainer}>
                <input
                  type="password"
                  placeholder="Confirm Password"
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
            )}
            
            <button 
              type="submit" 
              style={styles.button}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                isLogin ? 'Login' : 'Register'
              )}
            </button>
          </form>
          
          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link 
              to="#" 
              onClick={() => {
                setIsLogin(!isLogin);
                // Reset form and errors when switching modes
                setFormErrors({});
                setEmail('');
                setPassword('');
                setUsername('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
              }}
              style={styles.link}
            >
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;