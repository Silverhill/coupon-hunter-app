import gql from 'graphql-tag';

export const ME = gql`
  {
    me {
      email
      id
      image
      name
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