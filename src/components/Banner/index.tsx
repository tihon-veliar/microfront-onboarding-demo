import { Box, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

interface CMSAsset {
  url: string;
  title?: string;
}

const pulse = keyframes`
  0% {
    transform: scale(1);
    filter: drop-shadow(0px 4px 1px rgba(0,0,0,0.6));
  }
  50% {
    transform: scale(1.03);
    filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.6));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0px 4px 1px rgba(0,0,0,0.6));
  }
`;

interface BannerProps {
  image?: CMSAsset | null;
}

const Banner = ({ image }: BannerProps) => {
  if (!image?.url) return null;

  return (
    <Box textAlign="center">
      <Image
        src={image.url}
        alt={image.title || 'Banner'}
        mx="auto"
        borderRadius="md"
        maxH="400px"
        objectFit="cover"
        animation={`${pulse} 1.5s ease-in-out infinite`}
      />
    </Box>
  );
};

export default Banner;
