import { useEffect, useMemo, useState } from 'react';
import { Box, Heading, Button, HStack, Text, Image, SimpleGrid, Flex } from '@chakra-ui/react';
import { useLoaderData, Link, useSearchParams } from 'react-router-dom';
import Spinner from '@/components/Spinner';

import RichText from '@/components/RichText';
import Banner from '@/components/Banner';
import pokeApiService from '@/services/pokeApiService';
import type { CreatureListItem, CreatureListResponse } from '@/services/pokeApiService';
import placeholderImage from '@/assets/placeholder.png';

const ITEMS_PER_PAGE = 12;

const PostsPage = () => {
  const { title, intro, headerImage } = useLoaderData() as {
    title: string;
    intro: { json: unknown } | null;
    headerImage?: unknown;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page') ?? '0');

  const [posts, setPosts] = useState<CreatureListItem[]>([]);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // keep current page in URL
  useEffect(() => {
    setSearchParams({
      page: String(page),
    });
  }, [page, setSearchParams]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      pokeApiService.fetchCreatures(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
      new Promise((resolve) => setTimeout(resolve, 900)),
    ])
      .then(([response]) => {
        const { items, total } = response as CreatureListResponse;
        setPosts(items);
        setTotal(total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const visiblePages = useMemo(() => {
    const result: Array<number | 'ellipsis'> = [];

    for (let index = 0; index < totalPages; index += 1) {
      const isFirstPage = index === 0;
      const isLastPage = index === totalPages - 1;
      const isNearCurrentPage = Math.abs(index - page) <= 1;

      if (isFirstPage || isLastPage || isNearCurrentPage) {
        result.push(index);
        continue;
      }

      const lastItem = result[result.length - 1];
      if (lastItem !== 'ellipsis') {
        result.push('ellipsis');
      }
    }

    return result;
  }, [page, totalPages]);

  console.log(posts);

  return (
    <Box p={8} pt={0}>
      <Banner image={headerImage} />
      <Heading as="h1" size="xl" mb={4}>
        {title}
      </Heading>
      <Box mb={4}>
        <RichText content={intro?.json} />
      </Box>

      <Flex minH="60vh" width="100%" minW="100%" align={'center'} justifyContent={'center'}>
        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} gap={6}>
            {posts.map((post) => (
              <Box
                key={post.id}
                p={4}
                borderWidth={4}
                borderColor={'#27272A'}
                overflow="hidden"
                backgroundImage="linear-gradient(rgba(27, 35, 7, 0.5), rgba(27, 35, 7, 0.5)), linear-gradient(rgba(27, 35, 7, 0.5), rgba(27, 35, 7, 0.5))"
                backgroundRepeat="no-repeat"
                backgroundSize="3px calc(100%), 100% 4px"
                backgroundPosition="0 3px, 0 0"
              >
                <Link to={`/bestiary/${post.id}?page=${page}`}>
                  <Flex flexDir={'column'} align={'center'}>
                    <Box mb={3} aspectRatio={1} width="100%" className="nes-pointer">
                      <Image
                        src={post.image}
                        alt={post.name}
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        filter="drop-shadow(3px 4px 1px rgba(0,0,0,0.6))"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = placeholderImage;
                        }}
                      />
                    </Box>
                    <Text fontWeight="bold" textTransform="capitalize">
                      {post.name}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Flex>

      <Flex mt={6} direction={'column'} align={'center'}>
        <HStack flexWrap="wrap">
          <Button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
            {'<'}
          </Button>

          {visiblePages.map((item, index) => {
            if (item === 'ellipsis') {
              return <Text key={`ellipsis-${index}`}>...</Text>;
            }

            return (
              <Button
                key={item}
                onClick={() => setPage(item)}
                variant={page === item ? 'solid' : 'ghost'}
              >
                {item + 1}
              </Button>
            );
          })}

          <Button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
          >
            {'>'}
          </Button>
        </HStack>

        <Text mt={3}>
          Page {page + 1} of {totalPages}
        </Text>
      </Flex>
    </Box>
  );
};

export default PostsPage;
