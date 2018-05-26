import { Queries } from '../graphql';

class UpdateQuery {

  campaigns = (cache, { data: { captureCoupon: { campaign, ...coupon } } }) => {
    const { allCampaigns } = cache.readQuery({ query: Queries.ALL_CAMPAIGNS });

    try {
      const { myCoupons } = cache.readQuery({ query: Queries.MY_COUPONS });
      const newCoupon = { ...coupon, campaign }
      cache.writeQuery({ query: Queries.MY_COUPONS, data: { myCoupons: myCoupons.concat(newCoupon) } });
    } catch (err) {/*console.log(err);*/}

    const campaigns = ((allCampaigns || {}).campaigns || []).map((_campaign, i) => {
      if(campaign.id === _campaign.id) {
        return {
          ..._campaign,
          canHunt: false,
          remainingCoupons: campaign.remainingCoupons,
        };
      }

      return _campaign;
    });

    const newDataAllCampaigns = {
      allCampaigns: {
        ...allCampaigns,
        campaigns,
      },
    };

    cache.writeQuery({ query: Queries.ALL_CAMPAIGNS, data: newDataAllCampaigns });
  }

};

export default new UpdateQuery();