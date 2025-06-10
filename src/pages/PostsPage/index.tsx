import { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, Text, Spinner } from '@chakra-ui/react';
import { useLoaderData, Link } from 'react-router-dom';

import RichText from '@/components/RichText';
import Banner from '@/components/Banner';
import jsonPlaceholderService from '@/services/jsonPlaceholderService';
import { PostI } from '@/types/posts.ts';

const ITEMS_PER_PAGE = 10;

const PostsPage = () => {
  const { title, intro, headerImage } = useLoaderData();

  const [posts, setPosts] = useState<PostI[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    jsonPlaceholderService
      .fetchPosts(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <Box p={8} pt={0}>
      <Banner image={headerImage} />
      <Heading as="h1" size="xl" mb={4}>
        {title}
      </Heading>
      <Box mb={4}>
        <RichText content={intro?.json} />
      </Box>

      {loading ? (
        <Spinner />
      ) : (
        <VStack align="start" spacing={4}>
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth={1} borderRadius="md" width="100%">
              <Link to={`/posts/${post.id}`}>
                <Text fontWeight="bold">{post.title}</Text>
                <Text noOfLines={2}>{post.body}</Text>
              </Link>
            </Box>
          ))}
        </VStack>
      )}
      <Box mt={6}>
        {page !== 0 && (
          <Button onClick={() => setPage((p) => Math.max(p - 1, 0))} mr={2}>
            Previous
          </Button>
        )}
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </Box>
    </Box>
  );
};

export default PostsPage;
