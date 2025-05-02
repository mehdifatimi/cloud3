import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  Button, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// Données de test (à remplacer par les données de l'API)
const mockBookings = [
  {
    id: 1,
    roomName: 'Salle de Réunion A',
    date: '2024-04-26',
    startTime: '09:00',
    endTime: '10:30',
    status: 'Confirmée',
    participants: 5
  },
  {
    id: 2,
    roomName: 'Salle de Conférence B',
    date: '2024-04-27',
    startTime: '14:00',
    endTime: '16:00',
    status: 'En attente',
    participants: 8
  }
];

const BookingHistory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [bookings] = useState(mockBookings);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    // TODO: Implémenter la logique d'annulation avec l'API
    toast.success('Réservation annulée avec succès !');
    setOpenCancelDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmée':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'Annulée':
        return 'error';
      default:
        return 'default';
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
          Mes Réservations
        </Typography>

        <TableContainer 
          component={Paper}
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell sx={{ color: 'primary.dark', fontWeight: 600 }}>Salle</TableCell>
                <TableCell sx={{ color: 'primary.dark', fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ color: 'primary.dark', fontWeight: 600 }}>Heure</TableCell>
                <TableCell sx={{ color: 'primary.dark', fontWeight: 600 }}>Participants</TableCell>
                <TableCell sx={{ color: 'primary.dark', fontWeight: 600 }}>Statut</TableCell>
                <TableCell sx={{ color: 'primary.dark', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow 
                  key={booking.id}
                  sx={{ 
                    '&:hover': {
                      bgcolor: 'primary.light',
                      opacity: 0.8
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MeetingRoomIcon sx={{ color: 'primary.main' }} />
                      {booking.roomName}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon sx={{ color: 'primary.main' }} />
                      {new Date(booking.date).toLocaleDateString('fr-FR')}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ color: 'primary.main' }} />
                      {booking.startTime} - {booking.endTime}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon sx={{ color: 'primary.main' }} />
                      {booking.participants}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      sx={{
                        fontWeight: 600,
                        borderRadius: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => {/* TODO: Implémenter l'édition */}}
                        sx={{
                          '&:hover': {
                            bgcolor: 'primary.light',
                            transform: 'scale(1.1)',
                            transition: 'all 0.2s ease'
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleCancelBooking(booking)}
                        sx={{
                          '&:hover': {
                            bgcolor: 'error.light',
                            transform: 'scale(1.1)',
                            transition: 'all 0.2s ease'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog de confirmation d'annulation */}
        <Dialog
          open={openCancelDialog}
          onClose={() => setOpenCancelDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              p: 2
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, color: 'text.primary' }}>
            Confirmer l'annulation
          </DialogTitle>
          <DialogContent>
            <Typography>
              Êtes-vous sûr de vouloir annuler la réservation de la salle {selectedBooking?.roomName} ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOpenCancelDialog(false)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmCancel}
              color="error"
              variant="contained"
              sx={{
                borderRadius: 2,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BookingHistory; 