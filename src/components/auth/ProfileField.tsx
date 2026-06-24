import { Stack, Typography } from '@mui/material';

type ProfileFieldProps = {
  label: string;
  value: string;
};

export const ProfileField = ({ label, value }: ProfileFieldProps) => {
  return (
    <Stack spacing={0.5}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: 'uppercase', letterSpacing: 1 }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};
