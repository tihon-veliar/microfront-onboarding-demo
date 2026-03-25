import { useParams, useLocation, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Text, Center, Flex, Image } from '@chakra-ui/react';
import BackButton from '@/components/BackButton';

import pokeApiService from '@/services/pokeApiService';
import type { CreatureDetails } from '@/services/pokeApiService';
import RichText from '@/components/RichText';

const TYPE_COLORS: Record<string, string> = {
  fire: '#F4A261',
  water: '#6FB1E7',
  grass: '#8BCF9B',
  electric: '#F7D774',
  ice: '#AEE1F9',
  fighting: '#E5989B',
  poison: '#C8A2C8',
  ground: '#E9C46A',
  flying: '#BBD0FF',
  psychic: '#F5A3B7',
  bug: '#CDE77F',
  rock: '#D4A373',
  ghost: '#B8A1D9',
  dragon: '#A0C4FF',
  dark: '#9E9E9E',
  steel: '#C9D6DF',
  fairy: '#F6C1D1',
};

const getTypeColor = (type: string): string => TYPE_COLORS[type.toLowerCase()] ?? '#A0AEC0';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page');
  const [post, setPost] = useState<CreatureDetails>();
  const [loading, setLoading] = useState(true);

  const { intro } = useLoaderData();

  useEffect(() => {
    if (!id) return;
    pokeApiService
      .fetchCreatureById(Number(id))
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Center>
        <Spinner />{' '}
      </Center>
    );
  if (!post)
    return (
      <Center>
        <Text>Post not found</Text>{' '}
      </Center>
    );

  return (
    <Box p={8} pt={0}>
      <Box mb={4}>
        <BackButton goTo={page ? `/bestiary?page=${page}` : '/bestiary'} />
      </Box>
      <Heading mb={4} textTransform="capitalize">
        {post.name}
      </Heading>

      <Flex
        gap={30}
        border={'4px solid #27272A'}
        p="15px"
        align={'center'}
        direction={{ base: 'column', md: 'row' }}
        backgroundImage="linear-gradient(rgba(27, 35, 7, 0.5), rgba(27, 35, 7, 0.5)), linear-gradient(rgba(27, 35, 7, 0.5), rgba(27, 35, 7, 0.5))"
        backgroundRepeat="no-repeat"
        backgroundSize="3px calc(100%), 100% 4px"
        backgroundPosition="0 3px, 0 0"
      >
        {post.image && (
          <Box mb={6}>
            <Image
              src={post.image}
              alt={post.name}
              style={{ maxWidth: '320px', width: '100%' }}
              filter="drop-shadow(3px 4px 1px rgba(0,0,0,0.6))"
            />
          </Box>
        )}

        <Box>
          <Heading size="md" mb={2}>
            Classification
          </Heading>
          <Text mb={4} fontSize={15}>
            {post.types.map((type, idx) => (
              <Text
                as="span"
                key={type}
                textTransform="capitalize"
                color={getTypeColor(type)}
                fontWeight="semibold"
              >
                {type}
                {idx < post.types.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </Text>

          <Heading size="md" mb={2}>
            Abilities
          </Heading>
          <Text mb={4} fontSize={15}>
            {post.abilities.map((ability, idx) => (
              <Text as="span" key={ability} textTransform="capitalize" color="#7B8FA1">
                {ability}
                {idx < post.abilities.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </Text>

          <Heading size="md" mb={2}>
            Physical Attributes
          </Heading>
          <Text fontSize={15} mb="4px">
            Height: {post.height}
          </Text>
          <Text fontSize={15} mb="4px">
            Weight: {post.weight}
          </Text>
        </Box>
      </Flex>

      <Box
        mt={5}
        maxW="650px"
        marginLeft="auto"
        css={{
          '& p': {
            fontSize: '13px',
            color: '#7B8FA1',
            textAlign: 'right',
          },
        }}
      >
        <RichText content={intro?.json} />
      </Box>
    </Box>
  );
};

export default PostPage;
