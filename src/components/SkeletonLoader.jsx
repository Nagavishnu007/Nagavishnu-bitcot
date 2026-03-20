import { Grid, Card, CardContent, CardActions, Box, Skeleton, Divider } from '@mui/material';
import { colors } from '../theme/theme';

/**
 * Single skeleton card representation
 */
export const SkeletonCard = () => (
  <Card elevation={0} sx={{
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    border: `1px solid ${colors.borderGray}`,
    boxShadow: colors.cardShadow,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Gradient banner placeholder */}
    <Box sx={{ height: '90px', width: '100%', background: 'rgba(0,0,0,0.06)', flexShrink: 0 }} />

    <CardContent sx={{ pt: 0, pb: 2, px: 3, flexGrow: 1 }}>
      {/* Avatar skeleton - overlapping the banner */}
      <Skeleton variant="circular" width={72} height={72} sx={{ mt: '-36px', mb: 1, border: `4px solid ${colors.white}` }} />
      {/* Name skeleton */}
      <Skeleton variant="text" width="65%" height={40} sx={{ mb: 1 }} />
      
      {/* Identity row placeholders */}
      <Box display="flex" alignItems="center" mt={1.5} mb={1.5}>
        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: '8px', mr: 1.5, flexShrink: 0 }} />
        <Skeleton variant="text" width="50%" height={24} />
      </Box>
      <Box display="flex" alignItems="center">
        <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: '8px', mr: 1.5, flexShrink: 0 }} />
        <Skeleton variant="text" width="75%" height={24} />
      </Box>
    </CardContent>

    <Divider sx={{ mx: 3, borderStyle: 'dashed', borderColor: colors.dividerColor }} />

    {/* Action buttons skeleton */}
    <CardActions sx={{ justifyContent: 'space-between', p: 2, px: 3 }}>
      <Skeleton variant="circular" width={34} height={34} />
      <Box display="flex">
        <Skeleton variant="circular" width={34} height={34} sx={{ mr: 1 }} />
        <Skeleton variant="circular" width={34} height={34} />
      </Box>
    </CardActions>
  </Card>
);

/**
 * Entire page skeleton loader grid
 */
const SkeletonLoader = () => {
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="stretch" sx={{ mt: 1 }}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
