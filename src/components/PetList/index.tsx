import { useEffect, useState } from 'react';
import { Box, Button, HStack, VStack, Text, Spinner, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchPets } from '@/services/contentful/petService';
import type { Pet } from '@/types/contentful';

const ITEMS_PER_PAGE = 5;

const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      _hover={{ bg: 'gray.50' }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Link to={`/pets/${pet.sys.id}`}>
        <VStack height="100%">
          <Image
            src={pet.image?.url ? `${pet.image.url}?w=200&h=150` : '/petsPlaceholder.svg'}
            alt={pet.image?.title || 'Placeholder'}
            borderRadius="md"
            width="80%"
            height="150px"
            objectFit="cover"
          />
          <VStack align="start" width="100%">
            <Text fontWeight="bold">{pet.name}</Text>
            <Text fontSize="sm" color="gray.600">
              {pet.specie} • {pet.breed}
            </Text>
          </VStack>
        </VStack>
      </Link>
    </Box>
  );
};

const PetList = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const getPets = async (pageIndex: number) => {
    setLoading(true);
    const skip = pageIndex * ITEMS_PER_PAGE;
    const data = await fetchPets(ITEMS_PER_PAGE, skip);
    setPets(data.items);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    getPets(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <Box>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{ base: '1fr' }}
          gap={4}
          width="400px"
          justifyContent="center"
        >
          {pets.map((pet) => (
            <PetCard key={pet.sys.id} pet={pet} />
          ))}
        </Box>
      )}

      <HStack mt={6}>
        {page > 0 && <Button onClick={handlePrev}>Previous</Button>}
        {hasNextPage && <Button onClick={handleNext}>Next</Button>}
      </HStack>
    </Box>
  );
};

export default PetList;
