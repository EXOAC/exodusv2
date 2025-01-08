import { ProductStatus } from '../types/status';

interface UpdateStatusCommand {
  type: 'UPDATE_STATUS';
  productName: string;
  status: ProductStatus;
}

export function processTelegramCommand(
  command: string, 
  updateStatus: (productName: string, status: ProductStatus) => void
): boolean {
  try {
    const parsedCommand = JSON.parse(command) as UpdateStatusCommand;
    
    if (parsedCommand.type === 'UPDATE_STATUS' && 
        isValidProductStatus(parsedCommand.status)) {
      updateStatus(parsedCommand.productName, parsedCommand.status);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Invalid command format:', error);
    return false;
  }
}

function isValidProductStatus(status: any): status is ProductStatus {
  const validStatuses: ProductStatus[] = [
    'undetected',
    'detected',
    'testing',
    'updating',
    'closed'
  ];
  return validStatuses.includes(status as ProductStatus);
}