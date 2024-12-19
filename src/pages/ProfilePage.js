import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaLock } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const { user, updateProfile, changePassword, loading, error } = useAuth();
  const { theme } = useTheme();
  const Navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }
  }, [user]);

  const validateProfileForm = () => {
    const errors = {};

    if (!profileData.username) {
      errors.username = 'Username is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(profileData.email)) {
      errors.email = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }

    if (!passwordData.confirmNewPassword) {
      errors.confirmNewPassword = 'Please confirm new password';
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      await changePassword(
        passwordData.currentPassword, 
        passwordData.newPassword
      );
      // Reset password fields after successful change
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (err) {
      console.error('Password change error:', err);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: theme.cardBackground || '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
      color: theme.primary || '#00b3ff',
      borderBottom: `2px solid ${theme.primary || '#00b3ff'}`,
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: `1px solid ${theme.border || '#ced4da'}`,
      borderRadius: '6px',
      backgroundColor: theme.inputBackground || '#fff',
    },
    inputError: {
      border: '1px solid #dc3545',
    },
    errorText: {
      color: '#dc3545',
      fontSize: '0.8rem',
      marginTop: '-10px',
      marginBottom: '10px',
    },
    button: {
      backgroundColor: theme.primary || '#00b3ff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    globalError: {
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      color: '#dc3545',
      padding: '10px',
      borderRadius: '6px',
      marginBottom: '20px',
    }
  };

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <Layout showNavbar={true}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>
          <FaUser style={{ marginRight: '10px' }} />
          Profile Information
        </h2>

        {error && <div style={styles.globalError}>{error}</div>}

        <form onSubmit={handleProfileUpdate}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
              disabled={!isEditing}
              style={{
                ...styles.input,
                ...(formErrors.username ? styles.inputError : {})
              }}
            />
            {formErrors.username && (
              <p style={styles.errorText}>{formErrors.username}</p>
            )}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!isEditing}
              style={{
                ...styles.input,
                ...(formErrors.email ? styles.inputError : {})
              }}
            />
            {formErrors.email && (
              <p style={styles.errorText}>{formErrors.email}</p>
            )}
          </div>

          <div>
            <label>First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              disabled={!isEditing}
              style={styles.input}
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              disabled={!isEditing}
              style={styles.input}
            />
          </div>

          {!isEditing ? (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)}
              style={styles.button}
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <button 
              type="submit" 
              style={styles.button}
            >
              <FaSave /> Save Changes
            </button>
          )}
        </form>

        <h2 style={{...styles.sectionTitle, marginTop: '30px'}}>
          <FaLock style={{ marginRight: '10px' }} />
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange}>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              style={{
                ...styles.input,
                ...(formErrors.currentPassword ? styles.inputError : {})
              }}
            />
            {formErrors.currentPassword && (
              <p style={styles.errorText}>{formErrors.currentPassword}</p>
            )}
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              style={{
                ...styles.input,
                ...(formErrors.newPassword ? styles.inputError : {})
              }}
            />
            {formErrors.newPassword && (
              <p style={styles.errorText}>{formErrors.newPassword}</p>
            )}
          </div>

          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmNewPassword: e.target.value})}
              style={{
                ...styles.input,
                ...(formErrors.confirmNewPassword ? styles.inputError : {})
              }}
            />
            {formErrors.confirmNewPassword && (
              <p style={styles.errorText}>{formErrors.confirmNewPassword}</p>
            )}
          </div>

          <button 
            type="submit" 
            style={styles.button}
          >
            <FaLock /> Change Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;