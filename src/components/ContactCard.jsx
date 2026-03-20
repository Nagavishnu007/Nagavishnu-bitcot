import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import VisibilityIcon from '@mui/icons-material/VisibilityRounded';
import EmailIcon from '@mui/icons-material/AlternateEmailRounded';
import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import { colors } from '../theme/theme';

const getGradient = (name) => {
  const charCode = name ? name.charCodeAt(0) : 0;
  return colors.gradients[charCode % colors.gradients.length];
};

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const coverGradient = getGradient(contact.name);

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        border: `1px solid ${colors.borderGray}`,
        boxShadow: colors.cardShadow,
        background: colors.cardBg,
        overflow: 'hidden',

        display: 'flex',
        flexDirection: 'column',
        ml: { xs: 10, md: 0 }, transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: colors.cardShadowHover,
          '& .avatar-letter': {
            transform: 'scale(1.1) rotate(5deg)'
          }
        }
      }}
    >
      {/* Visual Header with Gradient */}
      <Box sx={{ height: '90px', width: '100%', background: coverGradient, flexShrink: 0 }} />

      {/* Main Content Area */}
      <CardContent
        sx={{
          pt: 0,
          pb: 2,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Avatar
          className="avatar-letter"
          sx={{
            bgcolor: colors.white,
            color: colors.avatarText,
            width: 72,
            height: 72,
            border: `4px solid ${colors.white}`,
            boxShadow: colors.avatarShadow,
            fontSize: '1.75rem',
            fontWeight: 'bold',
            mt: '-36px',
            mb: 1,
            flexShrink: 0,
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {contact.name?.charAt(0).toUpperCase() || '?'}
        </Avatar>

        <Typography
          variant="h5"
          fontWeight="800"
          noWrap
          sx={{
            width: '100%',
            mb: 0.5,
            color: colors.cardText,
            letterSpacing: '-0.5px',
            flexShrink: 0,
          }}
        >
          {contact.name || 'Unknown Contact'}
        </Typography>

        {/* Contact info rows (Phone and Email) */}
        <Box display="flex" alignItems="center" mt={1.5} mb={1.5} sx={{ flexShrink: 0 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: colors.phoneBadgeBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              flexShrink: 0,
            }}
          >
            <PhoneIcon sx={{ fontSize: '1.1rem', color: colors.primary }} />
          </Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: colors.cardSubText, fontSize: '0.9rem' }}
            noWrap
          >
            {contact.mobile || 'No Number'}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" sx={{ width: '100%', flexShrink: 0 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: colors.emailBadgeBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              flexShrink: 0,
            }}
          >
            <EmailIcon sx={{ fontSize: '1.1rem', color: colors.secondary }} />
          </Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: colors.cardSubText, fontSize: '0.9rem', flex: 1, minWidth: 0 }}
            noWrap
          >
            {contact.email || 'No Email'}
          </Typography>
        </Box>
      </CardContent>

      <Divider sx={{ mx: 3, borderStyle: 'dashed', borderColor: colors.dividerColor }} />

      {/* Action Buttons Footer */}
      <CardActions
        sx={{
          justifyContent: 'space-between',
          p: 2,
          px: 3,
          backgroundColor: 'transparent',
          flexShrink: 0,
        }}
      >
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton
            size="small"
            sx={{ color: colors.viewColor, bgcolor: colors.viewBg, '&:hover': { bgcolor: colors.viewBgHover } }}
            onClick={() => onView(contact)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Box>
          <Tooltip title="Edit Contact" placement="top" arrow>
            <IconButton
              size="small"
              sx={{
                color: colors.editColor,
                bgcolor: colors.editBg,
                '&:hover': { bgcolor: colors.editBgHover },
                mr: 1
              }}
              onClick={() => onEdit(contact)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Contact" placement="top" arrow>
            <IconButton
              size="small"
              sx={{ color: colors.deleteColor, bgcolor: colors.deleteBg, '&:hover': { bgcolor: colors.deleteBgHover } }}
              onClick={() => onDelete(contact.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ContactCard;