import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Salles', path: '/rooms' },
    { label: 'Mes Réservations', path: '/bookings' },
  ];

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo et titre */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <MeetingRoomIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          </IconButton>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 700,
              display: { xs: 'none', md: 'block' }
            }}
          >
            RoomReserve
          </Typography>
        </Box>

        {/* Navigation - Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                fontWeight: isActive(item.path) ? 600 : 400,
                position: 'relative',
                '&::after': isActive(item.path) ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  bgcolor: 'primary.main',
                  borderRadius: '2px'
                } : {},
                '&:hover': {
                  color: 'primary.main',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    bgcolor: 'primary.main',
                    borderRadius: '2px',
                    opacity: 0.5
                  }
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Boutons d'action */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/login')}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }
            }}
          >
            Admin
          </Button>

          {/* Menu mobile */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Menu utilisateur */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
              Mon Profil
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
              Paramètres
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/logout'); }}>
              Déconnexion
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <Box
          sx={{
            display: { md: 'none' },
            p: 2,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              fullWidth
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                fontWeight: isActive(item.path) ? 600 : 400,
                mb: 1,
                justifyContent: 'flex-start',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.light',
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar; 