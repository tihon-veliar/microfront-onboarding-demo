import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

interface RichTextProps {
  content?: { nodeType: string } | null;
}

const RichText = ({ content }: RichTextProps): ReactNode => {
  if (!content || content.nodeType !== 'document') return null;

  return <>{documentToReactComponents(content as Document)}</>;
};

export default RichText;
