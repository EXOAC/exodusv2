import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
import { publishMessage } from '@/lib/api/messages';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';

const schema = z.object({
  content: z.string().min(1).max(2000),
  platforms: z.array(z.string()),
  discordWebhookUrl: z.string().url().optional(),
  telegramApiToken: z.string().optional(),
  telegramChannelId: z.string().optional(),
  scheduledFor: z.date().optional()
});

type FormData = z.infer<typeof schema>;

const AUTOSAVE_DELAY = 1000;

export function MessageComposer() {
  const [preview, setPreview] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  const { register, watch, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const content = watch('content');
  const charCount = content?.length || 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        localStorage.setItem('draft-message', content);
        setAutoSaveStatus('Draft saved');
      }
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timer);
  }, [content]);

  const onSubmit = async (data: FormData) => {
    try {
      await publishMessage({
        ...data,
        platforms: selectedPlatforms
      });
      localStorage.removeItem('draft-message');
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {charCount}/2000 characters
        </div>
        <Button
          variant="ghost"
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {preview ? (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content || ''}</ReactMarkdown>
        </div>
      ) : (
        <Textarea
          {...register('content')}
          error={errors.content?.message}
          placeholder="Write your message here..."
          rows={10}
        />
      )}

      {autoSaveStatus && (
        <div className="text-sm text-gray-500">{autoSaveStatus}</div>
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedPlatforms.includes('discord') ? 'default' : 'outline'}
            onClick={() => togglePlatform('discord')}
          >
            Discord
          </Button>
          <Button
            variant={selectedPlatforms.includes('telegram') ? 'default' : 'outline'}
            onClick={() => togglePlatform('telegram')}
          >
            Telegram
          </Button>
        </div>

        {selectedPlatforms.includes('discord') && (
          <Input
            label="Discord Webhook URL"
            placeholder="https://discord.com/api/webhooks/..."
            {...register('discordWebhookUrl')}
            error={errors.discordWebhookUrl?.message}
          />
        )}

        {selectedPlatforms.includes('telegram') && (
          <div className="space-y-4">
            <Input
              label="Telegram Bot API Token"
              placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
              {...register('telegramApiToken')}
              error={errors.telegramApiToken?.message}
            />
            <Input
              label="Telegram Channel ID"
              placeholder="@yourchannel or -100123456789"
              {...register('telegramChannelId')}
              error={errors.telegramChannelId?.message}
            />
          </div>
        )}
      </div>

      <Button onClick={handleSubmit(onSubmit)} className="w-full">
        Publish Message
      </Button>
    </div>
  );
}