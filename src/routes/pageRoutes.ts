import HomePage from '@/pages/HomePage';
import PetPage from '@/pages/PetPage';
import PetsPage from '@/pages/PetsPage';

export const pageRouteMap = [
  {
    index: true,
    path: '/',
    slug: 'HomePage',
    Element: HomePage,
  },
  {
    path: '/pets/:id',
    slug: 'PetPage',
    Element: PetPage,
  },
  {
    path: '/pets',
    slug: 'PetsPage',
    Element: PetsPage,
  },
];
