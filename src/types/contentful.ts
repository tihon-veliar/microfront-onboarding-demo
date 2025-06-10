// src/types/contentful.ts
import { Document } from '@contentful/rich-text-types';

export type PageContent = {
  title: string;
  intro: Document;
  headerImage: {
    url: string;
    title: string;
  } | null;
  sys: {
    id: string;
  };
};

export type DefaultPageProps = {
  pageContent: PageContent;
};

export interface Pet {
  sys: {
    id: string;
  };
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  specie: string;
  breed: string;
  image: {
    url: string;
    title?: string;
  } | null;
  shots: Document;
}
