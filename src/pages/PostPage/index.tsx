import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Text, Center } from '@chakra-ui/react';
import BackButton from '@/components/BackButton';

import jsonPlaceholderService from '@/services/jsonPlaceholderService';
import { PostI, CommentI } from '@/types/posts.ts';

const Comment = ({ comment }: { comment: CommentI }) => {
  const { id, name, body } = comment;
  return (
    <Box borderWidth={1} borderRadius="md" mb={4} p={2}>
      <Text fontWeight={'bold'} mb={2}>
        {name}
      </Text>
      <Text>{body}</Text>
      <Text fontWeight={'light'} fontSize={'8'} textAlign={'right'}>
        {id}
      </Text>
    </Box>
  );
};

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostI>();
  const [comments, setComments] = useState<CommentI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    jsonPlaceholderService
      .fetchPostById(Number(id))
      .then(setPost)
      .finally(() => setLoading(false));
    jsonPlaceholderService.fetchPostCommentsById(Number(id)).then(setComments);
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
        <BackButton goTo="/posts" />
      </Box>
      <Heading mb={4}>{post.title}</Heading>
      <Text>{post.body}</Text>

      {comments.length > 0 && (
        <>
          <Heading mb={4} mt={4}>
            Comments
          </Heading>
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </>
      )}
    </Box>
  );
};

export default PostPage;
