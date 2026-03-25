import { useEffect, useRef, useState } from 'react';
import { Image, Box, Input, Stack, Text } from '@chakra-ui/react';
import loadingImage from '@/assets/ball-loader.png';

const DEBUG = false;

const Spinner = () => {
  const ref = useRef<HTMLImageElement>(null);

  const [path, setPath] = useState(6);
  const [A, setA] = useState(4);
  const [B, setB] = useState(1);
  const [speed, setSpeed] = useState(0.06);
  const [angleDeg, setAngleDeg] = useState(70);
  const [scaleFactor, setScaleFactor] = useState(0.05);

  useEffect(() => {
    let t = 0;
    let raf: number;

    const animate = () => {
      t += speed;

      const angle = (angleDeg * Math.PI) / 180;

      const rawX = A * Math.sin(t) * path;
      const rawY = B * Math.sin(2 * t) * path;

      const maxRawX = A * path;
      const normalizedX = maxRawX === 0 ? 0 : rawX / maxRawX;
      const scale = 1 + scaleFactor * normalizedX;

      const x = rawX * Math.cos(angle) - rawY * Math.sin(angle);
      const y = rawX * Math.sin(angle) + rawY * Math.cos(angle);

      if (ref.current) {
        ref.current.style.transform = `
          translate(${x}px, ${y}px)
          rotate(${t * 120}deg)
          scale(${scale})
        `;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [path, A, B, speed, angleDeg, scaleFactor]);

  return (
    <Box>
      <Image ref={ref} src={loadingImage} alt="Loading" boxSize="150px" willChange="transform" />

      {DEBUG && (
        <Box mt={4} p={3} borderWidth="1px" borderRadius="md">
          <Stack>
            <Text fontSize="sm">Path</Text>
            <Input value={path} onChange={(e) => setPath(Number(e.target.value))} type="number" />

            <Text fontSize="sm">A (X amplitude)</Text>
            <Input value={A} onChange={(e) => setA(Number(e.target.value))} type="number" />

            <Text fontSize="sm">B (Y amplitude)</Text>
            <Input value={B} onChange={(e) => setB(Number(e.target.value))} type="number" />

            <Text fontSize="sm">Speed</Text>
            <Input
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              type="number"
              step="0.01"
            />

            <Text fontSize="sm">Angle (deg)</Text>
            <Input
              value={angleDeg}
              onChange={(e) => setAngleDeg(Number(e.target.value))}
              type="number"
            />

            <Text fontSize="sm">Scale factor</Text>
            <Input
              value={scaleFactor}
              onChange={(e) => setScaleFactor(Number(e.target.value))}
              type="number"
              step="0.001"
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Spinner;
