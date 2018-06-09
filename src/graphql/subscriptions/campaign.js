import gql from 'graphql-tag';

export const REDEEMED_COUPON = gql`
  subscription redeemedCoupon {
    redeemedCoupon {
      id
      code
      status
      huntedAt
      redeemedAt
      campaign{
        id
        startAt
        endAt
        country
        city
        image
        totalCoupons
        huntedCoupons
        redeemedCoupons
        status
        title
        description
        customMessage
        deleted
        background
        createdAt
        office {
          address
          company {
            logo
            businessName
          }
        }
        maker{
          id
          name
          image
        }
        remainingCoupons
      }
    }
  }
`;

export const UPDATE_CAMPAIGN = gql`
  subscription updatedCampaign($campaignId: String!) {
    updatedCampaign(campaignId: $campaignId) {
      id
      startAt
      endAt
      country
      city
      totalCoupons
      huntedCoupons
      redeemedCoupons
      couponsRedeemedByMe
      couponsHuntedByMe
      canHunt
      status
      title
      description
      customMessage
      deleted
      image
      remainingCoupons
      background
      office {
        id
        address
        company {
          id
          logo
          businessName
        }
      }
      maker {
        id
        name
        image
      }
    }
  }
`;