// Single source of truth for portfolio content.
export const SITE = {
  name: 'Yikang Wang',
  handle: 'yw',
  role: 'Software Engineer',
  location: 'Austin, TX',
  tagline: 'Building recommendation systems & search infrastructure at Indeed.',
  intro:
    "Software engineer focused on recommendation retrieval and search ranking. I like building systems that match people with the right opportunity — and the plumbing that makes that reliable at scale.",
  edu: 'MS Business Analytics & BS Computer Science, UT Austin',
  links: {
    email: 'yikang.wang@utexas.edu',
    linkedin: 'https://www.linkedin.com/in/wangyikang1996/',
    github: 'https://github.com/wangyikang1996',
    resume: 'https://wangyikang1996.github.io/Yikang_Wang_Resume.pdf',
  },
  experience: [
    {
      role: 'Software Engineer',
      org: 'Indeed',
      team: '4 teams · SWE II → Research Engineer',
      range: 'Aug 2021 — Present',
      bullets: [
        'Employer Recommendation (SWE II, 2025—now): Lead design and delivery of improvements to the employer-side recommendation retrieval system that surfaces qualified candidates for sourcing and the premium job experience. Drive A/B testing and pay down operational debt via the DFR cycle.',
        'Match Recommender (SWE, 2024—25): Built and maintained Match Provider services aligning jobs between seekers and employers with ML models. Shipped experiments that cut low-quality matches by 12%.',
        'Ranking Capabilities (SWE, 2023—24): Shipped duplicate-job collapsing in core Job Search, reducing redundant results and improving ranked-listing quality. Maintained algorithms powering core job-search services.',
        'Search Quality (Research Engineer, 2021—23): Built and launched the GotAJob website with a team of four (React, Java, Terraform, Datadog). Shipped Help Center and Contact form features with A/B testing.',
      ],
      tags: ['Recsys', 'Retrieval', 'Ranking', 'Search', 'A/B', 'ML', 'Full-stack'],
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
      tags: ['Full-stack', 'Django'],
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
};
