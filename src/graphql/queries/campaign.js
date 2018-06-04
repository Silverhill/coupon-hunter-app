import gql from 'graphql-tag';

export const ALL_CAMPAIGNS = gql`
  query allCampaigns($limit: Int = 30, $skip: Int = 0) {
    allCampaigns(sortField: "startAt", sortDirection: -1, limit: $limit, skip: $skip) @connection(key: "allCampaigns"){
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
          address
          company {
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
        address
        company {
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

export const MY_COUPONS = gql`
  query myCoupons{
    myCoupons(sortField: "huntedAt", limit: 30, sortDirection: -1) {
      id
      status
      code
      ... on CouponHunted {
        huntedAt
        redeemedAt
        campaign {
          id
          startAt
          endAt
          country
          city
          totalCoupons
          huntedCoupons
          redeemedCoupons
          status
          remainingCoupons
          title
          description
          customMessage
          deleted
          image
          background
          office {
            address
            company {
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
    }
  }
`;

export const MY_REDEEMED_COUPONS = gql`
  query myRedeemedCoupons{
    myRedeemedCoupons(sortField: "redeemedAt", limit: 30, sortDirection: -1) {
      id
      status
      code
      ... on CouponHunted {
        redeemedAt
        huntedAt
        campaign {
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
          image
          background
          office {
            address
            company {
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
    }
  }
`;