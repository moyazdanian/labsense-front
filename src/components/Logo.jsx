export function Logo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="لوگو"
    >
      <defs>
        <linearGradient
          id="logo-bg"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#146B69" />
          <stop offset="1" stopColor="#0F2A2E" />
        </linearGradient>
      </defs>

      {/* بج پس‌زمینه */}
      <rect width="40" height="40" rx="11" fill="url(#logo-bg)" />

      {/* برگه‌ی گزارش با گوشه‌ی تاشده */}
      <path
        d="M12 8h8.6L26 12.6V31a1.6 1.6 0 0 1-1.6 1.6H12A1.6 1.6 0 0 1 10.4 31V9.6A1.6 1.6 0 0 1 12 8Z"
        fill="#F6F8F7"
      />
      <path
        d="M20.6 8v3.2a1.4 1.4 0 0 0 1.4 1.4H26"
        stroke="#C9D8D5"
        strokeWidth="1"
        fill="none"
      />

      {/* خطوط متن گزارش */}
      <rect
        x="13.4"
        y="15"
        width="8.2"
        height="1.3"
        rx="0.65"
        fill="#146B69"
        opacity="0.18"
      />
      <rect
        x="13.4"
        y="24.5"
        width="6.6"
        height="1.3"
        rx="0.65"
        fill="#146B69"
        opacity="0.18"
      />

      {/* خط اسکنر با پالس در وسط */}
      <path
        d="M13.4 19.6h2.8l1-2.4 1.4 4.8 1-2.4h4.6"
        stroke="#146B69"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* نقطه‌ی درخشان انتهای اسکن */}
      <circle cx="24.2" cy="19.6" r="1.5" fill="#E8A33D" />
    </svg>
  );
}
