import { createFileRoute } from "@tanstack/react-router";
import { Hand } from "lucide-react";
import { BackLink } from "@/components/ui/back-link";
import { EmptyState } from "@/components/ui/empty-state";

export const Route = createFileRoute("/massagem")({ component: MassagemPage });

function MassagemPage() {
  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <EmptyState
        icon={Hand}
        title="Massagem e pontos-gatilho"
        description="Esta seção fica aberta de propósito. No próximo ciclo entram mapas, meridians de tuina e gatilhos — sem inventar ponto agora."
      />
    </>
  );
}
