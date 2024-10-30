import { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import Navigation from '../common/Navigation';

function TakeSurvey() {
  const [loadError, setLoadError] = useState(null);

  // Update these paths to match your actual Unity build file names
  const { unityProvider, isLoaded, loadingProgression, error } = useUnityContext({
    loaderUrl: "/unity-game/Build/game.loader.js",
    dataUrl: "/unity-game/Build/game.data",
    frameworkUrl: "/unity-game/Build/game.framework.js",
    codeUrl: "/unity-game/Build/game.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // Check if Unity files are accessible
  useEffect(() => {
    const checkUnityFiles = async () => {
      try {
        const files = [
          '/unity-game/Build/game.loader.js',
          '/unity-game/Build/game.data',
          '/unity-game/Build/game.framework.js',
          '/unity-game/Build/game.wasm'
        ];

        for (const file of files) {
          const response = await fetch(file);
          if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
          }
          console.log(`Successfully loaded ${file}`);
        }
      } catch (err) {
        console.error('Unity file check failed:', err);
        setLoadError(err.message);
      }
    };

    checkUnityFiles();
  }, []);

  // Log loading progress
  useEffect(() => {
    console.log('Loading progress:', loadingProgression);
  }, [loadingProgression]);

  // Log any Unity errors
  useEffect(() => {
    if (error) {
      console.error('Unity error:', error);
      setLoadError(error.message);
    }
  }, [error]);

  if (loadError || error) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navigation />
        <Box sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2
        }}>
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              maxWidth: 600 
            }}
          >
            Failed to load Unity game: {loadError || error.message}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navigation />
      
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: '1200px',
          aspectRatio: '16/9',
          bgcolor: '#000',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1
        }}>
          <Unity 
            unityProvider={unityProvider}
            style={{ 
              width: '100%',
              height: '100%',
              visibility: isLoaded ? 'visible' : 'hidden'
            }}
          />
          
          {!isLoaded && (
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <CircularProgress />
              <Typography sx={{ mt: 2, color: 'white' }}>
                Loading... {Math.round(loadingProgression * 100)}%
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, color: 'gray' }}>
                {loadingProgression === 0 ? 'Initializing...' : 'Loading game files...'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default TakeSurvey;