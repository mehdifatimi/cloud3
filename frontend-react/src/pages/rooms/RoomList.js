import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import ComputerIcon from '@mui/icons-material/Computer';
import VideocamIcon from '@mui/icons-material/Videocam';
import WifiIcon from '@mui/icons-material/Wifi';
import { useNavigate } from 'react-router-dom';

// Données de test (à remplacer par les données de l'API)
const mockRooms = [
  {
    id: 1,
    name: 'Salle de Réunion A',
    type: 'Réunion',
    capacity: 10,
    equipment: ['Projecteur', 'WiFi', 'Ordinateur'],
    description: 'Salle moderne équipée pour les réunions d\'équipe',
    image: '/images/room-1.jpg'
  },
  {
    id: 2,
    name: 'Salle de Conférence B',
    type: 'Conférence',
    capacity: 30,
    equipment: ['Projecteur', 'WiFi', 'Ordinateur', 'Microphone'],
    description: 'Espace idéal pour les conférences et présentations',
    image: '/images/room-2.jpg'
  }
];

const RoomList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [rooms] = useState(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [roomType, setRoomType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !roomType || room.type === roomType;
    return matchesSearch && matchesType;
  });

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* En-tête */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2
            }}
          >
            Nos Salles de Réunion
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Découvrez nos espaces de réunion modernes et bien équipés, conçus pour répondre à tous vos besoins professionnels.
          </Typography>
        </Box>

        {/* Barre de recherche et filtres */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 6, 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Rechercher une salle"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Type de salle</InputLabel>
                <Select
                  value={roomType}
                  onChange={handleRoomTypeChange}
                  label="Type de salle"
                  sx={{
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="">Tous les types</MenuItem>
                  <MenuItem value="Réunion">Réunion</MenuItem>
                  <MenuItem value="Conférence">Conférence</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                <DatePicker
                  label="Date de réservation"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Paper>

        {/* Liste des salles */}
        <Grid container spacing={4}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
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
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image}
                  alt={room.name}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 2
                    }}
                  >
                    {room.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    {room.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MeetingRoomIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {room.type}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PeopleIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Capacité : {room.capacity} personnes
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {room.equipment.map((item, index) => (
                      <Chip
                        key={index}
                        icon={
                          item === 'Projecteur' ? <VideocamIcon /> :
                          item === 'WiFi' ? <WifiIcon /> :
                          item === 'Ordinateur' ? <ComputerIcon /> :
                          <InfoIcon />
                        }
                        label={item}
                        size="small"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.dark',
                          '& .MuiChip-icon': {
                            color: 'primary.main'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/rooms/${room.id}`)}
                    sx={{
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    Voir les détails
                  </Button>
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={() => navigate(`/rooms/${room.id}/book`)}
                    sx={{
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    Réserver
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomList; 