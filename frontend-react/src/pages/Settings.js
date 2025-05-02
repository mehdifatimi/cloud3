import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Switch, 
  FormControlLabel,
  Divider,
  useTheme,
  useMediaQuery,
  Grid,
  Avatar,
  IconButton
} from '@mui/material';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Settings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    language: 'fr',
    notifications: true,
    emailNotifications: true,
    darkMode: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implémenter la logique de sauvegarde avec l'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Paramètres mis à jour avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des paramètres');
    }
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Paramètres
        </Typography>

        <Grid container spacing={4}>
          {/* Profil */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: '100%'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src="/images/profile-avatar.jpg"
                    sx={{ 
                      width: 120, 
                      height: 120,
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.main'
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {settings.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {settings.email}
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Nom"
                name="name"
                value={settings.name}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleSubmit}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                Mettre à jour le profil
              </Button>
            </Paper>
          </Grid>

          {/* Préférences */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <NotificationsIcon sx={{ color: 'primary.main' }} />
                Notifications
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications}
                    onChange={handleChange}
                    name="notifications"
                    color="primary"
                  />
                }
                label="Activer les notifications"
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    name="emailNotifications"
                    color="primary"
                  />
                }
                label="Notifications par email"
                sx={{ mb: 4 }}
              />

              <Divider sx={{ my: 4 }} />

              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <LanguageIcon sx={{ color: 'primary.main' }} />
                Langue
              </Typography>

              <TextField
                fullWidth
                select
                label="Langue"
                name="language"
                value={settings.language}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 4 }}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </TextField>

              <Divider sx={{ my: 4 }} />

              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <SecurityIcon sx={{ color: 'primary.main' }} />
                Sécurité
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  mb: 2,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    borderColor: 'primary.main'
                  }
                }}
              >
                Changer le mot de passe
              </Button>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'error.light',
                    borderColor: 'error.main'
                  }
                }}
              >
                Supprimer le compte
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings; 