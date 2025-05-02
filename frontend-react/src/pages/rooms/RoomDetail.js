import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import { toast } from 'react-toastify';

// Mock data - Replace with actual API calls
const mockRoom = {
  id: 1,
  name: 'Salle de Réunion A',
  type: 'Réunion',
  capacity: 10,
  equipment: ['Projecteur', 'Tableau blanc', 'WiFi'],
  description: 'Une salle de réunion moderne et bien équipée, idéale pour les réunions d\'équipe et les présentations.',
  image: '/room1.jpg',
  availability: [
    { day: 'Lundi', slots: ['09:00-12:00', '14:00-17:00'] },
    { day: 'Mardi', slots: ['09:00-12:00', '14:00-17:00'] },
    { day: 'Mercredi', slots: ['09:00-12:00', '14:00-17:00'] },
    { day: 'Jeudi', slots: ['09:00-12:00', '14:00-17:00'] },
    { day: 'Vendredi', slots: ['09:00-12:00', '14:00-17:00'] },
  ],
};

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(mockRoom);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    // TODO: Fetch room details from API
    // const fetchRoom = async () => {
    //   try {
    //     const response = await fetch(`/api/rooms/${id}`);
    //     const data = await response.json();
    //     setRoom(data);
    //   } catch (error) {
    //     toast.error('Erreur lors du chargement des détails de la salle');
    //   }
    // };
    // fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    try {
      // TODO: Implement actual booking logic
      console.log('Booking attempt:', {
        roomId: id,
        date: selectedDate,
        startTime,
        endTime,
        participants,
      });
      toast.success('Réservation effectuée avec succès!');
      navigate('/bookings');
    } catch (error) {
      toast.error('Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Room Information */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={room.image}
                alt={room.name}
              />
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                  {room.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={room.type}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`${room.capacity} personnes`}
                    color="secondary"
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  {room.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Équipements
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {room.equipment.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Booking Form */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Réserver cette salle
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                  <DatePicker
                    label="Date de réservation"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ mb: 2 }} />
                    )}
                  />
                  <TimePicker
                    label="Heure de début"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ mb: 2 }} />
                    )}
                  />
                  <TimePicker
                    label="Heure de fin"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ mb: 2 }} />
                    )}
                  />
                </LocalizationProvider>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Nombre de participants</InputLabel>
                  <Select
                    value={participants}
                    label="Nombre de participants"
                    onChange={(e) => setParticipants(e.target.value)}
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleBooking}
                  disabled={!selectedDate || !startTime || !endTime}
                >
                  Réserver
                </Button>
              </Box>
            </Paper>

            {/* Availability */}
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Disponibilités
              </Typography>
              {room.availability.map((day, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {day.day}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {day.slots.map((slot, slotIndex) => (
                      <Chip
                        key={slotIndex}
                        label={slot}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RoomDetail; 