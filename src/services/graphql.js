import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const login = graphql(gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`, {
  props: ({ ownProps, mutate }) => ({
    login(email, password) {
      return mutate({
        variables: { email, password }
      })
    }
  })
});

export const mutation = {
  signUp: graphql(gql`
    mutation register($input: AddUserInput){
      signUp(input: $input) {
        id
        name
        email
        role
      }
    }
  `, {
    props: ({ownProps, mutate}) => ({
      signUp(input) {
        return mutate({
          variables: {
            input: { ...input, role: 'hunter' },
          }
        })
      }
    })
  }),

  captureCoupon: graphql(gql`
    mutation huntCoupon($campaignId: String!){
      captureCoupon(input: { campaignId: $campaignId }) {
        id
        status
      }
    }
  `, {
    props: ({ownProps, mutate}) => ({
      captureCoupon(campaignId) {
        return mutate({
          variables: { campaignId },
          refetchQueries: ['myCoupons', 'composedMeAllCampaigns'],
        })
      }
    })
  }),
}

export const query = {
  getMyInfo: gql`
    query me {
      me {
        name
        role
        email
      }
    }
  `,

  campaignsByMakerId: gql`
    query campaignsByMakerId($makerId: String!){
      campaignsByMakerId(makerId: $makerId){
        endAt
        startAt
        city
        title
        id
        address
        country
        city
        image
        totalCoupons
        description
        customMessage
        deleted
        status
      }
    }
  `,

  signIn: gql`
    query signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        token
      }
    }
  `,

  myCoupons: gql`
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
  `,

  allCampaigns: gql`
    query allCampaigns {
      allCampaigns {
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
  `,

  composedMeAllCampaigns: gql`
    query composedMeAllCampaigns {
      me {
        name
        role
        email
      }

      allCampaigns(sortField: "startAt", sortDirection: -1) {
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
  `,
}

export default {
  query,
  mutation,
}