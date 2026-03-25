import { Outlet, Link } from 'react-router-dom';
import { Box, HStack, Button, Flex } from '@chakra-ui/react';
import 'nes.css/css/nes.min.css';
import bgImage from '@/assets/bg.png';

const Layout = () => {
  return (
    <Box
      p={4}
      minH="100vh"
      bg="#79c9f7"
      bgImage={`url(${bgImage})`}
      bgAttachment="fixed"
      bgRepeat="no-repeat"
      bgSize="cover"
      backgroundPosition="center"
    >
      <HStack mb={6} align="center" justify="center">
        <Link to="/">
          <Button variant="ghost">Neo Bestiary</Button>
        </Link>
        <Link to="/bestiary">
          <Button variant="ghost">Bestiary</Button>
        </Link>
      </HStack>
      <Flex align="center" justify="center">
        <Box maxW="920px">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
