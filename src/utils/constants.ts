// ─── Portfolio Data ─────────────────────────────────────────────────────────

export const PORTFOLIO_OWNER = {
  name: 'Evan Troget',
  title: 'Développeur Web Fullstack',
  stack: 'React · TypeScript · Node.js',
  subtitle: 'Développeur React / TypeScript fraîchement diplômé, je cherche un CDI ou CDD pour apporter ma curiosité, mon soin du détail et ma motivation à une équipe qui construit des choses qui comptent.',
  avatar: 'https://i.pravatar.cc/200?img=12',
  location: 'Nantes · La Rochelle · Vendée',
  email: 'contact.evantroget@gmail.com',
  github: 'https://github.com/Tr-Evan',
  linkedin: 'https://www.linkedin.com/in/troget-evan/',
  twitter: 'https://twitter.com/alex_renard',
  availableFrom: 'Octobre 2026',
  bio: `Master 2 Informatique (Sup de Vinci, 2026). Deux alternance en startup et ESN, un mémoire sur l'agentic IA, et plusieurs side-projects open-source. Ce qui me motive : le soin du détail, l'UX UI, et les interfaces qui semblent vivantes.`,
};

export const PROJECTS = [
  {
    id: 1,
    name: 'SynthèseAI',
    tagline: 'Mémoire de Master — transcription & résumé de cours par IA',
    description:
      'Application full-stack qui transcrit les enregistrements audio de cours (Whisper), génère des fiches de révision structurées (GPT-4o). Utilisée par 40+ étudiants lors de la phase beta.',
    tech: ['React', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'Docker'],
    category: 'ai',
    github: 'https://github.com/alex-renard/synthese-ai',
    demo: 'https://synthese-ai.vercel.app',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=380&fit=crop',
    color: '#818cf8',
    featured: true,
  },
  {
    id: 2,
    name: 'CollabBoard',
    tagline: '🏆 Hackathon 1er prix — tableau blanc temps-réel',
    description:
      'Tableau collaboratif en temps réel avec dessin vectoriel, curseurs live et salles privées. Construit en 48h lors de HackÉpita 2025. 1er prix catégorie "Best UX".',
    tech: ['React', 'TypeScript', 'Socket.io', 'Canvas API', 'Node.js'],
    category: 'web',
    github: 'https://github.com/alex-renard/collabboard',
    demo: 'https://collabboard.live',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=380&fit=crop',
    color: '#34d399',
    featured: true,
  },
  {
    id: 3,
    name: 'Dashboard Internship',
    tagline: 'Stage 2025 — refonte interface analytics',
    description:
      'Refonte complète du tableau de bord analytique d\'une startup SaaS. Migration Vue 2 → React + TypeScript, -45% sur le temps de chargement, composants documentés dans Storybook.',
    tech: ['React', 'TypeScript', 'Storybook', 'Recharts', 'TailwindCSS'],
    category: 'web',
    github: 'https://github.com/alex-renard/dashboard-case-study',
    demo: 'https://case-study.alex-renard.dev',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop',
    color: '#60a5fa',
    featured: false,
  },
  {
    id: 4,
    name: 'react-kit-starter',
    tagline: 'Open-source — template React opiniated',
    description:
      'Starter kit React open-source avec Vite, TypeScript strict, testing setup (Vitest + Testing Library) et CI GitHub Actions. 120+ ⭐ GitHub.',
    tech: ['React', 'TypeScript', 'Vite', 'Vitest', 'GitHub Actions'],
    category: 'oss',
    github: 'https://github.com/alex-renard/react-kit-starter',
    demo: 'https://react-kit-starter.vercel.app',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop',
    color: '#f59e0b',
    featured: false,
  },
  {
    id: 5,
    name: 'devlog CLI',
    tagline: 'Side-project — journal de dev en ligne de commande',
    description:
      'Outil CLI (Node.js) pour tenir un journal de développement structuré dans le terminal. Export Markdown, tags, recherche full-text. Publié sur npm.',
    tech: ['Node.js', 'TypeScript', 'Commander.js', 'SQLite', 'npm'],
    category: 'cli',
    github: 'https://github.com/alex-renard/devlog-cli',
    demo: 'https://www.npmjs.com/package/devlog-cli',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=380&fit=crop',
    color: '#a78bfa',
    featured: true,
  },
];

export const PROJECT_CATEGORIES = [
  { key: 'all',  label: 'Tous' },
  { key: 'web',  label: 'Web' },
  { key: 'ai',   label: 'IA' },
  { key: 'oss',  label: 'Open Source' },
  { key: 'cli',  label: 'CLI / Outil' },
];

export const SKILLS = [
  { name: 'React / Next.js',    level: 82, category: 'frontend', icon: '⚛️', color: '#60a5fa' },
  { name: 'TypeScript',         level: 78, category: 'frontend', icon: '🔷', color: '#818cf8' },
  { name: 'CSS / Tailwind',     level: 85, category: 'frontend', icon: '🎨', color: '#38bdf8' },
  { name: 'Framer Motion',      level: 70, category: 'frontend', icon: '✨', color: '#a78bfa' },
  { name: 'Node.js / Express',  level: 74, category: 'backend',  icon: '🟢', color: '#34d399' },
  { name: 'Python / FastAPI',   level: 68, category: 'backend',  icon: '🐍', color: '#fbbf24' },
  { name: 'PostgreSQL / SQL',   level: 65, category: 'backend',  icon: '🐘', color: '#93c5fd' },
  { name: 'Docker (bases)',     level: 55, category: 'backend',  icon: '🐳', color: '#67e8f9' },
  { name: 'Git / GitHub',       level: 88, category: 'tools',    icon: '🔧', color: '#fb923c' },
  { name: 'Vite / Webpack',     level: 72, category: 'tools',    icon: '⚡', color: '#facc15' },
  { name: 'Testing (Vitest)',   level: 60, category: 'tools',    icon: '🧪', color: '#86efac' },
  { name: 'CI/CD GitHub Actions',level: 58, category: 'tools',   icon: '🔄', color: '#f9a8d4' },
];

export const SKILL_CATEGORIES = [
  { key: 'frontend', label: 'Frontend', color: '#60a5fa' },
  { key: 'backend',  label: 'Backend',  color: '#34d399' },
  { key: 'tools',    label: 'Outils',   color: '#fb923c' },
];

export const PASSIONS = [
  {
    id: 'motorsport',
    emoji: '🏍️',
    title: 'Sport mécanique',
    subtitle: 'MotoGP, rallye, endurance',
    description: 'Fan inconditionnel de MotoGP et de rallye. Chaque course est un rendez-vous sacré. J\'aime autant la stratégie, la mécanique et le courage des pilotes.',
    accent: '#ef4444',
    size: 'large',
    pattern: 'grid',
  },
  {
    id: 'cars',
    emoji: '🚗',
    title: 'Voitures',
    subtitle: 'passion, pas que les pixels',
    description: 'Japonaises des années 90, youngtimers français — l\'esthétique automobile est une forme de design à part entière. La mécanique comme le code : comprendre pour maîtriser.',
    accent: '#f59e0b',
    size: 'medium',
    pattern: 'dots',
  },
  {
    id: 'music',
    emoji: '🎸',
    title: 'Musique',
    subtitle: 'Classic - Rock 70 · 80 · 90 · 2000',
    description: 'Led Zeppelin, AC/DC, Guns N\'Roses, Nirvana, RHCP, Muse. Le rock comme carburant — énergie brute, guitares et émotions à fond.',
    accent: '#a78bfa',
    size: 'medium',
    pattern: 'wave',
  },
  {
    id: 'photo',
    emoji: '📸',
    title: 'Photographie',
    subtitle: 'urbain & mécanique',
    description: 'Capturer la lumière sur une carrosserie, un virage à pleine vitesse, une rue à l\'aube. La composition comme le code : épurer jusqu\'à l\'essentiel.',
    accent: '#fb923c',
    size: 'medium',
    pattern: 'wave',
  },
  {
    id: 'squash',
    emoji: '🎾',
    title: 'Squash',
    subtitle: '1× par semaine',
    description: 'Jeu de vitesse, de lecture et d\'anticipation. Comme debugger un bug complexe — intense et satisfaisant.',
    accent: '#34d399',
    size: 'small',
    pattern: 'grid',
  },
  {
    id: 'running',
    emoji: '🏃',
    title: 'Course à pied',
    subtitle: 'au couché du soleil',
    description: 'Les meilleures idées d\'archi arrivent au km 7, sans casque et sans distraction.',
    accent: '#60a5fa',
    size: 'small',
    pattern: 'dots',
  },
  {
    id: 'learning',
    emoji: '📚',
    title: 'Apprentissage',
    subtitle: 'Nouvelles compétences, chaque jour',
    description: 'Passionné par l\'apprentissage. J\'explore constamment de nouvelles technologies et méthodes pour améliorer mes compétences dans n\'importe quel sujet / domaine.',
    accent: '#22d3ee',
    size: 'large',
    pattern: 'grid',
  },
  {
    id: 'reading',
    emoji: '📖',
    title: 'Lecture',
    subtitle: 'Livres, articles, blogs',
    description: 'Curieux de nouvelles idées et perspectives. J\'aime lire sur des livre d\'exploration.',
    accent: '#e879f9',

    size: 'medium',
    pattern: 'dots',
  },
  {
    id: 'cinema',
    emoji: '🎬',
    title: 'Cinéma',
    subtitle: 'films, documentaires, séries',
    description: 'Passionné par le cinéma. J\'aime explorer différentes cultures et époques à travers les films, qu\'ils soient classiques, indépendants ou blockbusters.',
    accent: '#a3e635',
    size: 'medium',
    pattern: 'wave',
  },
];

export const TIMELINE = [
  {
    year: '2026',
    title: 'Diplômé Master Développeur Fullstack',
    company: 'Sup de Vinci — Nantes',
    description: 'Mention Bien. Mémoire sur la génération de contenu IA pour l\'aide à la révision. Défense en juin 2026.',
    color: '#818cf8',
  },
  {
    year: '2025',
    title: 'Stage Développeur React (6 mois)',
    company: 'StartupY — Paris 10e',
    description: 'Refonte interface analytics. Migration Vue → React/TypeScript. Mise en place du design system et de Storybook.',
    color: '#60a5fa',
  },
  {
    year: '2023',
    title: 'Bachelor Développement Web',
    company: 'Sup de Vinci — Nantes',
    description: 'Formation intensive en développement web fullstack. Projets concrets, hackathons et alternance en startup.',
    color: '#34d399',
  },
  {
    year: '2022',
    title: 'BTS SIO (Services Informatiques aux Organisations)',
    company: 'Campus Notre Dame du Roc - La Roche-sur-Yon',
    description: 'Bases solides en algorithmique, POO, bases de données relationnelles et développement web. + 2 stages de 6 semaines en entreprise.',
    color: '#f59e0b',
  },
];

export const NAV_LINKS = [
  { href: '#about',    label: 'À propos' },
  { href: '#projects', label: 'Projets'  },
  { href: '#skills',   label: 'Stack'    },
  { href: '#passions', label: 'Passions' },
  { href: '#contact',  label: 'Contact'  },
];

