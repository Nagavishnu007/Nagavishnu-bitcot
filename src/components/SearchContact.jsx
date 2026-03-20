import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { colors } from '../theme/theme';

/**
 * Search contact input component with custom styling
 * @param {string} searchTerm - current search value
 * @param {Function} onSearchChange - handler for search input updates
 */
const SearchContact = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search by name or phone number..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      autoComplete="new-password"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
        sx: { 
          borderRadius: '25px', 
          backgroundColor: colors.lightGray, 
          boxShadow: `0 2px 10px ${colors.shadowLight}` 
        }
      }}
      sx={{ 
        marginBottom: 3,
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: colors.primary,
          },
        }
      }}
    />
  );
};

export default SearchContact;
