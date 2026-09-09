import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export function AppNotFound() {
  return (
    <EmptyState
      icon={Compass}
      titleAs="h1"
      title="Página não encontrada"
      description="Esse caminho não existe no atlas. Volte ao início ou abra a consulta."
      action={
        <Button asChild>
          <Link to="/inicio">Ir ao menu</Link>
        </Button>
      }
    />
  );
}
