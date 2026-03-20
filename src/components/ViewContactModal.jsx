import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Avatar,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { colors } from '../theme/theme';

/**
 * Modal to view contact details
 */
const ViewContactModal = ({ open, handleClose, contact }) => {
  // Defensive check
  if (!contact) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {/* Modal Header */}
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          pb: 1, 
          backgroundColor: colors.modalHeaderBg 
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          Contact Details
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      {/* Detail Content */}
      <DialogContent sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.light', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {contact.name || 'N/A'}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Contact info rows */}
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <EmailIcon color="action" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="caption" color="textSecondary">Email Address</Typography>
            <Typography variant="body1">{contact.email || 'N/A'}</Typography>
          </Box>
        </Box>
        
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <PhoneIcon color="action" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="caption" color="textSecondary">Mobile Number</Typography>
            <Typography variant="body1">{contact.mobile || 'N/A'}</Typography>
          </Box>
        </Box>
      </DialogContent>
      
      {/* Actions footer */}
      <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
        <Button onClick={handleClose} color="primary" variant="outlined" sx={{ px: 4 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewContactModal;
