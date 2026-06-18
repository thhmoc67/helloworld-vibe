import { LocalityBentoHero } from "@/components/marketing/locality-bento-hero";
import {
  localityHeroSubtitle,
  localityPage,
} from "@/src/tokens/locality";

export function LocalityHero() {
  return (
    <LocalityBentoHero
      title={localityPage.title}
      subtitle={localityHeroSubtitle}
      heroImageSrc={localityPage.heroImageSrc}
      heroImageAlt={`Coliving in ${localityPage.name}`}
    />
  );
}
