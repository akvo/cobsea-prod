import humps from 'humps';
import { useLocation } from 'react-router-dom';

export const tTypes = [
  'project',
  'actionPlan',
  'policy',
  'technicalResource',
  'financingResource',
  'event',
  'technology',
  'organisation',
  'stakeholder',
];

export const topicTypes = [
  'project',
  'actionPlan',
  'policy',
  'technicalResource',
  'financingResource',
  'event',
  'technology',
  'capacityBuilding',
];

export const networkTypes = ['organisation', 'stakeholder'];

export const networkNames = (network) => {
  const names = {
    organisation: 'Entity',
    stakeholder: 'Individual',
  };
  return names[humps.camelize(network)];
};

export const topicTypesIncludingOrg = topicTypes.concat(['organisation']);

export const topicTypesApprovedUser = topicTypes.concat([
  'organisation',
  'stakeholder',
]);

export const topicNames = (topic) => {
  const names = {
    initiative: 'Initiative',
    actionPlan: 'Action Plan',
    policy: 'Policy',
    technicalResource: 'Technical Resource',
    financingResource: 'Financing Resource',
    event: 'Event',
    technology: 'Technology',
    organisation: 'Entity',
    stakeholder: 'Individual',
    capacityBuilding: 'Capacity Building',
    caseStudy: 'Case Study',
    project: 'Project',
  };
  return names[humps.camelize(topic)];
};

export const resourceSubTypes = new Set([
  'financing_resource',
  'technical_resource',
  'action_plan',
]);
export const resourceTypeToTopicType = (type) =>
  resourceSubTypes.has(type) ? 'resource' : type;

export const relationsByTopicType = {
  resource: ['interested in'],
  technology: ['interested in'],
  event: ['interested in'],
  project: ['interested in'],
  policy: ['interested in'],
  stakeholder: ['interested in', 'other'],
  organisation: ['interested in', 'other'],
};

export const entityName = (entity) => {
  const names = {
    partner: 'Partner',
    owner: 'GPML Members',
    implementor: 'Center of excellence',
    donor: 'Sponsor',
  };
  return names[humps.camelize(entity)];
};

export const userRoles = ['USER', 'REVIEWER', 'ADMIN'];

export const reviewStatusUIText = {
  PENDING: 'Awaiting Review',
  ACCEPTED: 'Approved',
  REJECTED: 'Declined',
  ACCEPT: 'Approve',
  APPROVED: 'Approved',
  REJECT: 'Decline',
};

export const submissionReviewStatusUIText = {
  SUBMITTED: 'Submitted',
  APPROVED: 'Published',
  REJECTED: 'Declined',
};

export const reviewCommentModalTitle = {
  ACCEPTED: 'Approving',
  REJECTED: 'Declining',
};

export const reviewCommentPlaceholder = {
  ACCEPTED: 'Reason for approving this',
  REJECTED: 'Reason for declining this',
};

export const publishStatusUIText = {
  APPROVED: 'Approved',
  APPROVE: 'Approve',
  REJECTED: 'Declined',
  REJECT: 'Decline',
  UNAPPROVED: 'Unapproved',
  UNAPPROVE: 'Unapprove',
};

export const randomColor = (string) => {
  const colors = [
    '#FFB800',
    '#98B527',
    '#38A259',
    '#008776',
    '#006776',
    '#2F4858',
    '#FFC1B4',
    '#FE8A7F',
    '#C1554E',
  ];

  let hash = 0;
  if (string?.length === 0) return hash;
  for (let i = 0; i < string?.length; i++) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
};

export const tagsMap = (array, category, tags) => {
  return array.map((x) => {
    return (
      Object.values(tags)
        .flat()
        .find((o) => o.id === parseInt(x))?.tag || x
    );
  });
};

export const tagsMapExpertise = (array, category, tags) => {
  return array.map((x) => {
    return {
      ...(!isNaN(parseInt(x)) && { id: parseInt(x) }),
      tag:
        Object.values(tags)
          .flat()
          .find((o) => o.id === parseInt(x))?.tag || x?.toLowerCase(),
      tag_category: category,
    };
  });
};

export const toTitleCase = (phrase) => {
  return phrase
    ?.toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const useQuery = () => {
  const srcParams = new URLSearchParams(useLocation().search);
  const ret = {};
  for (var key of srcParams.keys()) {
    ret[key] = srcParams
      .get(key)
      .split(',')
      .filter((it) => it !== '');
  }
  return ret;
};

export const getTypeByResource = (type) => {
  let t = '';
  let name = '';
  let translations = '';
  switch (type) {
    case 'action_plan':
      t = 'action';
      name = 'Action Plan';
      translations = 'resource';
      break;
    case 'event':
      t = 'event_flexible';
      name = 'Event';
      translations = 'event';
      break;
    case 'initiative':
      t = 'initiative';
      name = 'Initiative';
      translations = 'initiative';
      break;
    case 'policy':
      t = 'policy';
      name = 'Policy';
      translations = 'policy';
      break;
    case 'financing_resource':
      t = 'financing';
      name = 'Financing Resource';
      translations = 'resource';
      break;
    case 'technical_resource':
      t = 'technical';
      name = 'Technical Resource';
      translations = 'resource';
      break;
    case 'technology':
      t = 'technology';
      name = 'Technology';
      translations = 'technology';
      break;
  }
  return { type: t, name: name, translations: translations };
};

export const languageOptions = [
  {
    label: 'Arabic',
    key: '0',
    value: 'ar',
    dbValue: 'ar',
  },
  {
    label: 'Chinese',
    key: '1',
    value: 'cn',
    dbValue: 'zh',
  },
  {
    label: 'French',
    key: '3',
    value: 'fr',
    dbValue: 'fr',
  },
  {
    label: 'Russian',
    key: '4',
    value: 'ru',
    dbValue: 'ru',
  },
  {
    label: 'Spanish',
    key: '5',
    value: 'es',
    dbValue: 'es',
  },
  {
    label: 'English',
    key: '6',
    value: 'en',
    dbValue: 'en',
  },
];

export function stripHtml(html) {
  let tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function transformStrapiResponse(value) {
  return value.map((item) => {
    return { id: item.id, ...item.attributes };
  });
}

export const lifecycleStageTags = [
  'Production',
  'Consumption',
  'Waste Management',
  'Legacy Plastics',
  'Full Life Cycle',
];

export const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return '<div class="' + className + '">' + '<span/>' + '</div>';
  },
};

export const getApiUrl = () => {
  const domains =
    process.env.REACT_APP_API_URL || 'https://unep-gpml.akvotest.org/';
  return `${domains}api`;
};

export function getStrapiUrl() {
  const domains =
    process.env.REACT_APP_API_URL || 'https://unep-gpml.akvotest.org/';
  return `${domains}strapi`;
}
