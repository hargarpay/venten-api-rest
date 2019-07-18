# Venten Rest API

## Create Product
Create a product

### HTTP REQUEST

`POST /product`

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
name | String | Name of the product
description | String | Description of the product
price | Number | Price of the product
category | String | Category of the product
color | String | Color of the product
image | String | Url of the image of the product

### Response

```json
{
    "success": true,
    "data": {
        "id": 1,
        "created_on": "2019-07-18T01:01:21.530Z",
        "name": "Product 1",
        "description": "The description product 1",
        "price": "60.00",
        "category": "product Category 1",
        "image": "https://google.com",
        "color": "red"
    }
}
```

## View All Products
View all the products created by users

### HTTP REQUEST

`GET /products`

### RESPONSE

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Product 1",
            "price": "60.00"
        },
        {
            "id": 2,
            "name": "Product 2",
            "price": "100.00"
        },
        {
            "id": 3,
            "name": "Product 3",
            "price": "30.00"
        },
    ]
}
```

## View Specific Product
View a specific products created by users

### HTTP REQUEST

`GET /product/1`

### Response

```json
{
    "success": true,
    "data": {
        "id": 1,
        "created_on": "2019-07-18T01:01:21.530Z",
        "name": "Product 1",
        "description": "The description product 1",
        "price": "60.00",
        "category": "product Category 1",
        "image": "https://google.com",
        "color": "red"
    }
}
```


