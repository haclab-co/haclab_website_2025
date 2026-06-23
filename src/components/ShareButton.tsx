import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = { title, text, url: url || window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or API not available
      }
    }
  };

  if (!navigator.share) return null;

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-mono text-slate-400 bg-slate-950 border border-slate-800 rounded-lg hover:text-white hover:border-slate-700 transition cursor-pointer"
      aria-label="Share this page"
    >
      <Share2 className="w-3.5 h-3.5" />
      <span>Share</span>
    </button>
  );
}
