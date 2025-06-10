import { Box, Heading, Text, Spinner, Image } from '@chakra-ui/react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { fetchPetById } from '@/services/contentful/petService';
import RichText from '@/components/RichText';
import BackButton from '@/components/BackButton';

const PetPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPet = async () => {
      if (!id) return;
      try {
        const petData = await fetchPetById(id);
        setPet(petData);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id]);

  if (!pet && !loading)
    return (
      <Box pt={8}>
        <Text>Pet not found</Text>
      </Box>
    );

  if (!pet) return null;

  return (
    <Box p={4} pt={0}>
      <BackButton goTo="/pets" />
      <Box pt={4}>
        <Heading as="h2" size="lg" mb={4}>
          {pet.name}
        </Heading>

        <Box mb={4}>
          <Image
            src={pet.image?.url ? `${pet.image.url}?w=300&h=300&fit=thumb` : '/petsPlaceholder.svg'}
            alt={pet?.image?.title || pet.name}
            maxW="300px"
            borderRadius="8px"
          />
        </Box>

        <Text fontSize="lg" mb={2}>
          Age: {pet.age}
        </Text>
        <Text fontSize="lg" mb={2}>
          Gender: {pet.gender}
        </Text>
        <Text fontSize="lg" mb={2}>
          Specie: {pet.specie}
        </Text>
        <Text fontSize="lg" mb={2}>
          Breed: {pet.breed}
        </Text>

        {pet.shots?.json?.content && (
          <Box mt={4}>
            <Heading as="h3" size="md" mb={2}>
              Shots
            </Heading>
            <RichText content={pet.shots?.json} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PetPage;
