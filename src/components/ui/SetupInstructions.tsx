import React from 'react';
import { Accordion } from './Accordion';
import { setupInstructions } from '../../data/productData';

export default function SetupInstructions() {
  return (
    <div>
      <h3 className="text-xl font-medium text-white/90 mb-4">Setup Instructions</h3>
      <Accordion items={setupInstructions} />
    </div>
  );
}