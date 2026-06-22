export default function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-brand-red/30 border-t-brand-red animate-spin" />
        <span className="text-sm font-mono text-slate-500">Loading workspace...</span>
      </div>
    </div>
  );
}
