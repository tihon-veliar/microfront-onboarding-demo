// src/services/jsonPlaceholderService.ts
class JsonPlaceholderService {
  private static instance: JsonPlaceholderService;
  private readonly baseUrl: string = 'https://jsonplaceholder.typicode.com';

  private constructor() {}

  static getInstance(): JsonPlaceholderService {
    if (!JsonPlaceholderService.instance) {
      JsonPlaceholderService.instance = new JsonPlaceholderService();
    }
    return JsonPlaceholderService.instance;
  }

  async fetchPosts(limit: number = 10, start: number = 0) {
    const res = await fetch(`${this.baseUrl}/posts?_start=${start}&_limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  }

  async fetchPostById(id: number) {
    const res = await fetch(`${this.baseUrl}/posts/${id}`);
    if (!res.ok) throw new Error('Post not found');
    return res.json();
  }

  async fetchPostCommentsById(id: number) {
    const res = await fetch(`${this.baseUrl}/posts/${id}/comments`);
    if (!res.ok) throw new Error('Comments not found');
    return res.json();
  }
}

const jsonPlaceholderService = JsonPlaceholderService.getInstance();
export default jsonPlaceholderService;
