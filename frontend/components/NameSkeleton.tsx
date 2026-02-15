export default function NameSkeleton() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className=" heading-3 w-14 h-5 rounded bg-slate-200 animate-pulse"></span>
      <span className=" heading-3 w-20 h-5 rounded bg-slate-200 animate-pulse"></span>
    </div>
  );
}
