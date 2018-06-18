import gql from 'graphql-tag';

export const ME = gql`
  {
    me {
      ...on Hunter {
        id
        name
        email
        score
        role
      }
    }
  }
`;

export const SIGN_IN = gql`
  query signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password) {
      token
    }
  }
`;