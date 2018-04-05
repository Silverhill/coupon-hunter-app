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
        _id
        name
        email
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
}

export default {
  query,
  mutation,
}