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
          variables: {
            campaignId
          },
        })
      }
    })
  }),
}

export const query = {
  getMyInfo: gql`
    query getMyInfo {
      me {
        name
        role
        email
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
    {
      myCoupons {
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
            address
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
    {
      allCampaigns {
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

  composedMeAllCampaigns: gql`
    {
      me {
        name
        role
        email
      }

      allCampaigns {
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
        maker {
          name
          id
        }
      }
    }
  `
}

export default {
  query,
  mutation,
}