import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { getCurrentUser, logout } from '../utils/auth';
import { INDIAN_STATES } from '../data/stateData';
import { ProfileField } from '../components/auth/ProfileField';

const Profile = () => {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const stateName =
    INDIAN_STATES.find(({ code }) => code === currentUser.stateCode)?.name ??
    currentUser.stateCode;

  const handleLogout = () => {
    logout();

    navigate('/login', { replace: true });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 900,
        mx: 'auto',
        my: 4,
        p: { xs: 2, md: 3 },
        borderRadius: 3,
      }}
    >
      <Stack spacing={2.5}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Avatar
            src={currentUser.profileImage}
            sx={{
              width: 60,
              height: 60,
              fontSize: 24,
            }}
          >
            {!currentUser.profileImage && currentUser.firstName?.[0]}
          </Avatar>

          <Stack spacing={0.5}>
            <Typography variant="h5">
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="First Name" value={currentUser.firstName} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="Last Name" value={currentUser.lastName} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="Gender" value={currentUser.gender} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="Date of Birth" value={currentUser.dob} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="Phone Number" value={currentUser.phone} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ProfileField label="Email" value={currentUser.email} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="City" value={currentUser.city} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ProfileField label="State" value={stateName} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ProfileField label="Address" value={currentUser.address} />
          </Grid>
        </Grid>

        <Divider />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              flex: 1,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Back to products
          </Button>

          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handleLogout}
            sx={{
              flex: 1,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Profile;
