import React from "react";
import { capitalizeFirstLetter } from "@/src/lib/string-utils";

/** Normalized city slug from URL / context (e.g. bangalore, hsr_layout). */
function srpCityKey(city: string): string {
  return (city || "bangalore").trim().toLowerCase().replace(/\s+/g, "_");
}

/** Title-case label for copy (e.g. "Bangalore", "Hsr Layout"). */
export function srpCityLabel(city: string): string {
  return srpCityKey(city)
    .split("_")
    .map((w) => capitalizeFirstLetter(w))
    .join(" ");
}

function areaLabel(area?: string): string {
  if (!area) return "";
  return String(area)
    .trim()
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .map((w) => capitalizeFirstLetter(w))
    .join(" ");
}

export type SrpColivingFaqItem = {
  id: string;
  qstn: string;
  ans: string;
};

export type SrpColivingFaqCategory = {
  title: string;
  anchorId: string;
  items: SrpColivingFaqItem[];
};

type SrpGenderSlug = "male only" | "female only" | undefined;

/** Grouped coliving FAQs for city SRP—used for TOC + accordion + FAQPage schema (non-Kota). */
export function getColivingFaqCategoryGroups(
  city: string,
  area?: string,
  slugGender?: SrpGenderSlug
): SrpColivingFaqCategory[] {
  const label = srpCityLabel(city);
  const key = srpCityKey(city);
  const areaName = areaLabel(area);
  const areaWithCity = areaName ? `${areaName}, ${label}` : label;
  const genderAudienceLabel =
    slugGender === "male only"
      ? "gents PG residents"
      : slugGender === "female only"
        ? "ladies PG residents"
        : "coliving residents";
  const isBangalore = key === "bangalore";
  const foodExtra =
    key !== "bangalore"
      ? "Many properties include or offer meal options—confirm on the listing or with our team. "
      : "Meal plans vary by property—check the listing or ask during your visit. ";

  const basics: SrpColivingFaqCategory = {
    title: "Coliving basics",
    anchorId: "faq-coliving-basics",
    items: [
      {
        id: "what-is-coliving",
        qstn: "What is coliving?",
        ans: `Coliving is a fully furnished, professionally managed rental format built for people who want a private or shared bedroom but do not want to run a household alone. Along with your room you share lounges, dining areas, and often quiet zones for work; housekeeping, basic maintenance coordination, and building operations sit with the operator instead of you chasing landlords, brokers, or random vendors. That structure matters in busy cities like ${label}, where commute time and work schedules already eat your week—coliving is meant to shrink “life admin” so you can focus on your job or degree and still meet neighbours through planned community moments. HelloWorld applies this model with consistent branding, on-site teams, and listing-level transparency about what each home includes.`,
      },
      {
        id: "coliving-vs-pg",
        qstn: `How is coliving different from a PG in ${label}?`,
        ans: `A PG in ${label} might mean anything from a small room with mess food to a tolerably run house, but standards jump wildly between streets. Billing may bundle food and power loosely, rules may change verbally, and upkeep depends on the owner’s responsiveness. Coliving, as HelloWorld runs it, aims for repeatable service design: published amenities, documented guest and access rules, housekeeping cadence you can verify, and staff accountable to a central playbook rather than a single proprietor. For comparison shopping that difference matters: read the PG’s fine print line by line, then read HelloWorld’s inclusion table and agreement—the goal is that the website, the tour, and the contract describe the same product. If you hate negotiating rent receipts, Wi‑Fi outages, or “owner will fix it next week,” coliving is the category most aligned with predictable urban living.`,
      },
      {
        id: "coliving-vs-flat",
        qstn: `Is coliving better than renting a flat in ${label}?`,
        ans: `Renting an independent flat in ${label} can be cheaper on paper if you already own a bed, sofa, fridge, and washing machine—or if you split a large lease with friends you trust. You still pay brokerage in many cases, manage utilities, repair ACs or geysers yourself, argue over maid schedules, and budget interior wear and tear. Coliving trades some absolute freedom for bundled convenience: you move into furniture, Wi‑Fi patterns, housekeeping, and security layers that are already live on day one. The right choice is not “flat bad / coliving good”—it is total monthly cost including commute, furnishing amortised over your stay, and hours spent on admin. Young professionals on tight deadlines, newcomers to ${label}, and couples testing the city often pick coliving for speed; families or long-tenure renters sometimes still prefer flats when they want to customise every wall.`,
      },
      {
        id: "commute-first",
        qstn: `How important is commute time when choosing coliving in ${label}?`,
        ans: `Commute quality often matters more than headline rent in ${label}. A room that is ₹2,000 cheaper can become expensive if you lose 1-2 extra hours daily in traffic, spend more on cabs, and burn energy before work even begins. Evaluate homes by door-to-desk time during actual peak hours, last-mile reliability, and safety after late shifts—not just by pin distance on maps. As a practical rule, shortlist properties that keep one-way commute predictable for your routine, then compare rent and inclusions within that shortlist.`,
      },
      {
        id: "why-helloworld",
        qstn: `Why choose HelloWorld coliving in ${label}?`,
        ans: `HelloWorld invests in the same pillars people compare across PG, hostel, and coliving brands in ${label}: security hardware and protocols, housekeeping you can see on tour, internet suitable for real work, hot water and power-backup clarity, and managers who answer when something breaks. We also invest in resident experience—community events, communication channels, and onboarding that explains house rules before money changes hands. You still must pick the exact property that matches your budget, gender policy, and room type; HelloWorld’s advantage is that those variables are surfaced on listings instead of discovered after you have shifted luggage. If you are researching “coliving in ${label}” or “PG alternative in ${label},” use HelloWorld when you want operator-grade consistency rather than one-off PG uncertainty.`,
      },
      {
        id: "unisex-gender",
        qstn:
          slugGender === "male only"
            ? `Are gents PG options available in ${areaWithCity}?`
            : slugGender === "female only"
              ? `Are ladies PG options available in ${areaWithCity}?`
              : `Are men-only, women-only, or unisex coliving options available in ${label}?`,
        ans:
          slugGender === "male only"
            ? `Yes. This page already targets gents PG inventory in ${areaWithCity}. Listings shown here are filtered for male residents and can include private or sharing rooms based on availability. Confirm exact policy, room type, and building rules before booking.`
            : slugGender === "female only"
              ? `Yes. This page already targets ladies PG inventory in ${areaWithCity}. Listings shown here are filtered for female residents and can include private or sharing rooms based on availability. Confirm exact policy, room type, and building rules before booking.`
              : `${label} draws students, interns, and professionals with different comfort needs—some want women-only floors, others want boys-only hostels for coaching seasons, and many want inclusive unisex buildings with strict behaviour rules instead of informal mixing. HelloWorld mirrors that reality by offering different resident mixes on different assets. Listings state whether a home is open to all genders, restricted to women, or oriented to men where applicable, along with room layouts such as single or sharing. Always confirm at booking: neighbourhood safety, personal preference, and company HR policies may all point to a specific configuration. Never assume “coliving equals unisex everywhere”; the responsible answer is always “check this building’s live policy on the site and in your agreement.”`,
      },
      {
        id: "couples",
        qstn: `Can couples stay together at HelloWorld in ${label}?`,
        ans: `Couples typically need a private room and explicit permission under the stay agreement—some operators forbid cohabitation in shared rooms for policy reasons, others allow couples only in select towers. HelloWorld treats this as contract-first: if a home accepts couples, it will be clear before you pay; if not, forcing the issue creates eviction and deposit risk. Book a joint viewing, ask how billing and security deposit work for two occupants, and confirm visitor rules so you are not surprised when family visits ${label}. If you are comparing coliving with married housing or studio flats for couples, weigh privacy, total rent, and whether you need a kitchen you fully control—coliving couples usually prioritise hassle-free move-in near both partners’ offices.`,
      },
      ...(areaName
        ? [
            {
              id: "area-specific-fit",
              qstn: `Is ${areaName} a good area for coliving in ${label}?`,
              ans: `${areaName} can be a strong choice when your office, college, or daily routes are nearby and your commute stays predictable in peak hours. When evaluating homes in ${areaWithCity}, prioritise real travel time, evening safety on approach roads, food and pharmacy access, and auto/cab reliability after 9 PM. A slightly higher rent in the right micro-market is often worth it if it saves 1-2 hours of daily travel and reduces transport spend volatility.`,
            },
            {
              id: "area-gender-fit",
              qstn:
                slugGender === "male only"
                  ? `Who should choose gents PGs in ${areaWithCity}?`
                  : slugGender === "female only"
                    ? `Who should choose ladies PGs in ${areaWithCity}?`
                    : `Who should choose these ${genderAudienceLabel} options in ${areaWithCity}?`,
              ans:
                slugGender === "male only"
                  ? `Choose this page if you are specifically looking for male-only PG options in ${areaWithCity}. It helps reduce irrelevant listings and keeps your shortlist aligned to resident policy from the start.`
                  : slugGender === "female only"
                    ? `Choose this page if you are specifically looking for female-only PG options in ${areaWithCity}. It helps reduce irrelevant listings and keeps your shortlist aligned to resident policy from the start.`
                    : `Choose these options if you want professionally managed stays in ${areaWithCity} with clear policies, amenities, and commute convenience. Pick a resident mix that matches your comfort and safety preferences.`,
            },
          ]
        : []),
    ],
  };

  const rentFood: SrpColivingFaqCategory = {
    title: "Rent, food, utilities & amenities",
    anchorId: "faq-rent-food",
    items: [
      {
        id: "what-rent-includes",
        qstn: `What does rent include at HelloWorld coliving in ${label}?`,
        ans: `HelloWorld coliving rent in ${label} is meant to bundle the essentials working residents and students actually use every day: high-usage Wi‑Fi, continuous hot water for showers, housekeeping of rooms and shared areas on a published schedule, and access to lounges or kitchens your agreement names. ${foodExtra}Items such as sub-meter electricity, vehicle parking, premium meal upgrades, or AC surcharge layers should never be surprise line items—if they are not in your contract, you should not be charged. Before signing, ask the manager to walk you line by line against the website so your understanding of coliving rent matches PG conversations you may have had in Koramangala, HSR, Whitefield, or whichever pocket of ${label} you shortlist. That discipline protects your monthly budget and avoids the arguments that start when marketing pages and invoices disagree.`,
      },
      {
        id: "typical-cost",
        qstn: `What is the typical monthly cost for coliving in ${label}?`,
        ans: `There is no honest single rupee figure for “all of ${label}” because rent moves with micro-market, tower age, room privacy, AC, meals, and seasonality—what looks cheap in one corridor may be expensive after you add cab spend. HelloWorld publishes indicative pricing per listing so you compare apples-to-apples inside our portfolio; outside it, stack deposit, electricity or meal actuals, and the cost of a bad commute. Professionals often anchor total cost of living around rent plus transport plus food variance; students add coaching fees and travel home. Treat each HelloWorld card as your ground truth and talk to sales if the website and quote differ—ranges and drivers matter more than a made-up city-wide average.`,
      },
      {
        id: "true-monthly-cost",
        qstn: `How do I calculate the true monthly cost (not just rent) in ${label}?`,
        ans: `Use a full-cost checklist before booking: monthly rent, security-deposit float, electricity (especially AC months), food/meal gap, daily commute cost, and likely "surprise spend" such as late-night cabs or ad-hoc add-ons. Then compare those totals across 2-3 shortlisted homes in the same commute corridor. This method is more accurate than comparing rent alone and helps you avoid false bargains that look cheap on listing cards but cost more over 3-6 months.`,
      },
      {
        id: "electricity",
        qstn: "How are electricity and utilities billed?",
        ans: `Electricity is one of the most argued line items in PG and coliving reviews nationwide, so HelloWorld prefers explicit wording: if your room or flat meter is sub-billed, your agreement states the split formula between roommates and how readings are taken; if a fixed amount covers usage up to a ceiling, that ceiling is written. Water is commonly included in urban coliving where tanker or STP logistics are centralised, but still confirm. Do not rely on verbal assurances from previous tenants—billing practices change when operators update hardware. If you are sensitive to summer AC bills, ask for a sample month from summer or a cap policy before you commit; that single conversation prevents the “my PG electricity doubled” stories you see on forums about ${label}.`,
      },
      {
        id: "food-quality",
        qstn: `How is food at HelloWorld compared with PGs and hostels in ${label}?`,
        ans: `Food quality is where many ${label} PGs win marketing but lose retention—oil-heavy mess food, irregular timing, and hygiene gaps push people toward Swiggy budgets they did not model. Where HelloWorld lists meals, we emphasise clean kitchens or vendor partners, predictable breakfast and dinner windows for nine-to-six commuters, and tasting on your tour. Compare that to hostels near colleges that prioritise volume over variety. Vegetarian-only homes, egg-inclusive plans, or no-meal homes each exist; spell out allergies and fasting needs early. When the operator is accountable end-to-end, coliving meal programs can match or beat inconsistent PG kitchens—you verify that on the tasting visit, not the brochure.`,
      },
      {
        id: "laundry-housekeeping",
        qstn: "How often is housekeeping or laundry handled?",
        ans: `Housekeeping frequency is a hygiene and mental-health issue, not a luxury: rooms in humid Indian cities pick up mould if mopping slips, and shared bathrooms in ${label} traffic need daily attention. HelloWorld specifies room cleaning versus common-area cleaning in property SOPs—some homes are multiple times a week for rooms, others align to cost tiers. Laundry might mean coin machines, partner pickup-drop, or none; do not assume “coliving equals unlimited laundry.” Ask whether linens are changed on a schedule and how sanitisation protocols evolved after COVID. The more concrete your tour questions, the fewer move-in surprises you carry into the first month.`,
      },
      {
        id: "ac-rooms",
        qstn: "Are AC rooms available—and does AC change my bills?",
        ans: `AC rooms are standard premium inventory in warm-season markets; base rent is higher than non-AC, and electricity actuals swing in April–June unless your deal caps usage. HelloWorld lists AC vs non-AC clearly so you do not pay AC rent unknowingly. If you work nights and sleep days, AC economics differ from a student on campus six hours; model both rent delta and power bills. In ${label}, power cuts and inverter behaviour also interact—ask whether AC runs on backup or only common lights do.`,
      },
      {
        id: "parking",
        qstn: "Is parking available at HelloWorld coliving?",
        ans: `Two-wheeler parking is the realistic default in dense ${label} layouts where basement car counts are tiny; many HelloWorld assets allocate covered or open scooter bays with numbering. Car parking may be wait-listed, paid monthly, or unavailable—city centre towers simply lack turning radii. Cyclists should ask about rack security. If you rely on Ola office runs, parking may be irrelevant; if you own a bike for ORR commutes, it is existential. Capture the exact monthly parking add-on, if any, in your spreadsheet beside rent so you are not comparing a cheaper PG that hides parking fees against coliving that states them upfront.`,
      },
      {
        id: "room-types",
        qstn: "Do you offer private rooms and shared rooms?",
        ans: `HelloWorld carries private studios or single-occupancy bedrooms where you control the door lock, plus double or triple-sharing layouts where per-bed pricing keeps entry rent lower for early-career roles in ${label}. Roommate matching rules, gender separation inside suites, and bathroom-sharing ratios belong in your agreement. Demand for private rooms spikes during appraisal season and college intake; sharing rooms turn faster but need clearer house rules on guests. Whether you search “single room coliving” or “sharing PG alternative,” the listing should state inventory class transparently—refresh the page often because availability changes weekly in high-demand corridors.`,
      },
    ],
  };

  const booking: SrpColivingFaqCategory = {
    title: "Booking, stay length & move-out",
    anchorId: "faq-booking",
    items: [
      {
        id: "booking-payments",
        qstn: "How does booking work—token, deposit, and rent?",
        ans: `The booking path is designed so you understand cashflow before luggage reaches ${label}: a token starting at ₹999 blocks inventory, adjusts into your first month’s rent, and is forfeited if you walk away after committing—think of it as seriousness money, not a junk fee. Before key handover you clear the refundable security deposit and the rent block defined in your offer letter. Each month afterward, full rent plus any contractually listed actuals is due before the 5th to avoid late-payment clauses that exist to keep payroll and vendor pays orderly across hundreds of beds. None of this replaces legal diligence—if a sales chat, WhatsApp forward, and PDF disagree, the signed agreement wins.`,
      },
      {
        id: "visit-before-booking",
        qstn: "Can I visit the property before I pay?",
        ans: `Virtual photos cannot capture mould behind wallpaper, bass from the road, or whether mess timings fit your shift—the strongest bookings still come after a physical walk-through in daylight and, if possible, an evening pass when safety feelings change. Schedule through HelloWorld’s official booking or sales desk so you are escorted legitimately and see the exact category—classic, premium, or women-only tower—you would pay for. Bring a tape measure if you ship oversized furniture, sniff common toilets, and test shower pressure. Informed visits reduce move-in surprises and the review friction that hurts every operator when expectations drift.`,
      },
      {
        id: "documents",
        qstn: "What documents do I need to book and move in?",
        ans: `KYC is both a regulatory and a community-safety requirement: government photo ID (typically Aadhaar), sometimes passport for NRIs, college or company offer letters for age and legitimacy, and parent contact for minors where policy demands. Landlords across ${label} increasingly refuse move-in without e-verified documents because police exit forms expect traceability. Upload clean scans early—blurry PDFs ping-pong in email and delay bed assignment. If you are an international assignee, passport plus visa plus FRRO rules matter; don’t assume domestic student checklists apply.`,
      },
      {
        id: "digital-agreement",
        qstn: "Are HelloWorld rental agreements signed digitally valid?",
        ans: `Digital execution—with OTP, Aadhaar-linked verification, or authorised e-sign platforms—is commonplace in Indian rental tech because paper lost in courier bags blocked ${label} move-ins during monsoon and lockdown waves. Courts look at consent, identity linkage, and contract terms, not whether you touched a physical pen. HelloWorld still recommends you download the final PDF, store it cloud-side, and reconcile annexures (inclusion lists, move-out policies) against marketing pages. If a clause confuses you, pause signing and get written clarification inserted or emailed.`,
      },
      {
        id: "minimum-stay",
        qstn: "Is there a minimum stay or lock-in period?",
        ans: `Lock-ins exist because operators amortise setup cost—deep cleaning, marketing, sales time—across months; without them, churn would raise everyone’s rent. Your lock-in, early-exit penalty, and renewal CPI-style bump must be explicit in ${label} contracts, not hallway rumours. If you probation a new job for three months, say so before you sign a twelve-month grid; sometimes inventory supports shorter tenures at slight premia. Renewals should renew terms in writing—auto-renew silence causes deposit disputes nationwide.`,
      },
      {
        id: "transfer-property",
        qstn: `Can I move to another HelloWorld home in ${label} later?`,
        ans: `Life changes—promotions to another tech park, campus shifts, or roommate breakups—so internal transfers between HelloWorld towers in ${label} are a frequent request. Whether deposit transfers unchanged, top-ups apply, or notice resets depends on policy at the time and destination occupancy. Always initiate via official email or app ticket so finance and front desk stay aligned; verbal “sure, move next week” promises fracture when billing teams disagree. Document condition reports at both ends to avoid painting charges.`,
      },
      {
        id: "notice-refund",
        qstn: "What about notice period and security deposit refund?",
        ans: `Deposit refunds anchor trust: your agreement states notice length (commonly thirty to sixty days in managed housing), acceptable handover state, and refund SLA after meter finalisation. Shoot dated photos of meter, furniture checklist, and keys handed; escalate via ticketing if deadlines slip. Some ${label} operators levy painting or lock-rekey fees—challenge anything not pre-disclosed. Partial refunds during COVID taught everyone to read force-majeure clauses; know yours.`,
      },
      {
        id: "hidden-charges",
        qstn: "Are brokerage or hidden charges part of HelloWorld coliving?",
        ans: `Traditional PG brokers in lanes near colleges still clip one month from tenant and owner; HelloWorld’s direct digital funnel removes that line item but not every possible charge—parking, peak AC, locker keys, or third-party meal upgrades may still apply when chosen. If it is not labelled on the rate card or annexure, challenge it before you NEFT. Budget holistically: rent, deposit float, electricity band, commute, and personal food slack.`,
      },
      {
        id: "shortlist-scorecard",
        qstn: `What is a practical way to shortlist the best coliving option in ${label}?`,
        ans: `Use a simple scorecard before paying token: rate each shortlisted home on commute reliability, cleanliness, internet/power reliability, safety controls, and policy clarity (deposit, notice, guest rules). Reject options that are vague on contract terms even if rent looks attractive. A repeatable scorecard helps you compare homes objectively and reduces post-move surprises, especially in fast-moving rental markets where urgency can push rushed decisions.`,
      },
    ],
  };

  const safety: SrpColivingFaqCategory = {
    title: "Safety, access & curfew",
    anchorId: "faq-safety",
    items: [
      {
        id: "safety-features",
        qstn: `Is HelloWorld coliving in ${label} safe for students and professionals?`,
        ans: `Safety stacks in layers rather than slogans: access cards or biometrics cut random walk-ins, CCTV in lobbies and corridors supplies audit trails when incidents occur, fire extinguishers and assembly plans must pass municipal norms, and night staff or roving guards rotate on schedules you can ask to see. None of that removes common sense—walk the lane at 22:00, check street lighting, note auto availability on ride-hail maps, and ask how female residents return from airports. In ${label}, micro-markets differ sharply; compare busy nightlife pockets with quieter inner residential roads before you sign.`,
      },
      {
        id: "women-safety",
        qstn: "Is there women-only coliving or girls-only floors?",
        ans: `Women-only inventory exists because many families and employers insist on restricted access, separate laundry timelines, and female front-of-house staff patterns. Listings will say “girls only” or “women’s floor” explicitly; mixed buildings may still place women-only suites behind another door. Ask how male maintenance enters, how male guests are handled in lounges, and whether security doubles during festival weeks. Transparent answers up front help anyone comparing ladies PG options with coliving avoid surprises after move-in.`,
      },
      {
        id: "curfew",
        qstn: "Is there a night curfew at HelloWorld?",
        ans: `Hard curfews belong to strict hostel operators; coliving toward working professionals usually balances 24/7 resident access with controlled guest hours so security staff sleep too. Gates may lock after midnight for tailgating prevention while residents badge through. Quiet-hour clauses still matter—drums at 02:00 invite eviction. Read whether liquor is permitted in rooms, how festivals adjust rules, and what happens if you lose your access token at 03:00. Those specifics answer searches comparing PG curfew rules with coliving flex.`,
      },
      {
        id: "guests-policy",
        qstn: "What is the guest and visitor policy?",
        ans: `Visitor policies protect everyone from stalking risk and mattress damage: daytime guests often sign in with ID; overnight guests may require pre-registration, extra charge, or be disallowed in sharing rooms. Couples should not assume partner stays match informal PG laxity—coliving agreements can be stricter. Large friend groups for birthdays belong in party rooms or outside bookings, not echoing corridors. Document whatever exceptions sales promises; undocumented leniency evaporates when a new manager rotates in.`,
      },
    ],
  };

  const life: SrpColivingFaqCategory = {
    title: "Daily life, WFH & maintenance",
    anchorId: "faq-daily-life",
    items: [
      {
        id: "visitors",
        qstn: "Can friends or family visit or stay overnight?",
        ans: `Friends and parents visiting ${label} for a weekend should feel welcome if you register them, stick to quiet hours, and avoid overloading shared kitchens. Overnight stays bump complexity: extra water usage, security uncertainty for roommates, and insurance grey zones if someone is injured. HelloWorld generally allows what your contract allows—no oral “manager said okay” without email backup. If you host parents for a week, discuss tariff impact upfront to avoid accounting fights at checkout.`,
      },
      {
        id: "wfh",
        qstn: "Can I work from home—Wi‑Fi, desks, and power backup?",
        ans: `Post-2020, “WFH-ready” is table stakes: symmetrical fibre or enterprise-grade broadband, UPS or genset coverage for routers and lifts, and desks deep enough for dual monitors in private rooms. HelloWorld expects residents on global Zoom hours—ask for Mbps guarantees and contention ratios, not marketing buzzwords. If backup excludes AC but includes lights plus router, know that before July afternoons in ${label}. Ethernet ports still win over Wi‑Fi for latency-sensitive roles; request LAN if you trade or edit video.`,
      },
      {
        id: "community-events",
        qstn: "What are HelloWorld community events?",
        ans: `Community is not forced fun—it is structured ice-breaking so newcomers in ${label} do not eat dinner alone for a month. Typical calendars mix fitness, movie marathons, festival sweets, and skill shares pitched by residents themselves. Attendance is voluntary; introverts can skip without guilt. Events also help staff notice unfamiliar faces faster when regulars recognise each other. Document photo consent rules for social posts.`,
      },
      {
        id: "on-site-support",
        qstn: "Who do I contact for help day-to-day?",
        ans: `Front-desk property managers batch keys, vendor coordination, and resident concerns; escalate to city ops when systemic failures repeat. Official WhatsApp or app channels beat DMs to personal numbers—they archive timelines if disputes arise. Know who covers Sunday noon when the main manager is off—good operators publish rosters. For mental-health crises or harassment, ask if HR partners or helplines exist beyond rent collection.`,
      },
      {
        id: "maintenance",
        qstn: "How do maintenance and repairs work?",
        ans: `Ticket systems exist so dripping taps do not die in verbal queues: logging photo evidence, SLA buckets (“urgent leak” versus “cosmetic paint”), and vendor SMS notifications. You should receive acknowledgement timestamps; chase politely if breached. Common pitfalls in ${label} humidity are AC drip trays, grout mould, and lift outages—ask seasonal prep. Do not DIY electrical fixes in licensed buildings.`,
      },
      {
        id: "pets",
        qstn: "Are pets allowed?",
        ans: `Allergies, noise complaints, and municipal bylaws make pets rare in shared housing; some pilots allow cats in sealed private rooms with deposits for claw damage, but default is no. Service animals require legal paperwork, not informal requests. Violating pet bans risks eviction plus deep cleaning fees. If you must cohabit with a pet in ${label}, ask early rather than smuggle an animal through security.`,
      },
    ],
  };

  const groups: SrpColivingFaqCategory[] = [
    basics,
    rentFood,
    booking,
    safety,
    life,
  ];

  if (isBangalore) {
    groups.push({
      title: "Bengaluru (Bangalore) city guide",
      anchorId: "faq-bengaluru-guide",
      items: [
        {
          id: "locality-choice-blr",
          qstn:
            "How do I choose a locality for coliving in Bengaluru or Bangalore?",
          ans: `Bengaluru rewards commuters who anchor on office gates, campus turnstiles, or reliable metro/BMTC spines before they obsess over café culture. The Outer Ring Road tech ribbon from Bellandur through Kadubeesanahalli to Marathahalli hosts enormous IT employment; Manyata and HRBR clusters dominate north tech; Whitefield and Mahadevapura pull EPIP and Graphite-era parks; Electronic City Phase 1 and 2 hold firms that resist CBD relocations; Indiranagar, Koramangala, HSR, Domlur, and BTM blend nightlife with shorter hops to central startups. Rent arbitrage exists in outer wards, but long peak-hour rides erode salary gains—model petrol, surge pricing, and sleep loss, not just rupee rent. HelloWorld’s geo-distributed inventory lets you match micro-market to your actual calendar instead of chasing the cheapest pin on a map.`,
        },
        {
          id: "blr-it-students",
          qstn:
            "Which areas of Bengaluru are best for IT professionals or students?",
          ans: `IT professionals prioritise ORR adjacency, Manyata–Thanisandra belt access, or Whitefield–ITPL radii depending on badge campus; hybrid workers optimise quiet rooms and backup power inside the home since café hopping in Koramangala grows expensive. Students map to Christ, Jain, RV, Dayananda Sagar, Reva, or coaching alleys with late autos and safe street lamps—parents often screen girls’ housing with extra care. Intern cohorts cluster short leases near internship towers. Rather than declaring one “best” pin, evaluate time-to-desk at 09:00 and return after 21:00; HelloWorld listings across these hubs exist so you filter realistically.`,
        },
        {
          id: "cost-living-blr",
          qstn: "What should I budget beyond rent for living in Bengaluru?",
          ans: `Beyond coliving rent, model electricity actuals—summer AC can rival a week’s groceries—plus personal transport (Namma Metro passes versus app cab spill when Purple Line clogs), weekend social spend in Indiranagar lanes, health emergencies, and flights home. Some HelloWorld plans bundle meals; if not, track food-delivery drift. Deposits tie up one-to-two months’ rent in escrow. Student laptops and bondable gadgets matter for insurance riders. Always tie budget back to commute: a cheaper room far from work can erase savings in cab fares.`,
        },
        {
          id: "safety-blr",
          qstn:
            "Is HelloWorld coliving in Bengaluru safe for women and working professionals?",
          ans: `Bengaluru remains a top migration magnet because talent demand outstrips supply, but women professionals still scrutinise lanes near liquor retail, auto behaviour late at night, and cab PIN sharing norms. HelloWorld stacks biometric or RFID access, CCTV in shared paths, visitor logs, and staff escalation playbooks; women-only inventory exists where demand justifies separate towers or floors. None of this replaces walking the neighbourhood after dark with headphones off, checking auto stands, and saving local police station maps. Align with colleagues on informal safety circles if you work similar shifts.`,
        },
        {
          id: "metro-commute-blr",
          qstn:
            "How does Namma Metro or BMTC factor into picking a HelloWorld home?",
          ans: `Metro coverage expansion reshapes Bengaluru weekly—Green Line stitches eastern IT to CBD pockets; Purple Line feeds airport transfers; upcoming corridors may flip “too far” nodes overnight. Still, last-mile autorickshaw negotiation from station to gated coliving matters: one kilometre of mud road negates train reliability. BMTC Volvo routes from IT corridors to residential wards remain lifelines when ride-hail surges during rain. Test Tuesday morning reality, not Sunday map estimates. Ask HelloWorld teams which exits residents actually use and whether shuttle tie-ups exist.`,
        },
      ],
    });
  }

  return groups;
}

const faq = (city: string, area?: string, slugGender?: SrpGenderSlug) => {
  const kotaFaq = [
    {
      qstn: `Are there good PGs/ Hostels in ${city} for students? `,
      ans: `Hostels in Kota or PGs are rental accommodations that offer living services based on your requirements. From AC rooms to homes inclusive of food/ amenities and parking spaces. And Kota has many PGs and hostels as the student population is always looking for affordable stays in the city.`,
      id: "tab-1",
      htmlFor: "tab-1",
    },
    {
      qstn: `How do I look for a student hostel in Kota?`,
      Answer: (
        <div>
          <p>
            <b>
              Searching for a student living hostel is very easy today. You can
              pick the medium most convenient for you:
            </b>
          </p>
          <ul>
            <li>Social media (Facebook, Instagram, Advertisements)</li>
            <li>Local PG and Hostels</li>
            <li>Brokers/ Word of mouth</li>
            <li>Real Estate Platforms</li>
            <li>Rental Applications like HelloWorld Hostels in Kota</li>
          </ul>
        </div>
      ),
      id: "tab-2",
      htmlFor: "tab-2",
    },
    {
      qstn: `How are HelloWorld Hostels in Kota different from local PG in Kota?`,
      Answer: (
        <div>
          <p>
            <b>
              HelloWorld hostels are better in various ways mentioned below:
            </b>
          </p>
          <ul>
            <li>HW Hostels have a positive and student-friendly environment</li>
            <li>
              HW Hostels offer fully-furnished rooms with premium amenities
            </li>
            <li>
              HW Hostels organize educational workshops and fun community events
            </li>
            <li>HW Hostels has daily housekeeping and laundry services </li>
          </ul>
        </div>
      ),
      id: "tab-3",
      htmlFor: "tab-3",
    },
    {
      qstn: `How’s the life of a resident at a hostel in Kota?`,
      Answer: (
        <div>
          <p>
            Life of a student living at a hostel in Kota is very eventful. With
            placing focus on IIT/ JEE coaching during the day, student-residents
            can spend their time off at the hostel lounge or use other
            facilities in the premises. And since most living quarters provide
            food and housekeeping services, there’s no additional work.
          </p>
        </div>
      ),
      id: "tab-4",
      htmlFor: "tab-4",
    },
    {
      qstn: `How are the PGs in Kota?`,
      Answer: (
        <div>
          <p>
            If you’re looking for a student housing that offers premium
            amenities and a peaceful environment, then local PGs aren’t going to
            do you good. Take up a room at HelloWorld Student Hostels in Kota
            instead and enjoy uninterrupted facilities like WiFi, DTH, healthy
            meals, community student events among others.
          </p>
        </div>
      ),
      id: "tab-5",
      htmlFor: "tab-5",
    },
    {
      qstn: `What are some branded PG’s/ student hostels in Kota?`,
      Answer: (
        <div>
          <ul>
            {/* <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-hawking-pg-in-kota-kunhari-415"
              >
                HelloWorld Hawking Hostel in Kota near Allen
              </a>
            </li>
            <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-emmy-pg-in-kota-kunhari-501"
              >
                HelloWorld Emmy Hostel in Kunhari, Kota
              </a>
            </li> */}
            <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-nasa-pg-in-kota-indraprastha_industrial_area-517"
              >
                HelloWorld Nasa Hostel in Kota near Resonance
              </a>
            </li>
            <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-kalpanachawla-pg-in-kota-kunhari-521"
              >
                HelloWorld Kalpana Chawla Hostel in Kota near Landmark City
              </a>
            </li>
          </ul>
        </div>
      ),
      id: "tab-6",
      htmlFor: "tab-6",
    },
    {
      qstn: `How much does it cost to stay at a hostel in Kota?`,
      Answer: (
        <div>
          <p>
            The prices for student accommodations vary depending on the
            facilities. Below are hostels that have all basic amenities and
            offer a good learning environment.
          </p>
          {/* <ul>
            <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-faraday-pg-in-kota-opp._il_gate-405"
              >
                HelloWorld Faraday
              </a>
            </li>
          </ul> */}
        </div>
      ),
      id: "tab-7",
      htmlFor: "tab-7",
    },
    {
      qstn: `What are the documents required to enroll in a student hostel in Kota?`,
      Answer: (
        <div>
          <p>
            Find the documents required for enrollment in a student hostel in
            Kota below:
          </p>
          <ul>
            <li>
              <b>Aadhaar Card/ PAN Card/ Driver’s License</b>
            </li>
            <li>
              <b>Completion of KYC formalities</b>
            </li>
          </ul>
        </div>
      ),
      id: "tab-8",
      htmlFor: "tab-8",
    },
    {
      qstn: `Are girls hostels safe in Kota?`,
      Answer: (
        <div>
          <p>
            With a smart lock in every room and 24/7 security in place,
            HelloWorld hostels for girls in Kota are very safe.
          </p>
          <ul>
            {/* <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-hazel-pg-in-kota-landmark_city-529"
              >
                HelloWorld Hazel
              </a>
            </li> */}
            <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-aryabhata-pg-in-kota-electronic_complex-754"
              >
                HelloWorld Aryabhata
              </a>
            </li>
            {/* <li>
              <a
                className="text-secondary"
                href="https://thehelloworld.com/hostels-in-kota/helloworld-mariecurie-pg-in-kota-instrumentation_limited_colony-524"
              >
                HelloWorld Marie Curie
              </a>
            </li> */}
          </ul>
        </div>
      ),
      id: "tab-9",
      htmlFor: "tab-9",
    },
    // {
    //   qstn: `What are some good areas to stay at when in Kota?`,
    //   Answer: (
    //     <div>
    //       <p>
    //         Students usually prefer to stay in areas near the institutes they
    //         get into:
    //       </p>
    //       <ul>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/allen-kota-hostel"
    //           >
    //             Hostels near Allen Institute
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/resonance-kota-hostel"
    //           >
    //             Hostels near Resonance
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/vibrant_academy-kota-hostel"
    //           >
    //             Hostels near Vibrant Academy
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/career_point-kota-hostel"
    //           >
    //             Hostels near Career Point
    //           </a>
    //         </li>
    //       </ul>
    //       <p>Some good areas in Kota are:</p>
    //       <ul>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/hostels-in-jawahar_nagar-kota"
    //           >
    //             Hostels in Jawahar Nagar Kota
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/hostels-in-dadabari-kota"
    //           >
    //             Hostels in Dadabari
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/hostels-in-indra_vihar-kota"
    //           >
    //             Hostels in Indra Vihar
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/hostels-in-landmark_city-kota"
    //           >
    //             Hostels in Landmark City
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-secondary"
    //             href="https://thehelloworld.com/hostels-in-electronic_complex-kota"
    //           >
    //             Hostels in Electronic Complex
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   ),
    //   id: "tab-10",
    //   htmlFor: "tab-10",
    // },
    {
      qstn: `How is the food in HelloWorld as compared to food at other PGs in Kota & Hostels?`,
      Answer: (
        <div>
          <p>
            HelloWorld Coliving & Student Hostels in Kota provides healthy and
            delectable food that’s made with high-quality ingredients.
          </p>
        </div>
      ),
      id: "tab-11",
      htmlFor: "tab-11",
    },
    {
      qstn: `What does the rent include in HelloWorld student hostels in Kota?`,
      Answer: (
        <div>
          <p>
            Fully-furnished room, all the meals, van service, WiFi connection
            and access to laundry/ community lounge among other facilities are
            inclusive of rent at HelloWorld student hostels in Kota.
          </p>
        </div>
      ),
      id: "tab-12",
      htmlFor: "tab-12",
    },
    {
      qstn: ` Can I have friends and family staying over?`,
      Answer: (
        <div>
          <p>
            Provided student-residents give a prior notice to the hostel warden,
            visitors are welcome to stay in the room.
          </p>
        </div>
      ),
      id: "tab-13",
      htmlFor: "tab-13",
    },
    {
      qstn: ` What are community events all about?`,
      Answer: (
        <div>
          <p>
            Unlike local PGs in Kota and Hostels in Kota, HelloWorld student
            hostels in Kota offers a student-resident all-round development
            during their stay. This includes participating in interactive events
            and socializing with fellow tenants in Kota during free time.
          </p>
        </div>
      ),
      id: "tab-14",
      htmlFor: "tab-14",
    },
    {
      qstn: ` Is the help desk open 24/7?`,
      Answer: (
        <div>
          <p>
            The property manager is available at the beck and call of the
            student-residents living at the premises.
          </p>
        </div>
      ),
      id: "tab-15",
      htmlFor: "tab-15",
    },
    {
      qstn: ` How can we pay the rent?`,
      Answer: (
        <div>
          <p>
            HelloWorld student hostels encourage parents or guardians to make
            the payment through the HelloWorld application to avoid any
            inconvenience.
          </p>
        </div>
      ),
      id: "tab-16",
      htmlFor: "tab-16",
    },
  ];
  if (city?.toLowerCase() === "kota") {
    return [...kotaFaq];
  }
  return getColivingFaqCategoryGroups(city, area, slugGender).flatMap((group) =>
    group.items.map((item) => ({
      qstn: item.qstn,
      ans: item.ans,
      id: item.id,
      htmlFor: item.id,
    }))
  );
};

/**
 * Plain-text FAQ list for JSON-LD FAQPage schema (used on SRP pages).
 * Mirrors the FAQ content used in the UI.
 */
export function getFaqsForSchema(
  city: string,
  area?: string,
  slugGender?: SrpGenderSlug
): { question: string; answer: string }[] {
  const c = city || "bangalore";

  if (c.toLowerCase() === "kota") {
    const cityName = srpCityLabel(c);
    return [
      {
        question: `Are there good PGs/ Hostels in ${cityName} for students?`,
        answer:
          "Hostels in Kota or PGs are rental accommodations that offer living services based on your requirements. From AC rooms to homes inclusive of food/ amenities and parking spaces. And Kota has many PGs and hostels as the student population is always looking for affordable stays in the city.",
      },
      {
        question: "How do I look for a student hostel in Kota?",
        answer:
          "Searching for a student living hostel is very easy today. You can pick the medium most convenient for you: Social media (Facebook, Instagram, Advertisements), Local PG and Hostels, Brokers/ Word of mouth, Real Estate Platforms, or Rental Applications like HelloWorld Hostels in Kota.",
      },
      {
        question: "How are HelloWorld Hostels in Kota different from local PG in Kota?",
        answer:
          "HelloWorld hostels are better in various ways: HW Hostels have a positive and student-friendly environment, offer fully-furnished rooms with premium amenities, organize educational workshops and fun community events, and have daily housekeeping and laundry services.",
      },
      {
        question: "How's the life of a resident at a hostel in Kota?",
        answer:
          "Life of a student living at a hostel in Kota is very eventful. With placing focus on IIT/ JEE coaching during the day, student-residents can spend their time off at the hostel lounge or use other facilities in the premises. And since most living quarters provide food and housekeeping services, there's no additional work.",
      },
      {
        question: "How are the PGs in Kota?",
        answer:
          "If you're looking for a student housing that offers premium amenities and a peaceful environment, then local PGs aren't going to do you good. Take up a room at HelloWorld Student Hostels in Kota instead and enjoy uninterrupted facilities like WiFi, DTH, healthy meals, community student events among others.",
      },
      {
        question: "What are some branded PG's/ student hostels in Kota?",
        answer:
          "HelloWorld has multiple branded hostels in Kota including HelloWorld Nasa Hostel in Kota near Resonance, HelloWorld Kalpana Chawla Hostel in Kota near Landmark City, HelloWorld Faraday, and HelloWorld Aryabhata.",
      },
      {
        question: "How much does it cost to stay at a hostel in Kota?",
        answer:
          "The prices for student accommodations vary depending on the facilities. HelloWorld hostels have all basic amenities and offer a good learning environment.",
      },
      {
        question: "What are the documents required to enroll in a student hostel in Kota?",
        answer:
          "Documents required for enrollment in a student hostel in Kota: Aadhaar Card/ PAN Card/ Driver's License, and completion of KYC formalities.",
      },
      {
        question: "Are girls hostels safe in Kota?",
        answer:
          "With a smart lock in every room and 24/7 security in place, HelloWorld hostels for girls in Kota are very safe. HelloWorld Aryabhata is one such option.",
      },
      {
        question: "How is the food in HelloWorld as compared to food at other PGs in Kota & Hostels?",
        answer:
          "HelloWorld Coliving & Student Hostels in Kota provides healthy and delectable food that's made with high-quality ingredients.",
      },
      {
        question: "What does the rent include in HelloWorld student hostels in Kota?",
        answer:
          "Fully-furnished room, all the meals, van service, WiFi connection and access to laundry/ community lounge among other facilities are inclusive of rent at HelloWorld student hostels in Kota.",
      },
      {
        question: "Can I have friends and family staying over?",
        answer:
          "Provided student-residents give a prior notice to the hostel warden, visitors are welcome to stay in the room.",
      },
      {
        question: "What are community events all about?",
        answer:
          "Unlike local PGs in Kota and Hostels in Kota, HelloWorld student hostels in Kota offers a student-resident all-round development during their stay. This includes participating in interactive events and socializing with fellow tenants in Kota during free time.",
      },
      {
        question: "Is the help desk open 24/7?",
        answer:
          "The property manager is available at the beck and call of the student-residents living at the premises.",
      },
      {
        question: "How can we pay the rent?",
        answer:
          "HelloWorld student hostels encourage parents or guardians to make the payment through the HelloWorld application to avoid any inconvenience.",
      },
    ];
  }

  return getColivingFaqCategoryGroups(c, area, slugGender).flatMap((group) =>
    group.items.map((item) => ({
      question: item.qstn,
      answer: item.ans,
    }))
  );
}

export default faq;
