export const ALL_PRODUCTS_QUERY = `
query ProductsQuery {
  products(first: 8) {
    nodes {
      id
      averageRating
      slug
      description
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        price
        regularPrice
        id
      }
      ... on VariableProduct {
        price
        id
        regularPrice
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
        regularPrice
      }
      ... on GroupProduct {
        id
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
              regularPrice
            }
          }
        }
      }
    }
  }
}`;

export const getProductsWithSlug = `query MyQuery {
  products {
    nodes {
      slug
      }
    }
}`;

export const getProductBySlug = `query getProductBySlug($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    name
    image {
      id
      sourceUrl
      description
      srcSet
      mediaDetails {
          height
          width
      }
    }
    description
    slug
    ... on VariableProduct {
      id
      name
      price
      regularPrice
    }
    ... on ExternalProduct {
      id
      name
      price
      regularPrice
    }
    ... on SimpleProduct {
      id
      name
      price
      regularPrice
    }
    ... on GroupProduct {
      id
      name
      price
    }
  }
}`;
