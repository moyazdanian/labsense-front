import PaymentResult from "./PaymentResult";
import MedicalLoading from "@/components/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <MedicalLoading />
        </div>
      }
    >
      <PaymentResult />
    </Suspense>
  );
}
