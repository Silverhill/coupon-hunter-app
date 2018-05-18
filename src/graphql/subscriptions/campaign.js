import gql from 'graphql-tag';

export const REDEEMED_COUPON = gql`
  subscription redeemedCoupon {
    redeemedCoupon {
      id
      code
      status
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
        initialAgeRange
        finalAgeRange
        createdAt
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