import { Box, Image } from '@chakra-ui/react';

interface CMSAsset {
  url: string;
  title?: string;
}

interface BannerProps {
  image?: CMSAsset | null;
}

const Banner = ({ image }: BannerProps) => {
  if (!image?.url) return null;

  return (
    <Box textAlign="center" mb={8}>
      <Image
        src={image.url}
        alt={image.title || 'Banner'}
        mx="auto"
        mb={4}
        borderRadius="md"
        maxH="400px"
        objectFit="cover"
      />
    </Box>
  );
};

export default Banner;
