import React, { useState, useEffect } from 'react';
import { useStatus } from '../../context/StatusContext';
import { getStatusHistory } from '../../lib/api/status';
import type { ProductStatus } from '../../types/status';
import { Shield, ShieldCheck, ShieldAlert, CircleDot, RefreshCw, Lock } from 'lucide-react';

interface StatusManagerProps {
  productName: string;
  currentStatus: ProductStatus;
}

export default function StatusManager({ productName, currentStatus }: StatusManagerProps) {
  const { updateProductStatus } = useStatus();
  const [history, setHistory] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getStatusHistory(productName);
        setHistory(data);
      } catch (error) {
        console.error('Failed to load status history:', error);
      }
    };

    loadHistory();
  }, [productName, currentStatus]);

  // Rest of the component remains the same...
}