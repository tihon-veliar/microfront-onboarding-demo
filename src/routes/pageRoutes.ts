import HomePage from '@/pages/HomePage';
import PetPage from '@/pages/PetPage';
import PetsPage from '@/pages/PetsPage';
import PostsPage from '@/pages/PostsPage';
import PostPage from '@/pages/PostPage';

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
  {
    path: '/posts',
    slug: 'PostsPage',
    Element: PostsPage,
  },
  {
    path: '/posts/:id',
    slug: 'PostPage',
    Element: PostPage,
  },
];
