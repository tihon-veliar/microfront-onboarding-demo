import { Box, Heading } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import PetList from '@/components/PetList';
import RichText from '@/components/RichText';
import Banner from '@/components/Banner';

const PetsPage = () => {
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
      <PetList />
    </Box>
  );
};

export default PetsPage;
