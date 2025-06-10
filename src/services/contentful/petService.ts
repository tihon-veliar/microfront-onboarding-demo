import { contentfulClient } from '../api/contentfulClient';

export const fetchPets = async (limit = 5, skip = 0) => {
  const query = `
    query {
      petCollection(limit: ${limit}, skip: ${skip}) {
        total
        items {
          sys { id }
          name
          age
          gender
          specie
          breed
          shots { json }
          image { url title }
        }
      }
    }
  `;
  const data = await contentfulClient.query(query);
  const collection = data.petCollection;
  const hasNextPage = skip + collection.items.length < collection.total;
  return {
    total: collection.total,
    items: collection.items,
    hasNextPage,
  };
};

export const fetchPetById = async (id: string) => {
  const query = `
    query {
      pet(id: "${id}") {
        name
        age
        gender
        specie
        breed
        shots { json }
        image { url title }
      }
    }
  `;
  const data = await contentfulClient.query(query);
  return data.pet;
};
