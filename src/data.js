// Single source of truth for portfolio content.
export const SITE = {
  name: 'Yikang Wang',
  handle: 'yw',
  role: 'Software Engineer',
  location: 'Austin, TX',
  tagline:
    'I build the retrieval and ranking systems behind search and recommendations at Indeed, and keep them fast and reliable.',
  intro:
    'Software engineer focused on recommendation retrieval and search ranking. I work on the employer side of Indeed, building the systems that surface the right candidates to the right employers at scale.',
  now: 'going deeper on retrieval evaluation and A/B test design, and writing up what I learn.',
  edu: 'MS Business Analytics & BS Computer Science, UT Austin',
  links: {
    email: 'yikang.wang@utexas.edu',
    linkedin: 'https://www.linkedin.com/in/wangyikang1996/',
    github: 'https://github.com/wangyikang1996',
    resume: 'https://wangyikang1996.github.io/Yikang_Wang_Resume_April_2026.pdf',
  },
  experience: [
    {
      role: 'Software Engineer',
      org: 'Indeed',
      team: '4 teams · SWE II → Research Engineer',
      range: 'Aug 2021 — Present',
      bullets: [
        'Recommendation Systems (SWE II, 2025 to present): Lead design and delivery of improvements to the candidate retrieval system on the employer side, surfacing the right candidates to employers at scale. Drive A/B tests and lead retrieval improvements from design through launch.',
        'Job Matching (SWE, 2024 to 2025): Built and maintained services that use ML models to match job seekers and employers. Shipped ranking experiments that measurably reduced low quality matches.',
        'Search Ranking (SWE, 2023 to 2024): Shipped duplicate job collapsing in core job search, cutting redundant results and improving listing quality. Maintained algorithms powering core search services.',
        'Research Engineer (2021 to 2023): Built and launched a job seeker web product with a small team (React, Java, Terraform, Datadog), driving backend and full stack work from first commit to launch. Shipped support site features with A/B testing.',
      ],
      tags: ['Recsys', 'Retrieval', 'Ranking', 'Search', 'A/B', 'ML', 'Full stack'],
    },
    {
      role: 'Capstone Project',
      org: 'Dell',
      team: 'EUC Ecosystem Team',
      range: 'Nov 2020 — May 2021',
      bullets: [
        'Built an automated customer-service chatbot using deep learning and NLP to streamline hardware configuration inquiries.',
        'Partnered with Dell stakeholders to define scope and success criteria.',
      ],
      tags: ['NLP', 'DL'],
    },
    {
      role: 'Data Science Intern',
      org: 'CDW',
      team: 'Data Science & Analytics',
      range: 'Jun 2020 — Aug 2020',
      bullets: [
        'Built a clustering + predictive-modeling pipeline in Python that automated triage for 60,000+ sales and support inquiries — +50% throughput.',
        'Presented recommendations weekly to management stakeholders.',
      ],
      tags: ['Python', 'ML'],
    },
  ],
  stack: {
    Languages: ['Python', 'Java', 'Kotlin', 'JavaScript', 'SQL', 'C++', 'R', 'Swift', 'C', 'Haskell', 'SAS'],
    Frameworks: ['React', 'Spring Boot', 'PyTorch', 'TensorFlow', 'Spark', 'Pandas', 'NumPy', 'Scikit-learn', 'Django', 'GraphQL', 'Tableau', 'Gurobi'],
    Infrastructure: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Kafka', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Datadog', 'ETL', 'DDL'],
    Domains: ['Machine Learning', 'Deep Learning', 'Recommendation Systems', 'LLMs', 'Generative AI', 'RAG', 'Search Ranking', 'NLP', 'System Design', 'A/B Testing', 'Time Series'],
  },
  projects: [
    {
      title: 'Doodle Image Recognition',
      blurb: 'Kaggle competition — CNN + ResNet + MobileNet in TensorFlow. 92.5% accuracy across 340 classes.',
      tags: ['Deep Learning', 'TensorFlow'],
      year: '2021',
      href: 'https://wangyikang1996.github.io/cope/',
      metric: '92.5%',
      metricLabel: 'top-1 acc',
    },
    {
      title: 'Food-Ninja',
      blurb: 'Full-stack nutrition app. MySQL + Django API serving 1000+ food entries from 3rd-party sources.',
      tags: ['Full stack', 'Django'],
      year: '2020',
      href: 'https://wangyikang1996.github.io/tedx/',
      metric: '1K+',
      metricLabel: 'entries',
    },
    {
      title: 'Hit / Flop',
      blurb: 'Scraped 15K IMDB reviews; topic modeling, NetworkX graphs, LDA to find what makes action films work.',
      tags: ['NLP', 'Text Analytics'],
      year: '2020',
      href: 'https://wangyikang1996.github.io/360pro/',
      metric: '15K',
      metricLabel: 'reviews',
    },
  ],
  testimonials: [
    {
      quote:
        'Explained complex systems spanning several components, and taught me something new in the process.',
      who: 'Senior engineer and mentor',
    },
    {
      quote:
        'His design doc was easy to follow even from an outside perspective with little knowledge of the subject, and he took feedback well.',
      who: 'Software Engineer II',
    },
    {
      quote:
        'First to jump on cross team work, and his ownership of helping partner teams built real rapport.',
      who: 'Product Manager',
    },
  ],
  writing: [
    {
      title: 'Design docs an outsider can follow',
      blurb: 'The checklist I use so reviewers outside the project can still give real feedback.',
    },
    {
      title: 'A/B testing ranking changes without fooling yourself',
      blurb: 'Guardrails, sample size, and which metrics actually matter.',
    },
    {
      title: 'Getting productive in an unfamiliar codebase fast',
      blurb: 'A repeatable approach I reach for on every new system.',
    },
  ],
};
