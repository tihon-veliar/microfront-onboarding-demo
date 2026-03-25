import HomePage from '@/pages/HomePage';
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
    path: '/bestiary',
    slug: 'BestiaryPage',
    Element: PostsPage,
  },
  {
    path: '/bestiary/:id',
    slug: 'CreaturePage',
    Element: PostPage,
  },
];
