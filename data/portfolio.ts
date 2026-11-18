/**
 * All portfolio content lives here. Edit this file to update text,
 * projects or images without touching the components.
 *
 * DRAFT = true  -> missing images show a dashed placeholder, and `fill` text is highlighted.
 * DRAFT = false -> missing images (and an empty Screenshots section) are hidden.
 */
export const DRAFT = false;

export type ShotData = {
  /** Path under /public, e.g. "/images/IMG-01.jpg". A ".png" path falls back to ".jpg" automatically. */
  src: string;
  code: string;
  /** Placeholder hint, lines separated by "\n" */
  hint: string;
  /** Describes what the screenshot shows, for screen readers */
  alt: string;
};

export const profile = {
  name: "Nguyen Thi Men",
  role: ".NET Developer",
  tagline:
    "I mostly work on the back end: async messaging, third-party integrations, sign-in and payments.",
  links: [
    { label: "Email", value: "ntmen98@gmail.com", href: "mailto:ntmen98@gmail.com" },
    { label: "Phone", value: "(+84) 868 647 331", href: "tel:+84868647331" },
    { label: "Location", value: "Ho Chi Minh City, Vietnam" },
  ] as { label: string; value: string; href?: string }[],
};

export const stats = [
  { n: "7+", l: "Years of .NET / C# development" },
  { n: "10+", l: "Third-party data sources integrated" },
  { n: "10+", l: "Projects delivered, web & desktop" },
  { n: "3", l: "Client markets: Vietnam, Japan, Australia" },
];

export const areas = [
  {
    title: "Async Processing & Integration",
    text: "Message-driven services and pipelines that ingest, deduplicate and index external data.",
    tags: ["NServiceBus", "MSMQ", "Selenium WebDriver"],
  },
  {
    title: "Cloud & Search",
    text: "Object storage and full-text search in a production SaaS platform.",
    tags: ["Amazon S3", "Amazon OpenSearch Service"],
  },
  {
    title: "Identity & Security",
    text: "Social and enterprise sign-in, MFA and per-tenant authorization.",
    tags: ["OAuth 2.0 / OIDC", "Microsoft Entra ID", "TOTP MFA (Google Authenticator)"],
  },
  {
    title: "Payments & Billing",
    text: "Multi-tenant payments and the full subscription lifecycle.",
    tags: ["Stripe Connect", "Stripe Checkout", "Webhooks"],
  },
];

export const toolbox = [
  { k: "Core", v: "C#, .NET Framework 4.8, ASP.NET Core, ASP.NET MVC 5, ASP.NET Web API, WCF" },
  { k: "Data & Messaging", v: "SQL Server, RavenDB, SQLite, MySQL, Entity Framework Core, Dapper, NServiceBus, MSMQ" },
  { k: "Architecture & Patterns", v: "SOA, Event-Driven, Multi-tenancy, Dependency Injection, Repository, Strategy, Command, Pipeline" },
  { k: "DevOps & Tooling", v: "TeamCity (CI/CD), Git, GitHub, GitLab, TFS, SVN, Jira, log4net, Windows Server" },
  { k: "Front-End & Desktop", v: "Razor, HTML, CSS, JavaScript, jQuery, Bootstrap, WPF, WinForms, GDI+" },
];

export const featured = {
  eyebrow: "Groove Technology · Australian Client",
  title: "Multi-tenant SaaS Platform for the Events Industry",
  facts: [
    { k: "Role", v: "Primary Back-End Developer" },
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
      v: "Joined a platform already in production and took ownership of back-end development: new features, maintenance and troubleshooting.",
    },
    {
      k: "Collaboration",
      v: "Worked directly with the client's product team to discuss features, clarify specs and share technical updates.",
    },
  ],
  scope: [
    { title: "Data Ingestion", text: "Crawlers for 10+ third-party sources, with background processing through a message queue." },
    { title: "Search & Storage", text: "Full-text event search and cloud file storage." },
    { title: "Identity & Access", text: "Single sign-on, multi-factor authentication and roles configurable per tenant." },
    { title: "Payments", text: "Per-tenant payments and the full subscription lifecycle." },
  ],
  nda: "Client project under NDA. The client's name, internal architecture and business figures are intentionally omitted, and solutions are described at a general level. Further technical details and references are available on request.",
};

export type FlowNode = { label: string; sub?: string; highlight?: boolean };

export const deepDives: {
  eyebrow: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  flow: FlowNode[];
}[] = [
  {
    eyebrow: "Challenge 01 · Data Pipeline",
    title: "Ingesting events from 10+ different sources",
    problem:
      "Some sources render content with JavaScript, others serve static HTML, and the same event can appear in several sources.",
    approach:
      "A crawler per source type (headless browser or plain HTTP) publishes messages to a queue; separate background handlers deduplicate, index and store the events.",
    outcome: "Crawling is decoupled from indexing and storage, which run asynchronously in the background.",
    flow: [
      { label: "Third-party sources" },
      { label: "Crawlers", sub: "headless browser · HTTP" },
      { label: "Message queue", highlight: true },
      { label: "Background handlers", sub: "dedupe · index · store" },
      { label: "Search & storage" },
    ],
  },
  {
    eyebrow: "Challenge 02 · Identity & Access",
    title: "Multiple sign-in providers, MFA and per-tenant roles",
    problem:
      "The platform needed social and enterprise sign-in, stronger protection for administrator accounts, and access rules that differ per tenant.",
    approach:
      "Standard OAuth 2.0 / OpenID Connect sign-in for each provider, TOTP-based MFA (authenticator app) for administrators, and a role & permission model configurable at runtime.",
    outcome: "Roles and access levels can be changed per tenant without a code release.",
    flow: [
      { label: "User sign-in" },
      { label: "OAuth 2.0 / OIDC", sub: "social & enterprise providers", highlight: true },
      { label: "MFA", sub: "administrator accounts" },
      { label: "Per-tenant roles", sub: "configured at runtime" },
    ],
  },
  {
    eyebrow: "Challenge 03 · Payments",
    title: "Per-tenant payments and subscriptions",
    problem:
      "Each tenant needed to receive payments into its own account, while subscriptions and access had to stay in sync with billing.",
    approach:
      "A connected payment account per tenant, hosted checkout and billing pages for subscriptions, and webhook handlers covering the full subscription lifecycle.",
    outcome: "Access roles are assigned automatically from payment events, with no manual admin step.",
    flow: [
      { label: "Tenant subscribes", sub: "hosted checkout" },
      { label: "Connected account", sub: "one per tenant", highlight: true },
      { label: "Webhook handlers", sub: "subscription lifecycle" },
      { label: "Automatic role assignment" },
    ],
  },
];

export const projects: {
  company: string;
  years: string;
  title: string;
  text: string;
  tags: string[];
  shot?: ShotData;
  wide?: boolean;
  /** Public URL of the live project, if any */
  link?: { label: string; href: string };
}[] = [
  {
    company: "RYOMO Vietnam Solutions",
    years: "2019 – 2021",
    title: "Enterprise Gas Management System",
    text: "Multiple phases of an enterprise system for a Japanese client across four technology stacks. Design, coding, unit testing, maintenance and troubleshooting.",
    tags: ["C#", "Web Forms", "WinForms", "WPF", "VB.NET", "SQL Server"],
  },
  {
    company: "Freelance · Desktop",
    years: "2019 – 2021",
    title: "Real-time Training Simulator",
    text: "Two versions of a desktop training simulator with real-time custom GDI+ rendering and a hardware control panel over a serial port, designed and implemented independently. Client details are confidential.",
    tags: ["C#", "WinForms", "GDI+", "Serial Port"],
  },
  {
    company: "FPT Telecom",
    years: "2021",
    title: "Enterprise HR Platform",
    text: "Onsite full-stack developer within a 22-person cross-functional team, responsible for design, feature development and unit testing on ASP.NET Web Forms.",
    tags: ["ASP.NET Web Forms", "SQL Server", "SVN"],
  },
  {
    company: "HPT Vietnam · Freelance",
    years: "2021 – 2023",
    title: "Careers Website & Admin CMS",
    text: "Bilingual (Vietnamese / English) careers website for an IT services company, with a separate admin portal for managing job postings, news, videos and site content. Layered ASP.NET Core solution built in a small team.",
    link: { label: "career.hpt.vn", href: "https://career.hpt.vn/" },
    tags: ["ASP.NET Core MVC", "Entity Framework Core", "ASP.NET Core Identity", "SQL Server"],
  },
];

export const career = [
  {
    company: "Groove Technology",
    position: "Back-End .NET Developer",
    dates: "Apr 2022 – Present",
    current: true,
    points: [
      "Owned back-end development of a production multi-tenant SaaS platform for an Australian client",
      "Delivered the data ingestion pipeline, SSO/MFA and Stripe Connect integrations",
      "Worked directly with the client's product team",
    ],
  },
  {
    company: "Freelance",
    position: ".NET Developer · alongside main role",
    dates: "2019 – Apr 2023",
    points: ["Delivered web and desktop applications for Vietnamese clients, from design through deployment"],
  },
  {
    company: "FPT Telecom Joint Stock Company",
    position: "Onsite Full-Stack Developer",
    dates: "Apr 2021 – Sep 2021",
    points: [
      "Developed features for an enterprise HR platform in a 22-person cross-functional team",
      "Covered design, coding and unit testing with ASP.NET Web Forms",
    ],
  },
  {
    company: "RYOMO Vietnam Solutions",
    position: ".NET Developer",
    dates: "Aug 2019 – Mar 2021",
    points: [
      "Delivered multiple phases of an enterprise system for a Japanese client",
      "Worked across ASP.NET Web Forms, WinForms, WPF and VB.NET / VB6 with SQL Server",
      "Handled maintenance and troubleshooting",
    ],
  },
];
