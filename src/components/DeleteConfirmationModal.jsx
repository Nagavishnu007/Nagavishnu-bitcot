import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { colors } from '../theme/theme';

/**
 * Confirmation dialog for contact deletion
 */
const DeleteConfirmationModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle 
        sx={{ 
          backgroundColor: colors.white, 
          color: 'error.main', 
          display: 'flex', 
          alignItems: 'center', 
          pb: 1 
        }}
      >
        <WarningAmberIcon sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Confirm Deletion
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3, pt: 2 }}>
        <Typography variant="body1">
          Are you sure you want to delete this contact? This action cannot be undone.
        </Typography>
      </DialogContent>
      
      <DialogActions 
        sx={{ 
          p: 2, 
          borderTop: `1px solid ${colors.borderGray}`, 
          backgroundColor: colors.cardFooterBg 
        }}
      >
        <Button onClick={handleClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
