import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

/**
 * Modal for creating and updating contacts
 */
const AddEditContactModal = ({ open, handleClose, contact, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens or contact changes
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        mobile: contact.mobile || ''
      });
    } else {
      setFormData({ name: '', email: '', mobile: '' });
    }
    setErrors({});
  }, [contact, open]);

  // Helper to validate a single field in real-time
  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'name') {
      if (!value.trim()) error = 'Name is required';
    } else if (name === 'mobile') {
      if (!value) {
        error = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(value)) {
        error = 'Mobile number must be 10 digits';
      }
    } else if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/^[$A-Z_a-z0-9][\w\.-]*@[\w\.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        error = 'Email address is invalid';
      }
    }
    
    setErrors(prev => ({ 
      ...prev, 
      [name]: error 
    }));
  };

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Only show real-time validation if an error already exists for that field
    // or if the user is typing (to clear "required" errors immediately)
    validateField(name, value);
  };

  /**
   * Simple form validation for entire form (used on submit)
   * @returns {boolean} true if valid
   */
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.mobile) {
      tempErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      tempErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/^[$A-Z_a-z0-9][\w\.-]*@[\w\.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        ...formData,
        id: contact ? contact.id : Date.now()
      });
      toast.success(`Contact successfully ${contact ? 'updated' : 'added'}!`);
      handleClose();
    } else {
      toast.error('Please fix the validation errors.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {contact ? 'Edit Contact' : 'Add Contact'}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <input type="text" style={{ display: 'none' }} autoComplete="off" />
        <input type="email" style={{ display: 'none' }} autoComplete="off" />

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              autoComplete="none"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              variant="outlined"
              autoComplete="none"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ px: 4 }}>
          {contact ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditContactModal;
