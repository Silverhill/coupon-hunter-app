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