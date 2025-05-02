import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <MeetingRoomIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
      title: 'Réservation Simple',
      description: 'Réservez votre salle en quelques clics avec notre interface intuitive et conviviale.'
    },
    {
      icon: <CalendarMonthIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
      title: 'Gestion Flexible',
      description: 'Modifiez ou annulez vos réservations à tout moment selon vos besoins.'
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
      title: 'Notifications en Temps Réel',
      description: 'Recevez des alertes instantanées pour vos confirmations et modifications de réservation.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
      title: 'Gestion des Équipes',
      description: 'Organisez facilement les réunions de votre équipe avec notre système de réservation collaboratif.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
      title: 'Sécurité Garantie',
      description: 'Vos données sont protégées avec les dernières technologies de sécurité.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />,
      title: 'Performance Optimale',
      description: 'Une expérience utilisateur fluide et rapide pour une gestion efficace de vos réservations.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)',
          color: 'white',
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/hero-pattern.png")',
            opacity: 0.1,
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  position: 'relative',
                  zIndex: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Réservez votre salle de réunion en quelques clics
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  position: 'relative',
                  zIndex: 2,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Simplifiez la gestion de vos espaces de réunion avec notre plateforme intuitive et efficace.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/rooms')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 2,
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Voir les salles disponibles
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-meeting-room.jpg"
                alt="Salle de réunion moderne"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 700,
              color: 'text.primary',
              position: 'relative',
              fontSize: { xs: '2rem', md: '2.5rem' },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                bgcolor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            Pourquoi choisir RoomReserve ?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    textAlign: 'center',
                    p: 4,
                    '&:last-child': {
                      pb: 4
                    }
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      sx={{
                        lineHeight: 1.6,
                        color: 'text.secondary'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)',
          color: 'white',
          py: { xs: 6, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/cta-pattern.png")',
            opacity: 0.1,
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 3,
              position: 'relative',
              zIndex: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Prêt à simplifier vos réservations ?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              position: 'relative',
              zIndex: 2,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            Rejoignez-nous dès maintenant et découvrez une nouvelle façon de gérer vos espaces de réunion.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
              position: 'relative',
              zIndex: 2,
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Commencer maintenant
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 