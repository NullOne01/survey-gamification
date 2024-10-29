import { useEffect, useRef } from 'react';

const UnityWebGL = ({ unityContent, onMessage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Mock Unity loader
    const loadUnity = async () => {
      // In reality, you would load your Unity WebGL build here
      window.UnityInstance = {
        SendMessage: (obj, method, param) => {
          console.log(`Unity message: ${obj}.${method}(${param})`);
        }
      };
    };

    loadUnity();

    return () => {
      // Cleanup Unity instance
      if (window.UnityInstance) {
        window.UnityInstance = null;
      }
    };
  }, [unityContent]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '600px', background: '#444' }}
    />
  );
};

export default UnityWebGL; 