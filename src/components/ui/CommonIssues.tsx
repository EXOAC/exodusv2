import React from 'react';
import { Accordion } from './Accordion';
import { troubleshootingItems } from '../../data/productData';

export default function CommonIssues() {
  return (
    <div>
      <h3 className="text-xl font-medium text-white/90 mb-4 flex items-center gap-2">
        Common Issues
      </h3>
      <Accordion
        items={troubleshootingItems.map(item => ({
          ...item,
          content: item.content.replace(
            /<a([^>]*)>(.*?)<\/a>/g,
            (match, attrs, text) => {
              const hrefMatch = attrs.match(/href="([^"]*)"/);
              const href = hrefMatch ? hrefMatch[1] : '';
              const className = 'text-orange-500 hover:text-orange-400 transition-colors';

              if (href.startsWith('http')) {
                return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="${className}">${text}</a>`;
              }
              return match;
            }
          ),
        }))}
      />
    </div>
  );
}
