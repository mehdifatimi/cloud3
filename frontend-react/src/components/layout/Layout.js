import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // État de connexion initialisé depuis le localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    // Mettre à jour l'état quand le localStorage change
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleAdminLogin = () => {
    handleClose();
    navigate('/admin/login');
  };

  const handleRegister = () => {
    handleClose();
    navigate('/register');
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  const menuItems = [
    { text: 'Accueil', path: '/' },
    ...(isAdmin ? [
      { text: 'Tableau de bord', path: '/admin' }
    ] : [
      { text: 'Salles', path: '/rooms' },
      ...(isLoggedIn ? [{ text: 'Mes Réservations', path: '/bookings' }] : [])
    ])
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text} 
          component={Link} 
          to={item.path}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold'
              }}
            >
              RoomReserve
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={Link}
                    to={item.path}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
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
              {!isLoggedIn && !isAdmin ? (
                <>
                  <MenuItem onClick={handleLogin}>Connexion</MenuItem>
                  <MenuItem onClick={handleRegister}>Inscription</MenuItem>
                  <MenuItem onClick={handleAdminLogin}>Espace Admin</MenuItem>
                </>
              ) : isAdmin ? (
                <>
                  <MenuItem onClick={() => { handleClose(); navigate('/admin'); }}>
                    Tableau de bord
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                    Mon Profil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                </>
              )}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} RoomReserve - Tous droits réservés
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 