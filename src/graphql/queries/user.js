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
