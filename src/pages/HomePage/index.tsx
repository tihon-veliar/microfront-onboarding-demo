import { Box, Heading, Button, Center } from '@chakra-ui/react';
import { useLoaderData, Link } from 'react-router-dom';

import RichText from '@/components/RichText';
import Banner from '@/components/Banner';

const HomePage = () => {
  const { title, intro, headerImage } = useLoaderData();
  return (
    <Box p={8}>
      <Banner image={headerImage} />
      <Heading as="h1" size="xl" mb={4}>
        {title}
      </Heading>
      <Box mb={4}>
        <RichText content={intro?.json} />
      </Box>

      <Center mt={8}>
        <Button>
          <Link to="/pets">Our pets</Link>
        </Button>
      </Center>
    </Box>
  );
};

export default HomePage;
