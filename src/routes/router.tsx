import { createBrowserRouter } from 'react-router-dom';
import type { ShouldRevalidateFunctionArgs } from 'react-router-dom';
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
          shouldRevalidate: ({ currentUrl, nextUrl }: ShouldRevalidateFunctionArgs) => {
            if (currentUrl.pathname !== nextUrl.pathname) {
              return true;
            }

            const ignoredSearchParams = new Set(['page', 'loaded']);
            const currentParams = new URLSearchParams(currentUrl.search);
            const nextParams = new URLSearchParams(nextUrl.search);
            const allKeys = new Set([...currentParams.keys(), ...nextParams.keys()]);

            for (const key of allKeys) {
              if (ignoredSearchParams.has(key)) {
                continue;
              }

              if (currentParams.get(key) !== nextParams.get(key)) {
                return true;
              }
            }

            return false;
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
