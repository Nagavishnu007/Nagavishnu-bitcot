import { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  AppBar,
  Toolbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContactsIcon from '@mui/icons-material/Contacts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonLoader, { SkeletonCard } from '../components/SkeletonLoader';

// Lazy load components for better performance
const ContactCard = lazy(() => import('../components/ContactCard'));
const AddEditContactModal = lazy(() => import('../components/AddEditContactModal'));
const ViewContactModal = lazy(() => import('../components/ViewContactModal'));
const SearchContact = lazy(() => import('../components/SearchContact'));
const DeleteConfirmationModal = lazy(() => import('../components/DeleteConfirmationModal'));

const ContactScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal visibility and selection state
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json');
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch initial contacts from API.", { toastId: 'fetch-error' });
      setLoading(false);
    }
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
  };

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(term) ||
      contact.mobile?.includes(term)
    );
  });

  // Action handlers
  const handleOpenAddModal = () => {
    setSelectedContact(null);
    setAddEditModalOpen(true);
  };

  const handleOpenEditModal = (contact) => {
    setSelectedContact(contact);
    setAddEditModalOpen(true);
  };

  const handleOpenViewModal = (contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  const handleDeleteContact = (id) => {
    setContactToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteContact = () => {
    if (contactToDelete) {
      const updatedContacts = contacts.filter(c => c.id !== contactToDelete);
      setContacts(updatedContacts);
      toast.info("Contact deleted successfully!");
    }
    setDeleteConfirmOpen(false);
    setContactToDelete(null);
  };

  const handleSaveContact = (contactData) => {
    if (selectedContact) {
      // Update existing contact
      setContacts(contacts.map(c => c.id === contactData.id ? contactData : c));
    } else {
      // Add new contact to the top
      setContacts([contactData, ...contacts]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <ContactsIcon sx={{ mr: 2 }} fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Contact Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5, flexGrow: 1 }}>
        {/* Header section with Title and Add Button */}
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }} 
          gap={2} 
          mb={4}
        >
          <Typography variant="h4" fontWeight="bold" color="textPrimary" sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
            All Contacts
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            sx={{ borderRadius: '25px', px: 3, py: 1, width: { xs: '100%', sm: 'auto' } }}
            size="large"
          >
            Add Contact
          </Button>
        </Box>

        {/* Search input field */}
        <Suspense fallback={null}>
          <SearchContact searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </Suspense>

        {loading ? (
          <SkeletonLoader />
        ) : filteredContacts.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" my={10} flexDirection="column">
            <Typography variant="h6" color="textSecondary" mb={2}>
              No contacts found
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleOpenAddModal}>
              Add New Contact
            </Button>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {filteredContacts.map(contact => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={contact.id}
                sx={{ display: 'flex' }}
              >
                <Suspense fallback={<SkeletonCard />}>
                  <ContactCard
                    contact={contact}
                    onView={handleOpenViewModal}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteContact}
                  />
                </Suspense>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Modals for Add, Edit, View, and Delete actions */}
        <Suspense fallback={null}>
          <AddEditContactModal
            open={addEditModalOpen}
            handleClose={() => setAddEditModalOpen(false)}
            contact={selectedContact}
            onSave={handleSaveContact}
          />

          <ViewContactModal
            open={viewModalOpen}
            handleClose={() => setViewModalOpen(false)}
            contact={selectedContact}
          />

          <DeleteConfirmationModal
            open={deleteConfirmOpen}
            handleClose={() => setDeleteConfirmOpen(false)}
            handleConfirm={confirmDeleteContact}
          />
        </Suspense>
      </Container>

      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
    </Box>
  );
};

export default ContactScreen;
