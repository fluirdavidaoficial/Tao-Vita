import { ImageOff } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function AtlasImage({
  src,
  alt,
  className,
  imgClassName,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-border/60", className)} style={style}>
      {!loaded && !failed ? <div className="skeleton absolute inset-0" /> : null}
      {failed ? (
        <div className="grid size-full min-h-14 place-items-center text-subtle">
          <ImageOff className="size-5" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "atlas-plate absolute inset-0 size-full object-cover transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
