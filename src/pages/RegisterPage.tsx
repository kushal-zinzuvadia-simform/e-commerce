import { Controller, useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Link,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import { INDIAN_STATES } from '../data/stateData';
import {
  GENDERS,
  registerSchema,
  type RegisterFormData,
} from '../types/userSchema';
import { useProfileImage } from '../hooks/useProfileImage';
import { ProfileImageUpload } from '../components/auth/ProfileImageUpload';
import { PasswordField } from '../components/auth/PasswordField';
import { saveUsers, userExists, getUsers } from '../utils/userStorage';

export const RegisterPage = () => {
  const { profileImage, imageError, handleImageUpload } = useProfileImage();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const users = getUsers();

    if (userExists(users, data.email)) {
      setError('email', {
        type: 'manual',
        message: 'duplicate',
      });
      return;
    }

    const { confirmPassword, termsAccepted, ...user } = data;

    users.push({
      ...user,
      profileImage: profileImage || undefined,
    });

    saveUsers(users);

    navigate('/login');
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 900,
        mx: 'auto',
        my: 4,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
      }}
    >
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Typography variant="h4" align="center">
            Create Account
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register('firstName')}
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register('lastName')}
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>

                  <RadioGroup {...field} value={field.value ?? ''} row>
                    {GENDERS.map((gender) => (
                      <FormControlLabel
                        key={gender}
                        value={gender}
                        control={<Radio />}
                        label={gender}
                      />
                    ))}
                  </RadioGroup>

                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register('dob')}
              label="Birth Date"
              type="date"
              fullWidth
              error={!!errors.dob}
              helperText={errors.dob?.message}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: {
                  max: new Date().toISOString().split('T')[0],
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register('phone')}
              label="Contact Number"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register('email', {
                onChange: () => clearErrors('email'),
              })}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={
                errors.email?.message === 'duplicate' ? (
                  <>
                    An account with this email already exists.{' '}
                    <Link component={RouterLink} to="/login">
                      Please login.
                    </Link>
                  </>
                ) : (
                  errors.email?.message
                )
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register('city')}
              label="City"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="stateCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ''}
                  select
                  label="State"
                  fullWidth
                  error={!!errors.stateCode}
                  helperText={errors.stateCode?.message}
                >
                  {INDIAN_STATES.map((state) => (
                    <MenuItem key={state.code} value={state.code}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              {...register('address')}
              label="Address"
              multiline
              rows={2}
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ProfileImageUpload
            profileImage={profileImage}
            imageError={imageError}
            onUpload={handleImageUpload}
          />
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <PasswordField
              label="Password"
              registration={register('password')}
              error={errors.password}
              helperText="Must contain letters, numbers and a special character"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <PasswordField
              label="Confirm Password"
              registration={register('confirmPassword')}
              error={errors.confirmPassword}
            />
          </Grid>
        </Grid>

        <Controller
          name="termsAccepted"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.termsAccepted}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value ?? false}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
                label="I agree to the Privacy Policy and Terms & Conditions"
              />

              <FormHelperText>{errors.termsAccepted?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Create Account
        </Button>

        <Typography variant="body2" align="center" color="text.secondary">
          Already a member?
          <Link component={RouterLink} to="/login" underline="hover">
            Login here
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};
