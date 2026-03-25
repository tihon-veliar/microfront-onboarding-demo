import { Box, Heading, Center, Text } from '@chakra-ui/react';
import { useLoaderData, Link } from 'react-router-dom';

import RichText from '@/components/RichText';
import Banner from '@/components/Banner';

const HomePage = () => {
  const { title, intro, headerImage } = useLoaderData();
  return (
    <Box p={8}>
      <Banner image={headerImage} />
      <Heading as="h1" size="xl" mb={4} textAlign={'center'}>
        {title}
      </Heading>
      <Box
        mb={4}
        css={{
          '& p': {
            textAlign: 'center',
          },
        }}
      >
        <RichText content={intro?.json} />
      </Box>

      <Center mt={8}>
        <Link to="/bestiary">
          <Text fontSize={30}>Research</Text>
        </Link>
      </Center>
    </Box>
  );
};

export default HomePage;
