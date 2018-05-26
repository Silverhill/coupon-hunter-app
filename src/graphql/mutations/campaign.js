import gql from 'graphql-tag';

export const CAPTURE_COUPON = gql`
  mutation captureCoupon($campaignId: String!) {
    captureCoupon(input: { campaignId: $campaignId }) {
      id
      status
      code
      campaign {
        id
        startAt
        endAt
        country
        city
        totalCoupons
        huntedCoupons
        redeemedCoupons
        remainingCoupons
        status
        title
        description
        customMessage
        deleted
        image
        background
        maker {
          id
          name
        }
      }
    }
  }
`;