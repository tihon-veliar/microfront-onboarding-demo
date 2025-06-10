import { Box, Heading } from '@chakra-ui/react';
import PetList from '@/components/PetList';
import { DefaultPageProps } from '@/types/contentful';
import RichText from '@/components/RichText';
import Banner from '@/components/Banner';
const HomePage = ({ pageContent }: DefaultPageProps) => {
  const { title, intro, headerImage } = pageContent;
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

export default HomePage;
