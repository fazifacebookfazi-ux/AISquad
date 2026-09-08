import { Container } from "@/components/ui/container";
import { serviceDetails } from "@/lib/services";

export function ServiceNav() {
  return (
    <div className="border-y border-mist-100/[0.07] bg-ink-900/50">
      <Container>
        <nav
          aria-label="Jump to a service"
          className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto py-4"
        >
          {serviceDetails.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-mist-100/[0.08] bg-mist-100/[0.03] px-4 py-2 text-sm whitespace-nowrap text-mist-400 transition-colors duration-300 hover:border-brand-400/40 hover:text-mist-100"
            >
              <service.icon
                className="size-4 text-mist-500 transition-colors duration-300 group-hover:text-brand-300"
                strokeWidth={1.6}
              />
              {service.title}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
