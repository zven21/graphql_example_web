export const post = `
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      desc
      user {
        email
      }
    }
  }
`
export const listPosts = `
  query {
    listPosts {
      id
      title
      desc
      user {
        email
      }
    }
  }
`
