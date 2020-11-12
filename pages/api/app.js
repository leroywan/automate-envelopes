import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await (
      await fetch(
        "https://looloolo.myshopify.com/admin/api/2020-10/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/graphql",
            "X-Shopify-Access-Token": SHOPIFY_API_SECRET_KEY,
            Accept: "application/json",
          },
          body: `
            {
              orders(first: 50, query: "fulfillment_status:unfulfilled AND created_at:>2020-10-20") {
                edges {
                  node {
                    shippingAddress {
                      formatted
                      phone
                    }
                    lineItems(first: 5) {
                      edges {
                        cursor
                        node {
                          name
                          customAttributes {
                            key
                            value
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        }
      )
    ).json();

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  } else {
    // Handle any other HTTP method
  }
}