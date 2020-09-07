# JudgeMe SDK
A simple wrapper to handle JudgeMe reviews

## Initialize Store

Create a new instance of JudgeMe to initialize.

```js
const judgeMe = new JudgeMeController({
  shop_domain: 'judge-me-demo-store.myshopify.com',
})

```

## Product Reviews
### Initialize Product


To get reviews for a product, start by initializing the product.

```js
const PRODUCT_ID = '3784982364220'
const product = judgeMe.product(PRODUCT_ID)
```

### Fetch Reviews

Now, use the `getReviews` method to get reviews on that product

```js

// Get reviews with default settings
const reviews = await product.getReviews().fetch() 

// Advanced review settings
const reviews = await product.getReviews()
  .sortBy('most-recent')
  .search('wow')
  .perPage(10)
  .fetch() 
```

### Post Reviews
use the `postReview` method to post product reviews 

```js
product.postReview({
  name: 'Tyler',
  email: 'hello@tylermcrobert.com',
  rating: 5,
  title: 'Amazing!',
  body: 'Fantastic product. Would reccommend to everybody I know'
}).then(() => { /* handle response */ }
```

