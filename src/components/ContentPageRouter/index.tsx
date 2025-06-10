import { useRoutes, useLocation, matchPath } from 'react-router-dom';
import { pageRouteMap } from '@/routes/pageRoutes';
import { Children, useEffect, useState } from 'react';
import { fetchPageContent } from '@/services/contentful/contentPageService';
import { Spinner, Box, Text } from '@chakra-ui/react';
import Layout from '@/layouts/Layout';

const ContentPageRouter = () => {
  const location = useLocation();
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const route = pageRouteMap.find((r) => matchPath(r.path, location.pathname));
    if (route?.slug) {
      setLoading(true);
      setError(false);
      fetchPageContent(route.slug)
        .then((data) => {
          setPageContent(data);
          setLoading(false);
        })
        .catch(() => {
          setPageContent(null);
          setError(true);
          setLoading(false);
        });
    } else {
      setPageContent(null);
      setLoading(false);
      setError(false);
    }
  }, [location.pathname]);

  const preperedMap = [
    {
      element: <Layout />,
      children: [
        ...pageRouteMap.map(({ path, element: Component }) => ({
          path,
          element: <Component pageContent={pageContent} />,
        })),
      ],
    },
    {
      path: '*',
      element: (
        <Box p={8}>
          <Text fontSize="2xl" color="red.500">
            404 - Page not found
          </Text>
        </Box>
      ),
    },
  ];

  const routes = useRoutes(preperedMap);

  if (loading) return <Spinner size="xl" />;
  if (error) {
    return (
      <Box p={8}>
        <Text fontSize="2xl" color="red.500">
          Failed to load page content.
        </Text>
      </Box>
    );
  }

  return routes;
};

export default ContentPageRouter;
