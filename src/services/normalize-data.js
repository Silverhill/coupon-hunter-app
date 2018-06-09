import { normalize, schema } from 'normalizr';

const normalizeAllCampaigns = (queryAllCampaigns) => {
  const maker = new schema.Entity('makers');
  const company = new schema.Entity('companies');
  const office = new schema.Entity('offices', {
    company: company,
  });

  const campaign = new schema.Entity('campaigns', {
    maker: maker,
    office: office,
  })

  const normalizedData = normalize(queryAllCampaigns, new schema.Array(campaign));

  return normalizedData;
}

export default {
  normalizeAllCampaigns,
}