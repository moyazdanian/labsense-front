// عنصر امضا: خط ضربان قلب (جداکننده انیمیشن‌دار بین بخش‌ها)
export default function HeartbeatDivider({ className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-10 text-[#0E7C7B]/25"
      >
        <line x1="0" y1="30" x2="1200" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
      </svg>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-10 text-[#0E7C7B]"
      >
        <path
          d="M0,30 L300,30 L335,8 L365,52 L400,30 L430,30 L460,18 L490,42 L520,30 L1200,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ekg-path"
        />
      </svg>
      <style>{`
        .ekg-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: draw-ekg 3.2s ease-in-out infinite;
        }
        @keyframes draw-ekg {
          0%   { stroke-dashoffset: 1400; }
          55%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1400; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ekg-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
