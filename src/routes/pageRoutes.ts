import HomePage from '@/pages/HomePage';
import PetPage from '@/pages/PetPage';

export const pageRouteMap = [
  {
    path: '/',
    slug: 'HomePage',
    element: HomePage,
  },
  {
    path: '/pet/:id',
    slug: 'PetPage',
    element: PetPage,
  },
];
