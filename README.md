# VetClinic Frontend

This is a React + TypeScript + Vite project demonstrating MACH architecture concepts and real-world integrations:

- **Headless CMS**: Contentful for managing page content and pet data
- **External Microservice**: JSONPlaceholder as an example API integration
- **UI Library**: Chakra UI for accessible, ready-to-use components
- **Routing**: React Router DOM for client-side routing
- **Deployment**: Ready to publish on Vercel or GitHub Pages

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root and set the following variables:
   ```bash
   VITE_CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
   VITE_CONTENTFUL_DELIVERY_TOKEN=YOUR_DELIVERY_TOKEN
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Deploy on Vercel or GitHub Pages.

## Services and APIs

 - **ContentfulClient**: GraphQL client for Contentful
 - **PetService**: petCollection and pet-by-ID requests
 - **ContentPageService**: loading CMS pages by slug
 - **JsonPlaceholderService**: singleton class for posts and comments

## Routing

Routes are defined in `src/routes/pageRouteMap.ts` and applied via `createBrowserRouter` and `RouterProvider` in the application entry point.
To add or modify a route, edit that file and ensure the corresponding page component exists under `src/pages/`.


## License

MIT
