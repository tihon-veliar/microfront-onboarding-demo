class ContentfulClient {
  private readonly apiUrl: string;
  private readonly token: string;

  constructor() {
    const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
    const ENVIRONMENT = 'master';
    this.apiUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;
    this.token = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
  }

  async query<T = any>(query: string): Promise<T> {
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    return json.data;
  }
}

export const contentfulClient = new ContentfulClient();