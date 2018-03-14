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
