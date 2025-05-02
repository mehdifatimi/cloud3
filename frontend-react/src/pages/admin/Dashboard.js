import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

// Mock data - Replace with actual API calls
const mockRooms = [
  {
    id: 1,
    name: 'Salle de Réunion A',
    type: 'Réunion',
    capacity: 10,
    status: 'disponible',
  },
  {
    id: 2,
    name: 'Salle de Conférence B',
    type: 'Conférence',
    capacity: 20,
    status: 'occupée',
  },
];

const mockBookings = [
  {
    id: 1,
    roomName: 'Salle de Réunion A',
    userName: 'John Doe',
    date: '2024-03-15',
    startTime: '09:00',
    endTime: '11:00',
    status: 'confirmée',
  },
  {
    id: 2,
    roomName: 'Salle de Conférence B',
    userName: 'Jane Smith',
    date: '2024-03-16',
    startTime: '14:00',
    endTime: '16:00',
    status: 'en attente',
  },
];

const AdminDashboard = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [bookings, setBookings] = useState(mockBookings);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: '',
    capacity: '',
  });

  useEffect(() => {
    // TODO: Fetch rooms and bookings from API
    // const fetchData = async () => {
    //   try {
    //     const [roomsResponse, bookingsResponse] = await Promise.all([
    //       fetch('/api/admin/rooms'),
    //       fetch('/api/admin/bookings'),
    //     ]);
    //     const roomsData = await roomsResponse.json();
    //     const bookingsData = await bookingsResponse.json();
    //     setRooms(roomsData);
    //     setBookings(bookingsData);
    //   } catch (error) {
    //     toast.error('Erreur lors du chargement des données');
    //   }
    // };
    // fetchData();
  }, []);

  const handleOpenRoomDialog = (room = null) => {
    if (room) {
      setSelectedRoom(room);
      setNewRoom(room);
    } else {
      setSelectedRoom(null);
      setNewRoom({
        name: '',
        type: '',
        capacity: '',
      });
    }
    setOpenRoomDialog(true);
  };

  const handleCloseRoomDialog = () => {
    setOpenRoomDialog(false);
    setSelectedRoom(null);
    setNewRoom({
      name: '',
      type: '',
      capacity: '',
    });
  };

  const handleSaveRoom = async () => {
    try {
      // TODO: Implement actual save logic
      console.log('Saving room:', newRoom);
      toast.success(selectedRoom ? 'Salle mise à jour' : 'Nouvelle salle ajoutée');
      handleCloseRoomDialog();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      // TODO: Implement actual delete logic
      console.log('Deleting room:', roomId);
      toast.success('Salle supprimée');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible':
        return 'success';
      case 'occupée':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Administrateur
        </Typography>

        <Grid container spacing={4}>
          {/* Rooms Management */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Gestion des Salles</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenRoomDialog()}
                >
                  Ajouter une salle
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Capacité</TableCell>
                      <TableCell>Statut</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.name}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>
                          <Chip
                            label={room.status}
                            color={getStatusColor(room.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenRoomDialog(room)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteRoom(room.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Bookings Overview */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Aperçu des Réservations
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Salle</TableCell>
                      <TableCell>Utilisateur</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Heure</TableCell>
                      <TableCell>Statut</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.roomName}</TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          {booking.startTime} - {booking.endTime}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={booking.status}
                            color={getStatusColor(booking.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Room Dialog */}
        <Dialog open={openRoomDialog} onClose={handleCloseRoomDialog}>
          <DialogTitle>
            {selectedRoom ? 'Modifier la salle' : 'Ajouter une nouvelle salle'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Nom de la salle"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type de salle</InputLabel>
                <Select
                  value={newRoom.type}
                  label="Type de salle"
                  onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                >
                  <MenuItem value="Réunion">Réunion</MenuItem>
                  <MenuItem value="Conférence">Conférence</MenuItem>
                  <MenuItem value="Formation">Formation</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Capacité"
                type="number"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRoomDialog}>Annuler</Button>
            <Button onClick={handleSaveRoom} variant="contained">
              {selectedRoom ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 