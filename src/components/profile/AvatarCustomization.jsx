import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import UnityWebGL from '../common/UnityWebGL';
import { updateAvatarSettings } from '../../store/slices/profileSlice';

function AvatarCustomization() {
  const dispatch = useDispatch();
  const avatarSettings = useSelector(state => state.profile.avatarSettings);

  const handleUnityMessage = (message) => {
    if (message.type === 'AVATAR_UPDATE') {
      dispatch(updateAvatarSettings(message.data));
    }
  };

  const unityContent = {
    loaderUrl: '/unity/AvatarCustomization.loader.js',
    dataUrl: '/unity/AvatarCustomization.data',
    frameworkUrl: '/unity/AvatarCustomization.framework.js',
    codeUrl: '/unity/AvatarCustomization.wasm',
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customize Your Avatar
      </Typography>
      <UnityWebGL 
        unityContent={unityContent}
        onMessage={handleUnityMessage}
      />
    </Box>
  );
}

export default AvatarCustomization; 