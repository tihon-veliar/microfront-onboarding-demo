import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import NotFoundPage from '@/pages/NotFoundPage';
import { fetchPageContent } from '@/services/contentful/contentPageService';
import { pageRouteMap } from './pageRoutes';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      ...pageRouteMap.map(({ path, slug, Element, index }) => {
        return {
          ...(() => (index ? { index } : { path }))(),
          element: <Element />,
          errorElement: <NotFoundPage />,
          loader: async () => {
            const pageContent = await fetchPageContent(slug);
            if (!pageContent) throw Error(`${slug} not found`);
            return pageContent;
          },
        };
      }),
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
