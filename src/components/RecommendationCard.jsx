import { Apple, Sparkles, Dumbbell, Moon } from "lucide-react";

const recIcons = {
  food: Apple,
  food2: Apple,
  sun: Sparkles,
  exercise: Dumbbell,
  sleep: Moon,
};

export default function RecommendationCard({ icon, title, text }) {
  const Icon = recIcons[icon] || Apple;
  return (
    <div className="rounded-2xl border border-[#E0F1EF] p-4 flex gap-3 hover:border-[#0E7C7B]/30 transition-colors">
      <div className="w-9 h-9 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-[#0E7C7B]" strokeWidth={2} />
      </div>
      <div>
        <p className="text-sm font-bold text-[#0B2B2E] mb-1">{title}</p>
        <p className="text-xs text-[#5C7A7C] leading-6">{text}</p>
      </div>
    </div>
  );
}
