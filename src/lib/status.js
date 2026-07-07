import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";

export const statusStyles = {
  normal: {
    label: "طبیعی",
    dot: "bg-[#1F9D6B]",
    text: "text-[#1F9D6B]",
    bg: "bg-[#EAF8F1]",
    border: "border-[#CDEEDD]",
    Icon: CheckCircle2,
  },
  borderline: {
    label: "در آستانه",
    dot: "bg-[#D89A1F]",
    text: "text-[#B5800F]",
    bg: "bg-[#FBF3DF]",
    border: "border-[#F2E1B6]",
    Icon: AlertCircle,
  },
  danger: {
    label: "نیازمند توجه",
    dot: "bg-[#D14343]",
    text: "text-[#C13434]",
    bg: "bg-[#FBEAEA]",
    border: "border-[#F4CFCF]",
    Icon: AlertTriangle,
  },
};
