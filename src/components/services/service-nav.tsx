import { Container } from "@/components/ui/container";
import { serviceDetails } from "@/lib/services";

export function ServiceNav() {
  return (
    <div className="sticky top-19 z-30 border-y-2 border-mist-100/10 bg-ink-950/95 backdrop-blur-md">
      <Container>
        <nav
          aria-label="Jump to a service"
          className="scrollbar-none -mx-1 flex gap-2.5 overflow-x-auto px-1 py-3.5"
        >
          {serviceDetails.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="group inline-flex shrink-0 items-center gap-2 border-2 border-mist-100/15 px-4 py-2 font-mono text-[11px] font-black tracking-[0.14em] whitespace-nowrap text-mist-400 uppercase transition-colors duration-300 hover:border-brand-400 hover:bg-brand-400 hover:text-ink-950"
            >
              <service.icon
                className="size-4 text-mist-500 transition-colors duration-300 group-hover:text-ink-950"
                strokeWidth={2}
              />
              {service.title}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
