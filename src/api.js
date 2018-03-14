import gql from 'graphql-tag';

const graphqlQueries = {
  user: {

    login: gql`
      mutation login($email: String!, $password: String!){
        login(email: $email, password: $password)
      }
    `,

  },
};

export default graphqlQueries;