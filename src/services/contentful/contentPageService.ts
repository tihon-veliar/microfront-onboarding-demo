import { contentfulClient } from '../api/contentfulClient';

export const fetchPageContent = async (slug: string) => {
  const query = `
    query {
      pageCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          sys { id }
          title
          intro {
            json
          }
          headerImage {
            url
            title
          }
        }
      }
    }
  `;

  const data = await contentfulClient.query(query);
  return data.pageCollection?.items?.[0] ?? null;
};
