import { useState } from 'react';
import { updateProductStatus, getStatusHistory } from '@/lib/api/status';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { ProductStatus } from '@/types/status';

const statuses: ProductStatus[] = [
  'undetected',
  'detected',
  'testing',
  'updating',
  'closed'
];

interface StatusPanelProps {
  productId: string;
  currentStatus: ProductStatus;
}

export function StatusPanel({ productId, currentStatus }: StatusPanelProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleStatusUpdate = async (newStatus: ProductStatus) => {
    setIsLoading(true);
    try {
      await updateProductStatus(productId, newStatus);
      setStatus(newStatus);
      
      // Refresh history
      const updatedHistory = await getStatusHistory(productId);
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {statuses.map((s) => (
          <Button
            key={s}
            variant={s === status ? 'default' : 'outline'}
            onClick={() => handleStatusUpdate(s)}
            disabled={isLoading}
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Status History</h3>
        <div className="space-y-2">
          {history.map((entry: any) => (
            <div
              key={entry.id}
              className="flex items-center justify-between py-2 border-b border-gray-800"
            >
              <div className="flex items-center gap-2">
                <Badge>{entry.status}</Badge>
                <span className="text-sm text-gray-400">
                  {entry.message}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}