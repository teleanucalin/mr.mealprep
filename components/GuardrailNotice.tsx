import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { GuardrailViolation } from "@/lib/types";

interface GuardrailNoticeProps {
  violations: GuardrailViolation[];
}

export function GuardrailNotice({ violations }: GuardrailNoticeProps) {
  if (violations.length === 0) return null;

  const hasErrors = violations.some((v) => v.severity === "error");

  return (
    <Alert variant={hasErrors ? "destructive" : "default"}>
      {hasErrors ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>
        {hasErrors ? "Substituție blocată" : "Atenție la diferențe"}
      </AlertTitle>
      <AlertDescription>
        <ul className="list-disc list-inside space-y-1 mt-2">
          {violations.map((violation, i) => (
            <li key={i} className="text-sm">
              {violation.message}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

