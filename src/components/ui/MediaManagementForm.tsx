import React, { useState } from 'react';
import { validateMediaUrl } from '../../utils/mediaValidation';

interface MediaManagementFormProps {
  onAddMedia: (url: string) => void;
}

export default function MediaManagementForm({ onAddMedia }: MediaManagementFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const mediaItem = validateMediaUrl(url);
    if (!mediaItem) {
      setError('Invalid media URL. Please use YouTube or Imgur links.');
      return;
    }

    onAddMedia(url);
    setUrl('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube or Imgur URL"
          className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white/90 placeholder:text-white/40 focus:border-orange-500/50 focus:outline-none transition-colors duration-200"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/40 text-orange-500 rounded-xl transition-all duration-200"
        >
          Add Media
        </button>
      </form>
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}