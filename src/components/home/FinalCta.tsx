import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink, generalOrderMessage } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="py-20 md:py-28">
      <Reveal className="container-x text-center">
        <span aria-hidden className="mx-auto mb-8 flex w-fit gap-2">
          {["#a33b26", "#d8ccae", "#e0a12a", "#b3a374", "#6e8b3d", "#8a5a3c"].map((c) => (
            <span key={c} className="size-2.5 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <h2 id="cta-title" className="mx-auto max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] leading-[1]">
          Bring a taste of home to <em className="italic text-green">your</em> table.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          Order for your household, ask about a product, or talk to us about stocking Jibby Foods.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={whatsappLink(generalOrderMessage)} icon={<WhatsAppIcon className="size-[1.1rem]" />}>
            Order on WhatsApp
          </Button>
          <Button href="/contact" variant="secondary" icon={<ArrowRight className="size-4" />}>
            Send an enquiry
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
