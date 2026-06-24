import { useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
};

export const PasswordField = ({
  label,
  registration,
  error,
  helperText,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...registration}
      type={showPassword ? 'text' : 'password'}
      label={label}
      fullWidth
      error={!!error}
      helperText={error?.message ?? helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
