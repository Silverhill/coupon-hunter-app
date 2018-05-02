import gql from 'graphql-tag';

export const CAPTURE_COUPON = gql`
  mutation captureCoupon($campaignId: String!) {
    captureCoupon(input: { campaignId: $campaignId }) {
      id
      status
      code
    }
  }
`;