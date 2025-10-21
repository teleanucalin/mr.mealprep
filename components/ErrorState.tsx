import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorState({
  title = "A apărut o eroare",
  message,
  retry,
}: ErrorStateProps) {
  return (
    <div className="py-8">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">
          {message}
          {retry && (
            <Button
              variant="outline"
              size="sm"
              onClick={retry}
              className="mt-4"
            >
              Încearcă din nou
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

