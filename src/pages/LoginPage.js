import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Simulated login logic
        if (email === 'user@example.com' && password === 'password') {
          login({ 
            email, 
            username: 'John Doe', 
            avatar: 'https://via.placeholder.com/150' 
          });
          navigate('/dashboard');
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Simulated registration logic
        if (username && email && password) {
          register({ 
            email, 
            username, 
            avatar: 'https://via.placeholder.com/150' 
          });
          navigate('/dashboard');
        } else {
          setError('Please fill in all fields');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #2b2d42, #8d99ae)',
    },
    form: {
      backgroundColor: '#16213e',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      width: '400px',
      textAlign: 'center',
    },
    title: {
      color: '#00b3ff',
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
      border: '1px solid #00b3ff',
      backgroundColor: 'transparent',
      color: '#fff',
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
    error: {
      color: '#ff4136',
      marginBottom: '15px',
    }
  };

  return (
    <Layout showNavbar={true}>
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>
          
          {error && <p style={styles.error}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
                <FaUser style={styles.icon} />
              </div>
            )}
            
            <div style={styles.inputContainer}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
              <FaEnvelope style={styles.icon} />
            </div>
            
            <div style={styles.inputContainer}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <FaLock style={styles.icon} />
            </div>
            
            <button type="submit" style={styles.button}>
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          
          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link 
              to="#" 
              onClick={() => setIsLogin(!isLogin)}
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