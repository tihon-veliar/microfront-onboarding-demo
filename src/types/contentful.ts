// src/types/contentful.ts
export interface Json {
  content: {
    content: {
      marks: string[];
      value: string;
      nodeType: string;
    }[];
    nodeType: string;
  }[];
  nodeType: string;
}

export interface RichTextCMSI {
  json: Json;
}

export type PageContent = {
  title: string;
  intro: RichTextCMSI;
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
  shots: RichTextCMSI;
}
