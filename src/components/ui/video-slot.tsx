import { Play } from "lucide-react";

export function VideoSlot({ title }: { title: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl bg-ink text-primary-fg shadow-[var(--shadow-border)]">
      <div className="grid aspect-video place-items-center px-4 text-center">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-fg/15">
            <Play className="size-7" strokeWidth={1.5} />
          </span>
          <p className="mt-3 font-display text-2xl">Vídeo do local</p>
          <p className="mt-1 text-sm text-primary-fg/80">
            Reservado para o filme da palpação de {title}. Ainda sem arquivo — o mapa e o texto
            ficam.
          </p>
        </div>
      </div>
    </div>
  );
}
