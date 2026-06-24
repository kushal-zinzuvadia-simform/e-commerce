import { useState } from 'react';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

export const useProfileImage = () => {
  const [profileImage, setProfileImage] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError('Image size must be less than 1 MB.');
      return;
    }

    setImageError('');

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result);
      }
    };

    reader.onerror = () => {
      setImageError('Failed to read the image file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  return {
    profileImage,
    imageError,
    handleImageUpload,
  };
};
