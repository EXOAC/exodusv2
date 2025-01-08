import { useQuery } from '@tanstack/react-query';
import { getMessages } from '@/lib/api/messages';
import { Badge } from '@/components/ui/Badge';
import { formatDistanceToNow } from 'date-fns';

export function MessageHistory() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {messages?.map((message: any) => (
        <div
          key={message.id}
          className="bg-black/40 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {message.platforms.map((platform: string) => (
                <Badge key={platform}>{platform}</Badge>
              ))}
            </div>
            <span className="text-sm text-white/60">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-white/90">{message.content}</p>
        </div>
      ))}
    </div>
  );
}