/**
 * All portfolio content lives here. Edit this file to update text,
 * projects or images without touching the components.
 *
 * DRAFT = true  -> missing images show a dashed placeholder, and `fill` text is highlighted.
 * DRAFT = false -> missing images (and an empty Screenshots section) are hidden.
 */
export const DRAFT = false;

export const profile = {
  name: "Nguyen Thi Men",
  role: ".NET Developer · 7 years",
  tagline:
    "Full-stack .NET experience, strongest on the back end: async messaging, third-party integrations, sign-in and payments.",
  links: [
    { label: "Email", value: "ntmen98@gmail.com", href: "mailto:ntmen98@gmail.com" },
    { label: "Phone", value: "(+84) 868 647 331", href: "tel:+84868647331" },
    { label: "Location", value: "Ho Chi Minh City, Vietnam" },
  ] as { label: string; value: string; href?: string }[],
};

export const stats = [
  { n: "7+", l: "Years of .NET / C# development" },
  { n: "50+", l: "Event source crawlers built, 100+ maintained" },
  { n: "3", l: "Client markets: Vietnam, Japan, Australia" },
];

export const areas = [
  {
    title: "Async Processing & Integration",
    text: "Message-driven services and pipelines that crawl, queue and index external data.",
    tags: ["NServiceBus", "MSMQ", "Selenium WebDriver"],
  },
  {
    title: "Cloud & Search",
    text: "Object storage, centralised logging and full-text event search in a production SaaS platform.",
    tags: ["Amazon S3", "AWS CloudWatch", "Full-text search"],
  },
  {
    title: "Identity & Security",
    text: "Social and Microsoft sign-in, MFA and per-tenant authorization.",
    tags: ["OAuth 2.0 / OIDC", "Microsoft Entra ID", "Sign in with Apple", "TOTP MFA"],
  },
  {
    title: "Payments & Billing",
    text: "Per-tenant subscriptions and the full billing lifecycle.",
    tags: ["Stripe Billing", "Stripe Checkout & Customer Portal", "Webhooks"],
  },
];

export const toolbox = [
  { k: "Core", v: "C#, .NET Framework 4.8, ASP.NET Core, ASP.NET MVC 5, ASP.NET Web API, WCF" },
  { k: "Data & Messaging", v: "SQL Server, RavenDB, SQLite, MySQL, Entity Framework Core, Dapper, NServiceBus, MSMQ" },
  { k: "Architecture", v: "Message-driven back ends, multi-tenant SaaS, service-oriented (WCF / Web API) systems, dependency injection" },
  { k: "DevOps & Tooling", v: "TeamCity (CI/CD), Git, GitHub, GitLab, Jira, log4net, Windows Server, AI coding agents (spec-driven)" },
  { k: "Front-End & Desktop", v: "Razor, HTML, CSS, JavaScript, jQuery, Bootstrap, WPF, WinForms, GDI+" },
];

export const featured = {
  eyebrow: "Groove Technology · Australian Client",
  title: "Multi-tenant SaaS Platform for the Events Industry",
  facts: [
    { k: "Role", v: "Main Back-End Developer" },
    { k: "Period", v: "Apr 2022 – Present" },
    { k: "Team", v: "5 · PM, TL, BE, FE, QC" },
    { k: "Stack", v: "C# · .NET" },
  ],
  overview: [
    {
      k: "The product",
      v: "A multi-tenant SaaS platform for discovering and managing events, aggregating event data from third-party sources.",
    },
    {
      k: "My role",
      v: "Main back-end developer on a platform already in production. I clarify business rules with the product team, write the back-end spec with its edge cases, then take the feature through AI-assisted implementation, verification and production support, with code review and technical direction from the team's tech lead.",
    },
    {
      k: "Collaboration",
      v: "Worked directly with the client's product team to discuss features, clarify specs and share technical updates.",
    },
  ],
  scope: [
    { title: "Data Ingestion", text: "Built 50+ source crawlers and maintained 100+ more, with background processing through a message queue." },
    { title: "Multi-tenancy", text: "Features on the shared-feed model: user-posted events in feeds, a multi-feed planning calendar and access requests." },
    { title: "Identity & Access", text: "Microsoft and Apple sign-in, administrator MFA and roles configurable per tenant." },
    { title: "Payments", text: "Per-tenant subscriptions, with member roles driven by billing events." },
  ],
  nda: "Client project under NDA. The client's name, internal architecture and business figures are intentionally omitted, and solutions are described at a general level. Further technical details and references are available on request.",
};

export type FlowNode = { label: string; sub?: string; highlight?: boolean };

export const deepDives: {
  eyebrow: string;
  title: string;
  problem: string;
  myPart: string;
  decisions: string[];
  outcome: string;
  flow: FlowNode[];
}[] = [
  {
    eyebrow: "Challenge 01 · Data Ingestion",
    title: "Building and running 50+ event crawlers",
    problem:
      "Source sites change their markup without notice, some render with JavaScript, some block automated traffic, and headless browser crawls broke whenever Chrome updated itself.",
    myPart:
      "Built 50+ source crawlers and maintained 100+ more on the platform's existing pipeline: listing and detail spiders run as separate queued messages, and duplicates are matched on text similarity.",
    decisions: [
      "Cheapest fetch first, chosen per source: plain HTTP, then a managed scraping service when a site blocks requests, and headless Chrome only for JavaScript-rendered pages.",
      "Made the headless browser set-up independent of the installed Chrome version, so browser auto-updates no longer break crawls.",
      "Image downloads blocked at the source's edge are retried through the scraping service from the client's region, with a real browser session as the last resort.",
    ],
    outcome: "Sites that block automated requests are still crawled, Chrome updates no longer break headless crawls, and blocked images are still retrieved.",
    flow: [
      { label: "Listing spiders", sub: "find event URLs" },
      { label: "Message queue", highlight: true },
      { label: "Detail spiders", sub: "HTTP · scraping service · headless" },
      { label: "Similarity dedupe" },
      { label: "Indexed event store" },
    ],
  },
  {
    eyebrow: "Challenge 02 · Multi-tenancy",
    title: "Keeping shared feeds consistent as features grew",
    problem:
      "An event with several dates is stored as linked copies, one of which represents the event in feeds. Once users could post events into feeds and admins could hide single dates or bulk-approve and remove events, a feed could end up pointing at a hidden or removed copy.",
    myPart:
      "The feed model was designed by a teammate. I built the features on top of it: user-posted events in feeds, a planning calendar across several feeds, and the feed access-request flow.",
    decisions: [
      "Rebuild the representative copy whenever a change touches any date of the event (hide or unhide a date, bulk approve or remove, edit, member removal), so a feed never shows a hidden date.",
      "After a save, the calendar reloads only once the search index has caught up, so users don't see stale results from an eventually consistent index.",
      "The calendar sends one request for all selected filters instead of one per filter, and hidden-event lists are paged in the database query.",
    ],
    outcome: "Feeds stay consistent through every edit, hide and bulk action, and the calendar shows a change as soon as it is saved.",
    flow: [
      { label: "User or admin change" },
      { label: "Multi-date event", sub: "linked copies" },
      { label: "Rebuild feed copy", highlight: true },
      { label: "Search index", sub: "wait to catch up" },
      { label: "Feeds & calendar" },
    ],
  },
  {
    eyebrow: "Challenge 03 · Access & Billing",
    title: "Per-tenant roles, admin MFA and paid memberships",
    problem:
      "Each tenant defines its own member roles, some of them paid, and administrator accounts needed a second factor. Access had to follow billing without a manual admin step.",
    myPart: "Built the per-tenant role settings, the subscription billing flow, Microsoft and Apple sign-in, and TOTP MFA for administrators.",
    decisions: [
      "Roles are tenant data, not code: configured in the admin UI, with a one-off migration for existing tenants.",
      "Hosted checkout and customer portal pages, so card data never touches the platform's servers.",
      "Each webhook is verified against its tenant's signing secret, then handed to a background worker that updates the member's role and billing period.",
      "MFA as a two-step sign-in: the user isn't signed in until the code is verified, and a new secret is saved only after its first valid code.",
    ],
    outcome: "Members gain and lose paid roles automatically as subscriptions start, change or end.",
    flow: [
      { label: "Member subscribes", sub: "hosted checkout" },
      { label: "Signed webhook", sub: "verified per tenant", highlight: true },
      { label: "Background worker", sub: "queue" },
      { label: "Role & billing period updated" },
    ],
  },
];

export type ProjectEntry = {
  name: string;
  /** Who the product was for, and when */
  context: string;
  role: string;
  tasks: string[];
  tech: string[];
  /** Live product link, an in-page link, or a note when the product can't be shown */
  product: { label: string; href?: string; note?: string };
};

export const experience: {
  company: string;
  position: string;
  dates: string;
  current?: boolean;
  projects: ProjectEntry[];
}[] = [
  {
    company: "Groove Technology",
    position: "Back-End .NET Developer",
    dates: "Apr 2022 – Present",
    current: true,
    projects: [
      {
        name: "Multi-tenant SaaS Platform for the Events Industry",
        context: "Australian client · Apr 2022 – Present · team of 5",
        role: "Main back-end developer, with code review from the tech lead",
        tasks: [
          "Write back-end specs with the client's product team and take features through AI-assisted implementation and production support",
          "Built 50+ event source crawlers and maintain 100+ more",
          "Built shared-feed features, Microsoft and Apple sign-in, administrator MFA, per-tenant roles and subscription billing",
        ],
        tech: ["C#", ".NET Framework 4.8", "ASP.NET MVC 5", "Web API", "WCF", "NServiceBus", "RavenDB", "Selenium", "Stripe", "AWS"],
        product: { label: "Featured Project & Deep Dives", href: "#featured", note: "live product under NDA" },
      },
    ],
  },
  {
    company: "Freelance",
    position: ".NET Developer · alongside main role",
    dates: "2019 – Apr 2023",
    projects: [
      {
        name: "Careers Website & Admin CMS",
        context: "HPT Vietnam · 2021 – 2023 · small team",
        role: "Developer",
        tasks: [
          "Bilingual (Vietnamese / English) careers website for an IT services company",
          "Admin portal for job postings, news, videos and site content, on a layered ASP.NET Core solution",
        ],
        tech: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "ASP.NET Core Identity", "SQL Server"],
        product: { label: "career.hpt.vn", href: "https://career.hpt.vn/" },
      },
      {
        name: "Real-time Training Simulator",
        context: "Private client · 2019 – 2021 · two versions",
        role: "Sole developer: design and implementation",
        tasks: [
          "Real-time custom rendering of the simulator display",
          "Hardware control panel connected over a serial port",
        ],
        tech: ["C#", "WinForms", "GDI+", "Serial Port"],
        product: { label: "Desktop application", note: "client confidential" },
      },
    ],
  },
  {
    company: "FPT Telecom Joint Stock Company",
    position: "Onsite Full-Stack Developer",
    dates: "Apr 2021 – Sep 2021",
    projects: [
      {
        name: "Enterprise HR Platform",
        context: "FPT Telecom · 22-person cross-functional team",
        role: "Full-stack developer",
        tasks: ["Design, feature development and unit testing"],
        tech: ["C#", "ASP.NET Web Forms", "SQL Server", "SVN"],
        product: { label: "Internal system", note: "not public" },
      },
    ],
  },
  {
    company: "RYOMO Vietnam Solutions",
    position: ".NET Developer",
    dates: "Aug 2019 – Mar 2021",
    projects: [
      {
        name: "Enterprise Gas Management System",
        context: "Japanese client · multiple phases",
        role: "Developer",
        tasks: ["Design, coding, unit testing, maintenance and troubleshooting across four technology stacks"],
        tech: ["C#", "VB.NET / VB6", "ASP.NET Web Forms", "WinForms", "WPF", "SQL Server"],
        product: { label: "Enterprise system", note: "client confidential" },
      },
    ],
  },
];
