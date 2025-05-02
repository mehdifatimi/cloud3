import React, { useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // TODO: Implémenter la logique de déconnexion avec l'API
        // Pour l'instant, on simule un délai de 2 secondes
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Supprimer les données de session
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        toast.success('Déconnexion réussie !');
        navigate('/');
      } catch (error) {
        toast.error('Erreur lors de la déconnexion');
        navigate('/');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/images/logout-pattern.png")',
          opacity: 0.1,
          zIndex: 1,
        }
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <LogoutIcon 
            sx={{ 
              fontSize: 60, 
              color: 'primary.main',
              mb: 3,
              animation: 'spin 2s linear infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.125rem' }
            }}
          >
            Déconnexion en cours...
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.8,
              mb: 4
            }}
          >
            Veuillez patienter pendant que nous vous déconnectons.
          </Typography>
          <CircularProgress 
            size={40} 
            sx={{ 
              color: 'primary.main',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': {
                  opacity: 1,
                },
                '50%': {
                  opacity: 0.5,
                },
                '100%': {
                  opacity: 1,
                },
              },
            }} 
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Logout; 