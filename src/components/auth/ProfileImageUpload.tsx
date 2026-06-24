import { Button, Stack, Typography } from '@mui/material';

type Props = {
  profileImage: string;
  imageError: string;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileImageUpload = ({
  profileImage,
  imageError,
  onUpload,
}: Props) => {
  return (
    <Stack spacing={1}>
      <Button component="label" variant="outlined">
        Upload Profile Picture
        <input
          hidden
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={onUpload}
        />
      </Button>

      <Typography
        variant="caption"
        color={imageError ? 'error' : 'text.secondary'}
      >
        {imageError ||
          'Accepted formats: JPG, JPEG, PNG, WEBP | Maximum size: 1 MB'}
      </Typography>

      {profileImage && (
        <img
          src={profileImage}
          alt="Profile Preview"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      )}
    </Stack>
  );
};
