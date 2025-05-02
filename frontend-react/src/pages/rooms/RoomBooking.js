import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import { toast } from 'react-toastify';

// Données de test (à remplacer par les données de l'API)
const mockRoom = {
  id: 1,
  name: 'Salle de Réunion A',
  type: 'Réunion',
  capacity: 10,
  equipment: ['Projecteur', 'Tableau blanc', 'WiFi'],
  image: '/room1.jpg',
  description: 'Salle moderne équipée pour les réunions d\'équipe',
  availability: {
    monday: ['09:00-12:00', '14:00-18:00'],
    tuesday: ['09:00-12:00', '14:00-18:00'],
    wednesday: ['09:00-12:00', '14:00-18:00'],
    thursday: ['09:00-12:00', '14:00-18:00'],
    friday: ['09:00-12:00', '14:00-18:00']
  }
};

const RoomBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [room, setRoom] = useState(mockRoom);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [participants, setParticipants] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');

  const handleBooking = () => {
    // Vérification des champs requis
    if (!selectedDate || !startTime || !endTime || !participants || !meetingTitle) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérification de la validité des horaires
    if (startTime >= endTime) {
      toast.error('L\'heure de fin doit être après l\'heure de début');
      return;
    }

    // Ici, vous ajouterez l'appel à l'API pour créer la réservation
    console.log('Tentative de réservation:', {
      roomId: id,
      date: selectedDate,
      startTime,
      endTime,
      participants,
      meetingTitle,
      meetingDescription
    });

    toast.success('Réservation effectuée avec succès !');
    navigate('/bookings');
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 4,
              color: 'primary.main'
            }}
          >
            Réserver {room.name}
          </Typography>

          <Grid container spacing={4}>
            {/* Informations de la salle */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image}
                  alt={room.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {room.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`Capacité: ${room.capacity} personnes`}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={room.type}
                      color="secondary"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {room.equipment.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        size="small"
                        sx={{ bgcolor: 'grey.100' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Disponibilités */}
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Disponibilités
                </Typography>
                <Divider sx={{ my: 1 }} />
                {Object.entries(room.availability).map(([day, slots]) => (
                  <Box key={day} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                      {day}:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {slots.map((slot, index) => (
                        <Chip
                          key={index}
                          label={slot}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>

            {/* Formulaire de réservation */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Détails de la réservation
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Titre de la réunion"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description (optionnelle)"
                      value={meetingDescription}
                      onChange={(e) => setMeetingDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                      <DatePicker
                        label="Date de la réunion"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        renderInput={(params) => <TextField {...params} fullWidth required />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Nombre de participants</InputLabel>
                      <Select
                        value={participants}
                        label="Nombre de participants"
                        onChange={(e) => setParticipants(e.target.value)}
                      >
                        {[...Array(room.capacity)].map((_, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1} {i + 1 === 1 ? 'personne' : 'personnes'}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                      <TimePicker
                        label="Heure de début"
                        value={startTime}
                        onChange={setStartTime}
                        renderInput={(params) => <TextField {...params} fullWidth required />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                      <TimePicker
                        label="Heure de fin"
                        value={endTime}
                        onChange={setEndTime}
                        renderInput={(params) => <TextField {...params} fullWidth required />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={handleBooking}
                      sx={{ mt: 2 }}
                    >
                      Confirmer la réservation
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default RoomBooking; 