export interface ProjectCaseStudy {
  overview: string
  problem: string
  solution: string
  architecture: string
  techStack: string[]
  keyFeatures: string[]
  challenges: string
  lessons: string
}

export interface Project {
  id: string
  name: string
  shortTitle: string
  type: 'Industry Production' | 'Personal SaaS' | 'Academic Project'
  featured: boolean
  tagline: string
  company?: string
  technologies: string[]
  github?: string
  githubFrontend?: string
  githubBackend?: string
  live?: string
  caseStudy: ProjectCaseStudy
  isProprietary?: boolean
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  description: string
  highlights: string[]
  techStack: string[]
  impact: string
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  location: string
  grade: string
  highlights: string[]
}

export interface SkillItem {
  name: string
  category: 'Languages' | 'Backend' | 'Frontend' | 'Database' | 'DevOps & Tools'
  proficiency: 'Advanced' | 'Proficient' | 'Intermediate' | 'Familiar'
  usedIn: string
  projects: string
  strength: string
  relatedTech: string[]
}

export interface EngineeringStage {
  number: string
  title: string
  tagline: string
  description: string
  details: string[]
  codeSnippet: string
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Pratham Sali',
    monogram: 'PS',
    title: 'Full-Stack Software Developer',
    headline: 'BUILDING DIGITAL SYSTEMS.',
    subHeadline: 'Full-stack software developer with a backend focus. Engineering resilient REST APIs, microservices, and modern web architectures.',
    status: 'Available for opportunities',
    email: 'prathamsali123@gmail.com',
    phone: '+91 6352547022',
    location: 'Surat, Gujarat, India',
    github: 'https://github.com/Pratham8955',
    linkedin: 'https://www.linkedin.com/in/pratham-sali-7244a4216/',
    resumePdf: '/Pratham_Sali_Resume.pdf',
    stats: [
      { value: '50+', label: 'APIs Built', subtext: 'Robust RESTful endpoints' },
      { value: '17+', label: 'Repositories', subtext: 'Open source & private' },
      { value: '5+', label: 'Production Systems', subtext: 'Full-stack deployments' },
      { value: '7.77', label: 'MSc ICT CGPA', subtext: 'Post-graduate distinction' },
    ],
  },

  about: {
    title: 'WHO I AM',
    subtitle: 'Software Engineer • Backend Architect • Problem Solver',
    narrative: [
      'I am a full-stack developer with hands-on enterprise software engineering experience gained at Elaunch Solutions Pvt. Ltd. and NJ India Pvt. Ltd. Having recently completed my MSc in Information & Communication Technology, I focus on constructing high-throughput, fault-tolerant backend services and intuitive web applications.',
      'My engineering philosophy centers around architectural simplicity, explicit data contracts, and sub-millisecond data pipelines. Whether implementing distributed caching with Redis, orchestrating MongoDB aggregations, or designing enterprise Java workflows, I treat software craftsmanship as an ongoing pursuit of performance and maintainability.'
    ],
    developerFocus: [
      { label: 'Scalable Microservices', desc: 'Event-driven & modular backend boundaries' },
      { label: 'High-Throughput Caching', desc: 'Sub-5ms response times via Redis' },
      { label: 'Enterprise Java & Spring Boot', desc: 'Type-safe robust API systems' },
      { label: 'Modern Reactive Frontends', desc: 'Next.js 16 App Router & interactive UI' },
    ],
  },

  howIBuild: [
    {
      number: '01',
      title: 'PLAN',
      tagline: 'System Architecture & Schema Design',
      description: 'Analyze domain requirements, establish normalized/denormalized database schemas, map out API endpoints, and establish strict data contracts.',
      details: [
        'Domain-Driven Service Boundary Modeling',
        'Relational & Document DB Schema Design',
        'Zod & TypeScript Type Specification',
        'API Contract & Error Code Conventions'
      ],
      codeSnippet: `// System Architecture Spec
interface SystemContract<T> {
  endpoint: '/api/v1/resource';
  method: 'POST' | 'GET' | 'PUT';
  auth: 'JWT_BEARER';
  rateLimit: { windowMs: 60000, max: 100 };
  payload: T;
}`
    },
    {
      number: '02',
      title: 'BUILD',
      tagline: 'Clean Code & Type-Safe Core Logic',
      description: 'Write maintainable, modular code in Node.js/TypeScript, Java/Spring Boot, or .NET Core. Implement layered architectures separating controllers, services, and repositories.',
      details: [
        'Separation of Concerns (Controller-Service-Repo)',
        'Dependency Injection & Design Patterns',
        'Asynchronous Non-Blocking I/O Pipelines',
        'Comprehensive Error & Exception Trapping'
      ],
      codeSnippet: `@Service
public class TaskManagementService {
  @Autowired private TaskRepository taskRepo;
  @Transactional
  public TaskResponse dispatchGuard(GuardAssignmentDTO dto) {
    return taskRepo.assignWithLock(dto.getTaskId(), dto.getGuardId());
  }
}`
    },
    {
      number: '03',
      title: 'CONNECT',
      tagline: 'REST APIs, WebSockets & Integrations',
      description: 'Expose robust RESTful endpoints with JWT authentication and RBAC. Integrate third-party webhooks, payment gateways (Razorpay/Stripe), and real-time WebSocket communication.',
      details: [
        'JWT Authentication & Role-Based Access Control',
        'Real-Time WebSockets & Socket.IO streams',
        'Stripe & Razorpay Payment Integration',
        'CORS, Helmet Security & Rate Limiting'
      ],
      codeSnippet: `// Real-Time Socket Connection
io.on('connection', (socket) => {
  socket.on('guard:location_update', async (payload) => {
    await redisClient.geoadd('guards:active', payload.lng, payload.lat, payload.id);
    socket.to(\`task:\${payload.taskId}\`).emit('guard:moved', payload);
  });
});`
    },
    {
      number: '04',
      title: 'TEST',
      tagline: 'Endpoint Validation & Edge Case Verification',
      description: 'Rigorously test application behaviors using Postman suites, manual edge-case verification, and integration tests to ensure zero regressions.',
      details: [
        'Postman Collection Runner & Automated Tests',
        'Boundary & High-Concurrency Verification',
        'Database Rollback & Race-Condition Testing',
        'Schema Validation & Security Audits'
      ],
      codeSnippet: `pm.test("Status code is 200 OK", function () {
  pm.response.to.have.status(200);
});
pm.test("Response contains valid JWT token", function () {
  const json = pm.response.json();
  pm.expect(json.token).to.be.a('string');
});`
    },
    {
      number: '05',
      title: 'DEPLOY',
      tagline: 'Caching, Containerization & Production Release',
      description: 'Optimize data caching via Redis to achieve 30%+ latency drops. Package applications with Docker, configure reverse proxies, and deploy onto cloud infrastructure.',
      details: [
        'Multi-Tier Redis Caching Strategy',
        'Docker Containerization & Image Optimization',
        'Cloud Infrastructure & CI/CD Pipelines',
        'Continuous Health Checks & Telemetry Monitoring'
      ],
      codeSnippet: `// Redis Multi-Tier Cache Layer
const cacheKey = \`cache:data:\${id}\`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached); // ~2ms response

const fresh = await db.collection.findById(id);
await redis.setex(cacheKey, 3600, JSON.stringify(fresh));
return fresh;`
    }
  ] as EngineeringStage[],

  skills: [
    // Languages
    { name: 'Java', category: 'Languages', proficiency: 'Advanced', usedIn: 'NJ India & Academic', projects: 'MFTran, HRMS', strength: 'OOP, Concurrency, JDBC, Enterprise Servlets', relatedTech: ['Spring Boot', 'MySQL', 'Postman'] },
    { name: 'TypeScript', category: 'Languages', proficiency: 'Advanced', usedIn: 'Elaunch Solutions & Personal', projects: 'Strata, Maham', strength: 'Type-Safe Architecture, Generic Contracts', relatedTech: ['Next.js', 'Node.js', 'React'] },
    { name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 'Advanced', usedIn: 'All Roles', projects: 'All Projects', strength: 'Async Event Loop, Functional Patterns', relatedTech: ['Node.js', 'Express.js', 'React'] },
    { name: 'C#', category: 'Languages', proficiency: 'Intermediate', usedIn: 'Academic Projects', projects: 'CampusWave', strength: 'LINQ, Strongly-Typed OOP, .NET Ecosystem', relatedTech: ['.NET Core', 'SQL Server'] },
    { name: 'SQL', category: 'Languages', proficiency: 'Advanced', usedIn: 'NJ India & Academic', projects: 'MFTran, CampusWave', strength: 'Complex Queries, Indexing, Joins, Transactions', relatedTech: ['MySQL', 'SQL Server'] },

    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', usedIn: 'Elaunch Solutions', projects: 'Maham, Strata, GoWear', strength: 'Event-Driven Server Architecture, Microservices', relatedTech: ['Express.js', 'TypeScript', 'Redis'] },
    { name: 'Express.js', category: 'Backend', proficiency: 'Advanced', usedIn: 'Elaunch & Personal', projects: 'Strata, GoWear', strength: 'RESTful Routing, Middleware Chains, JWT Auth', relatedTech: ['Node.js', 'MongoDB'] },
    { name: 'Spring Boot', category: 'Backend', proficiency: 'Intermediate', usedIn: 'NJ India & Self', projects: 'MFTran, HRMS', strength: 'Dependency Injection, Spring Data JPA, REST APIs', relatedTech: ['Java', 'MySQL'] },
    { name: '.NET Core', category: 'Backend', proficiency: 'Intermediate', usedIn: 'Academic Projects', projects: 'CampusWave', strength: 'N-Tier Web API, Entity Framework Core', relatedTech: ['C#', 'SQL Server'] },
    { name: 'REST APIs', category: 'Backend', proficiency: 'Advanced', usedIn: 'All Roles', projects: '50+ APIs across all projects', strength: 'Resource Modeling, Rate Limiting, HTTP Specs', relatedTech: ['Node.js', 'Postman', 'Java'] },

    // Frontend
    { name: 'Next.js (App Router)', category: 'Frontend', proficiency: 'Advanced', usedIn: 'Elaunch Solutions & Personal', projects: 'Maham, Portfolio', strength: 'Server Components, SSR, Optimized Routing', relatedTech: ['React', 'TypeScript', 'Tailwind CSS'] },
    { name: 'React', category: 'Frontend', proficiency: 'Advanced', usedIn: 'Elaunch Solutions & Personal', projects: 'Strata, GoWear, CampusWave', strength: 'Hooks Architecture, State Management, Custom UI', relatedTech: ['Next.js', 'TypeScript'] },
    { name: 'HTML5 & Modern CSS', category: 'Frontend', proficiency: 'Advanced', usedIn: 'All Roles', projects: 'All Web Projects', strength: 'Responsive Layouts, Glassmorphism, Animations', relatedTech: ['Tailwind CSS', 'Framer Motion'] },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced', usedIn: 'Elaunch & Personal', projects: 'Maham, Strata', strength: 'Custom Design Tokens, Utility-First Styling', relatedTech: ['Next.js', 'React'] },

    // Database
    { name: 'MongoDB', category: 'Database', proficiency: 'Advanced', usedIn: 'Elaunch Solutions', projects: 'Maham, Strata, GoWear', strength: 'Document Modeling, Aggregation Pipelines, Indexes', relatedTech: ['Node.js', 'Express.js'] },
    { name: 'MySQL', category: 'Database', proficiency: 'Advanced', usedIn: 'NJ India', projects: 'MFTran, HRMS', strength: 'Relational Schemas, Constraints, ACID Transactions', relatedTech: ['Java', 'Spring Boot'] },
    { name: 'Redis', category: 'Database', proficiency: 'Proficient', usedIn: 'Elaunch Solutions', projects: 'Maham', strength: 'In-Memory Caching, TTL Expiry, Sub-5ms Reads', relatedTech: ['Node.js', 'MongoDB'] },
    { name: 'SQL Server', category: 'Database', proficiency: 'Intermediate', usedIn: 'Academic Projects', projects: 'CampusWave', strength: 'Normalized Schemas, Triggers, Stored Procedures', relatedTech: ['.NET Core', 'C#'] },

    // DevOps & Tools
    { name: 'Git & GitHub', category: 'DevOps & Tools', proficiency: 'Advanced', usedIn: 'All Roles', projects: 'All Repositories', strength: 'Branching Strategies, PRs, Version Control', relatedTech: ['CI/CD', 'GitHub Actions'] },
    { name: 'Postman', category: 'DevOps & Tools', proficiency: 'Advanced', usedIn: 'NJ India & Elaunch', projects: 'All Backend Projects', strength: 'API Automation, Request Mocking, Test Scripts', relatedTech: ['REST APIs', 'Spring Boot'] },
    { name: 'Docker', category: 'DevOps & Tools', proficiency: 'Familiar', usedIn: 'Personal Exploration', projects: 'Microservices Lab', strength: 'Containerization, Dockerfiles, Compose', relatedTech: ['Node.js', 'Linux'] },
    { name: 'Payara Server', category: 'DevOps & Tools', proficiency: 'Intermediate', usedIn: 'Academic Projects', projects: 'HRMS', strength: 'Java EE Enterprise Deployment & EJB Pools', relatedTech: ['Java', 'MySQL'] },
  ] as SkillItem[],

  projects: [
    {
      id: 'strata',
      name: 'STRATA — Advance Inventory System',
      shortTitle: 'STRATA',
      type: 'Personal SaaS',
      featured: true,
      tagline: 'Intelligent inventory asset tracking via QR code scanning with pay-per-grow pricing architecture.',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'Zod', 'AWS EC2'],
      github: 'https://github.com/Pratham8955/Strata-Advance-Inventory',
      live: 'https://strata-inventory.netlify.app/',
      caseStudy: {
        overview: 'Strata is an end-to-end full-stack inventory management SaaS designed to solve item location tracking for small-to-medium businesses without prohibitive upfront hardware costs.',
        problem: 'Traditional warehouse management software is either too expensive or relies on manual error-prone barcode hardware. Businesses struggled to track item locations dynamically across shelves and bins.',
        solution: 'Built a responsive QR code scanning system accessible via standard mobile browsers. Created a flexible multi-tenant schema with granular location hierarchies (Warehouse > Aisle > Rack > Bin).',
        architecture: 'Decoupled MERN stack architecture with strict TypeScript data schemas validated by Zod. REST API backend running on Node.js/Express with MongoDB Aggregations for real-time inventory counts.',
        techStack: ['MongoDB', 'Express.js', 'React 18', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Zod', 'JWT'],
        keyFeatures: [
          'Instant client-side QR code generation and mobile camera scanning',
          'Multi-level warehouse spatial hierarchy and bin location tracking',
          'Automated low-stock threshold triggers and audit logs',
          'Pay-per-grow multi-tenant account provisioning and RBAC'
        ],
        challenges: 'Ensuring seamless QR code decoding across diverse mobile camera hardware without lag. Resolved by implementing worker-thread barcode stream decoders on the frontend.',
        lessons: 'Mastered multi-tenant SaaS schema design, Zod validation pipelines, and resilient error-handling boundaries.'
      }
    },
    {
      id: 'maham',
      name: 'MAHAM — Guard Coordination Platform',
      shortTitle: 'MAHAM',
      type: 'Industry Production',
      featured: true,
      company: 'Elaunch Solutions Pvt. Ltd.',
      tagline: 'Enterprise live project management and guard task coordination system with real-time dispatching.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'WebSockets', 'REST API'],
      isProprietary: true,
      caseStudy: {
        overview: 'Maham is an enterprise workforce management system built for coordinating security guard tasks, shifts, and client profile updates in real-time across multiple time zones.',
        problem: 'High concurrency in shift requests, frequent timezone conversions, and delayed guard status updates caused scheduling bottlenecks and slow API response times under peak hours.',
        solution: 'Architected a high-throughput backend with Redis caching for high-frequency queries (reducing response times by 30%), automated Cron workers for time-zone-aware shift distribution, and WebSocket channels for instant dispatch alerts.',
        architecture: 'Microservices-ready modular architecture featuring Next.js frontend, Node.js REST API layer, Redis session and query cache, and denormalized MongoDB collections for lightning-fast reads.',
        techStack: ['Next.js 14', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'Socket.IO', 'JWT'],
        keyFeatures: [
          'Real-time guard task dispatching and assignment status pipelines',
          'Automated time-zone-aware cron scheduling engine',
          'Sub-5ms query response caching layer powered by Redis',
          'Secure client profile update verification and admin audit workflows'
        ],
        challenges: 'Handling concurrent task reservations without race conditions. Solved using atomic MongoDB findAndModify operations and Redis distributed locks.',
        lessons: 'Deepened enterprise experience with distributed caching, production deployment under NDA, and mission-critical API design.'
      }
    },
    {
      id: 'gowear',
      name: 'GoWear — Full-Stack E-Commerce',
      shortTitle: 'GoWear',
      type: 'Academic Project',
      featured: false,
      tagline: 'Modern apparel e-commerce store with catalog filtering, real-time cart state, and Stripe payments.',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'Stripe'],
      github: 'https://github.com/Pratham8955/GoWear',
      caseStudy: {
        overview: 'GoWear is a complete fashion retail platform providing clothing categories for men, women, and kids with seamless payment processing.',
        problem: 'Online shoppers expect instant filtering across sizes, colors, and prices without full-page reloads, paired with secure checkout flows.',
        solution: 'Developed a responsive Single Page Application with Redux state synchronization, integrated Stripe checkout webhooks, and constructed MongoDB aggregation queries for multi-facet filtering.',
        architecture: 'Classic MERN stack with JWT authentication, Redux Toolkit for global shopping cart state, and Stripe API webhook listeners for order fulfillment.',
        techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux Toolkit', 'Stripe API'],
        keyFeatures: [
          'Multi-facet catalog search and instant attribute filtering',
          'Persistent shopping cart with live stock check',
          'Stripe payment gateway integration with secure webhook verification',
          'Admin product management and order tracking dashboard'
        ],
        challenges: 'Handling edge cases in payment failure webhooks and inventory decrement. Handled via transactional order status machines.',
        lessons: 'Gained solid expertise in payment lifecycle states and Redux state synchronization.'
      }
    },
    {
      id: 'campuswave',
      name: 'CampusWave — College Management Portal',
      shortTitle: 'CampusWave',
      type: 'Academic Project',
      featured: false,
      tagline: 'Enterprise academic portal with role-based workflows, department oversight, and Razorpay fee collections.',
      technologies: ['.NET Core', 'C#', 'React', 'SQL Server', 'Razorpay'],
      githubFrontend: 'https://github.com/Pratham8955/CMSFrontend',
      githubBackend: 'https://github.com/Pratham8955/CMS',
      caseStudy: {
        overview: 'CampusWave is an institutional management suite engineered to digitize administrative workflows, student records, faculty allocations, and fee receipts.',
        problem: 'Manual fee processing and fragmented record keeping across university departments led to administrative delays and data discrepancies.',
        solution: 'Built an N-Tier architecture in .NET Core Web API with strongly-typed C# models, strict referential integrity in SQL Server, and Razorpay payment integration.',
        architecture: 'N-Tier enterprise architecture: Presentation Layer (React), API Service Layer (.NET Core), Data Access Layer (Entity Framework Core), Database (SQL Server).',
        techStack: ['.NET Core 7', 'C#', 'React', 'SQL Server', 'Entity Framework Core', 'Razorpay'],
        keyFeatures: [
          'Role-Based Access Control (Super Admin, Faculty, Student)',
          'Online college fee processing with automated receipt generation via Razorpay',
          'Departmental course assignment and student attendance tracking',
          'Normalized SQL database with comprehensive audit logging'
        ],
        challenges: 'Configuring Entity Framework Core foreign key cascades and complex multi-table joins. Solved with explicit Fluent API mappings.',
        lessons: 'Strengthened enterprise C# paradigms, N-Tier architecture design, and ACID transactional guarantees.'
      }
    },
    {
      id: 'mftran',
      name: 'MFTran — Customer Query Backend',
      shortTitle: 'MFTran',
      type: 'Industry Production',
      featured: false,
      company: 'NJ India Pvt. Ltd.',
      tagline: 'Enterprise Java backend API engine handling high-volume financial customer query pipelines.',
      technologies: ['Advanced Java', 'Spring Boot', 'MySQL', 'REST API', 'Postman'],
      isProprietary: true,
      caseStudy: {
        overview: 'MFTran is an enterprise backend query routing system developed during tenure at NJ India Pvt. Ltd. to process and resolve customer inquiries systematically.',
        problem: 'Handling concurrent customer queries across disparate legacy pipelines required reliable thread-safe backend APIs with detailed audit trails.',
        solution: 'Engineered RESTful API endpoints utilizing Advanced Java, robust database connection pooling, structured logging, and systematic Postman testing suites.',
        architecture: 'Modular Java enterprise backend with Servlet/Spring controllers, JDBC connection pools, and relational MySQL persistence layer.',
        techStack: ['Advanced Java', 'Spring Boot', 'MySQL', 'JDBC', 'Postman'],
        keyFeatures: [
          'Thread-safe customer query intake and ticket assignment engine',
          'Standardized REST endpoints with strict status code conventions',
          'Automated query verification and validation via Postman collections',
          'Optimized SQL queries with indexed lookups for fast retrieval'
        ],
        challenges: 'Maintaining thread safety and database connection efficiency under burst query loads.',
        lessons: 'Mastered enterprise Java best practices, connection pooling, and professional software delivery workflows.'
      }
    },
    {
      id: 'hrms',
      name: 'Working Wave — Enterprise HRMS',
      shortTitle: 'Working Wave',
      type: 'Academic Project',
      featured: false,
      tagline: 'Centralized human resource management system orchestrating employee lifecycles and leave approvals.',
      technologies: ['Java EE', 'MySQL', 'Payara Server', 'EJB'],
      github: 'https://github.com/Pratham8955/Human_resource_management_system',
      caseStudy: {
        overview: 'Working Wave is a comprehensive Java EE enterprise application handling employee onboarding, attendance, performance training, and hierarchical leave approvals.',
        problem: 'Organizations struggle with multi-level approval hierarchies and audit requirements when tracking employee leave and internal tasks.',
        solution: 'Constructed an Enterprise Java Beans (EJB) architecture hosted on Payara Server with transactional MySQL storage and automated email notifications.',
        architecture: 'Java EE 3-Tier Enterprise architecture with EJB session beans handling business logic and Payara application server managing resource pools.',
        techStack: ['Java EE', 'Enterprise Java Beans (EJB)', 'MySQL', 'Payara Server', 'JSP/Servlets'],
        keyFeatures: [
          'Hierarchical leave approval state machine with manager delegates',
          'Centralized employee records, payroll metadata, and training workflows',
          'Audit log triggers in MySQL for all state transitions',
          'Modular architecture separating HR modules by functional role'
        ],
        challenges: 'Managing state transitions across multi-tier approvals without deadlocks.',
        lessons: 'Gained in-depth knowledge of Enterprise Java Bean lifecycles, application server clustering, and relational triggers.'
      }
    }
  ] as Project[],

  experience: [
    {
      id: 'elaunch',
      role: 'Full-Stack Developer',
      company: 'Elaunch Solutions Pvt. Ltd.',
      period: 'January 2026 – July 2026',
      location: 'Surat, Gujarat',
      description: 'Engineered production-grade web applications and high-throughput backend services using Next.js, Node.js, MongoDB, and Redis.',
      highlights: [
        'Developed end-to-end full-stack features on live client projects using Next.js frontend and Node.js REST API backend.',
        'Designed and delivered high-performance REST APIs for core application services including profile management and task dispatching.',
        'Implemented Redis in-memory caching to optimize frequent database queries, improving API response times by 30%.',
        'Built automated background Cron jobs for time-zone-aware scheduling and integrated WebSockets for real-time task notifications.',
        'Conducted systematic API validation and testing, identifying and resolving bottlenecks prior to production releases.'
      ],
      techStack: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'TypeScript', 'REST API', 'Socket.IO'],
      impact: 'Improved database throughput and reduced average API latency by 30% via Redis caching layer.'
    },
    {
      id: 'nj-india',
      role: 'Java Backend Developer',
      company: 'NJ India Pvt. Ltd.',
      period: 'June 2023 – June 2024',
      location: 'Surat, Gujarat',
      description: 'Completed rigorous hands-on enterprise Java backend engineering through the STEP traineeship program.',
      highlights: [
        'Completed comprehensive hands-on training in Java-based enterprise backend development and software design patterns.',
        'Developed scalable REST APIs using Advanced Java and Spring Boot for handling customer query pipelines.',
        'Tested and validated backend endpoints with Postman, ensuring adherence to strict error handling and logging standards.',
        'Collaborated with senior engineers on relational schema design, connection pooling, and code review standards.'
      ],
      techStack: ['Advanced Java', 'Spring Boot', 'MySQL', 'REST API', 'Postman', 'JDBC'],
      impact: 'Streamlined customer query resolution times and gained deep enterprise backend fundamentals.'
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: 'Master of Science in ICT (MSc ICT)',
      institution: 'J. P. Dawar Institute of Information Science and Technology',
      period: 'Aug 2024 – Jul 2026',
      location: 'Surat, Gujarat',
      grade: 'CGPA: 7.77',
      highlights: [
        'Post-graduate specialization in Advanced Software Engineering, Distributed Systems, and Modern Web Architectures.',
        'Completed research and practical implementations in microservices communication, caching, and enterprise database systems.'
      ]
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Smt. Diwaliben Harji Bhai Gondaliya College of BCA and IT',
      period: 'Oct 2021 – Apr 2024',
      location: 'Surat, Gujarat',
      grade: 'CGPA: 8.23',
      highlights: [
        'Graduated with distinction, establishing a solid foundation in Object-Oriented Programming (Java/C++), Data Structures, Algorithms, and Relational Database Systems (SQL).',
        'Led academic capstone projects in full-stack web and database management.'
      ]
    }
  ] as EducationItem[],

  currentlyBuilding: {
    status: 'SYSTEMS ONLINE',
    items: [
      { name: 'Distributed Microservices', tag: 'Architecture', desc: 'Event-driven service boundaries with message brokers' },
      { name: 'Spring Boot 4 & Cloud', tag: 'Backend', desc: 'Reactive streams & high-performance Java APIs' },
      { name: 'Docker & Kubernetes Labs', tag: 'DevOps', desc: 'Container orchestration & reproducible cluster environments' },
      { name: 'Sub-Millisecond Data Caching', tag: 'Performance', desc: 'Multi-layer Redis caching patterns' }
    ]
  },

  philosophy: [
    {
      title: 'Architectural Clarity Over Hype',
      desc: 'Pick the right tool for the job. Clean service boundaries, explicit types, and predictable data flows outlast fleeting trends.'
    },
    {
      title: 'Sub-Millisecond Performance',
      desc: 'Fast systems respect users. Proactive database indexing, smart Redis caching, and non-blocking I/O ensure instant responsiveness.'
    },
    {
      title: 'Type-Safe Contracts',
      desc: 'From database schema to REST payload to frontend UI, strict type contracts prevent production bugs before they reach runtime.'
    },
    {
      title: 'Craftsmanship in Every Line',
      desc: 'Readable, well-structured code is a gift to your team and your future self. Clean architecture is not a luxury; it is standard.'
    }
  ]
}
