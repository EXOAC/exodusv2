import React from 'react';

interface SchemaMarkupProps {
  schema: object;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => {
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};
