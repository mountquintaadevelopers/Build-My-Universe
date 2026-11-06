import type { BlogPost } from '@/types/blogs';

export const blogsPageContent = {
  eyebrow: 'BMU Blogs',
  title: 'Property guides for Bengaluru',
  description:
    'Practical reading for anyone planning to buy, rent or sell a home, plot or commercial space.',
  readMoreLabel: 'Read article',
  backLabel: 'All blogs',
  disclaimer:
    'This article is general information, not legal or financial advice. Rules and fees can change, so confirm the details with a qualified professional before you commit.',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'first-home-bengaluru-checklist',
    category: 'Buying',
    title: 'Buying your first home in Bengaluru: a practical checklist',
    excerpt:
      'Set your full budget, check the paperwork and inspect the property properly before you pay a token amount.',
    publishedOn: '2026-11-05',
    sections: [
      {
        heading: 'Start with the full budget',
        paragraphs: [
          'The price on a listing is only part of what you will pay. Add stamp duty, registration charges, legal fees, loan processing fees, interiors and moving costs before you decide what you can afford.',
          'If you need a home loan, speak to lenders early. A clear idea of your eligibility keeps your search realistic and helps you move quickly when the right home appears.',
        ],
      },
      {
        heading: 'Choose the location for daily life',
        paragraphs: [
          'Visit the area on a working day, during the hours you would normally travel. Try the commute, then check the water supply, nearby schools, hospitals and shops.',
          'Ask neighbours what living there is really like. They can often tell you more about power cuts, flooding and traffic than any brochure will.',
        ],
      },
      {
        heading: 'Check the documents',
        paragraphs: [
          'For an under-construction project, look it up on the Karnataka RERA website and compare the registered details with what you have been promised.',
          'For a ready home, ask for the title deed, encumbrance certificate, Khata documents, recent tax receipts and the occupancy certificate. Have a property lawyer review them before you sign anything.',
        ],
      },
      {
        heading: 'Inspect before you pay',
        paragraphs: [
          'Walk through the home in daylight. Look for damp patches and cracks, test the taps and switches, and confirm that the actual layout matches the approved plan.',
          'Find out what the maintenance charges cover and whether any dues are pending. Put every promise that matters to you in writing.',
        ],
      },
    ],
  },
  {
    slug: 'renting-bengaluru-before-you-sign',
    category: 'Renting',
    title: 'Renting in Bengaluru: what to check before you sign',
    excerpt:
      'A few careful checks on the agreement, deposit and condition of the home can prevent most rental disputes.',
    publishedOn: '2026-11-05',
    sections: [
      {
        heading: 'Agree on the money first',
        paragraphs: [
          'Confirm the monthly rent, security deposit, maintenance charges and any brokerage before you commit. Deposits vary widely, so treat the first figure you hear as a starting point for discussion.',
          'Ask what deductions could be made from your deposit when you leave, and how long the refund will take. Make sure the answer appears in the agreement.',
        ],
      },
      {
        heading: 'Read the rental agreement',
        paragraphs: [
          'A good agreement names the landlord and tenant, and states the rent, deposit, term, notice period, lock-in period and yearly rent increase. It should also say who pays for repairs.',
          'A lease of more than a year generally has to be registered, which is one reason 11-month agreements are common. Whichever term you choose, keep a signed copy.',
        ],
      },
      {
        heading: 'Record the condition of the home',
        paragraphs: [
          'Before you move in, take dated photos and videos of every room. List the fittings, appliances and furniture, then note existing damage and share the list with your landlord.',
          'This simple record makes it much easier to settle deposit questions when you move out.',
        ],
      },
      {
        heading: 'Check the practical details',
        paragraphs: [
          'Ask about the water supply, power backup, parking, visitor rules and any society restrictions. Note the electricity and water meter readings on the day you move in.',
          'Confirm that the person renting out the home is the owner or has written authority to act for the owner.',
        ],
      },
    ],
  },
  {
    slug: 'buying-a-plot-documents-to-review',
    category: 'Plots',
    title: 'Buying a plot: the documents to review first',
    excerpt:
      'With a plot, the paperwork is the property. Here is what to ask for before you pay an advance.',
    publishedOn: '2026-11-05',
    sections: [
      {
        heading: 'Confirm who owns the land',
        paragraphs: [
          'Ask for the current sale deed and the earlier title documents. A property lawyer can trace the ownership history and check that the seller has the right to sell.',
          'If the land has several owners or heirs, confirm that everyone with a claim will sign the sale.',
        ],
      },
      {
        heading: 'Check for loans and disputes',
        paragraphs: [
          'An encumbrance certificate shows registered transactions on the property, such as a sale or a mortgage. In Karnataka, you can apply for one through the Kaveri Online Services portal.',
          'A clean certificate does not cover everything, because some disputes never appear in registration records. Your lawyer can advise on further checks, including court records.',
        ],
      },
      {
        heading: 'Make sure you can build on it',
        paragraphs: [
          'Land that was agricultural generally needs a conversion order before it can be used for housing. Check this first, as it affects both what you can build and whether a bank will lend against the plot.',
          'For a plot in a layout, confirm the approval from the planning authority and check that your plot number and dimensions match the approved layout plan.',
        ],
      },
      {
        heading: 'Walk the land yourself',
        paragraphs: [
          'Visit the plot with a licensed surveyor and confirm its boundaries, size and road access against the documents.',
          'Look at the land around it too. Check drainage, nearby water bodies and the availability of power and water connections before you make a decision.',
        ],
      },
    ],
  },
  {
    slug: 'choosing-a-commercial-space',
    category: 'Commercial',
    title: 'How to choose a commercial space for your business',
    excerpt:
      'The right space supports your customers, your team and your budget. These are the questions to ask first.',
    publishedOn: '2026-11-05',
    sections: [
      {
        heading: 'Start with how the business works',
        paragraphs: [
          'A shop depends on footfall and visibility. An office depends on the commute for your team. A warehouse depends on truck access and loading space. Write down what matters most before you start visiting properties.',
          'Plan for the next few years as well as today, so that you are not forced to move as soon as you grow.',
        ],
      },
      {
        heading: 'Work out the true monthly cost',
        paragraphs: [
          'Add maintenance, electricity, parking and applicable taxes to the quoted rent. Then budget separately for the security deposit and fit-out work.',
          'Ask whether the price is based on carpet area or built-up area, so that you can compare different spaces fairly.',
        ],
      },
      {
        heading: 'Confirm the permitted use',
        paragraphs: [
          'Check that your type of business is allowed at the address, both under local zoning and by the building itself. Ask for the occupancy certificate and any relevant fire safety clearance.',
          'List the trade licences or other approvals your business needs, and confirm that the premises can qualify for them.',
        ],
      },
      {
        heading: 'Negotiate the terms that matter',
        paragraphs: [
          'Before you sign, review the lock-in period, rent escalation, renewal rights and exit terms. Ask for a rent-free period if you need time for fit-out work.',
          'Have a lawyer review the lease, particularly the clauses on repairs, subletting and what happens to your improvements when you leave.',
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
