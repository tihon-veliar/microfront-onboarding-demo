import { Outlet, Link } from 'react-router-dom';
import { Box, HStack, Button } from '@chakra-ui/react';

const Layout = () => {
  console.log('Layout rendered');
  return (
    <Box p={4}>
      <HStack mb={6}>
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/pets">
          <Button variant="ghost">Pets</Button>
        </Link>
        <Link to="/posts">
          <Button variant="ghost">Posts</Button>
        </Link>
      </HStack>
      <Outlet />
    </Box>
  );
};

export default Layout;
