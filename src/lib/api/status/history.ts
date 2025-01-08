import axios from 'axios';

export async function fetchStatusHistory(productName: string) {
  try {
    const response = await axios.get(`/api/status/history`, { params: { productName } });
    return response.data.map((entry: any) => ({
      ...entry,
      changedAt: new Date(entry.changed_at).toLocaleString(),
    }));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch status history');
  }
}