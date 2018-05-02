import gql from 'graphql-tag';

export const ME = gql`
  {
    me {
      name
      image
      role
      email
    }
  }
`;
