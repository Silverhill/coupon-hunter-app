import gql from 'graphql-tag';

export const ALL_CAMPAIGNS_AND_ME = gql`
  query allCampaignsAndMe($withMe: Boolean = true, $limit: Int = 30, $skip: Int = 0) {
    me @include(if: $withMe){
      name
      role
      email
      image
    }

    allCampaigns(sortField: "startAt", sortDirection: -1, limit: $limit, skip: $skip) {
      totalCount
      campaigns {
        id
        startAt
        endAt
        country
        city
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
        couponsHuntedByMe
        maker {
          id
          name
          provider
          role
        }
      }
    }
  }
`;

export const CAMPAIGNS_BY_MAKER_ID = gql`
  query campaignsByMakerId($makerId: String!){
    campaignsByMakerId(makerId: $makerId){
      id
      startAt
      endAt
      country
      city
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
    }
  }
`;

export const MY_COUPONS = gql`
  query myCoupons{
    myCoupons(sortField: "startAt", limit: 30) {
      id
      status
      code
      ... on CouponHunted {
        campaign {
          endAt
          startAt
          city
          title
          id
          country
          city
          image
          totalCoupons
          description
          customMessage
          deleted
          status
          maker {
            id
            name
          }
        }
      }
    }
  }
`;