"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProduct = addProduct;
exports.addProductImage = addProductImage;
exports.changeProductImage = changeProductImage;
exports.createCollection = createCollection;
exports.delProducts = delProducts;
exports.deleteCollection = deleteCollection;
exports.editCollection = editCollection;
exports.editProduct = editProduct;
exports.getCollections = getCollections;
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.removeProductImage = removeProductImage;
exports.sendLinkCatalog = sendLinkCatalog;
exports.setProductVisibility = setProductVisibility;
exports.updateCartEnabled = updateCartEnabled;
var _functions = require("../util/functions");
/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

async function getProducts(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      in: 'query',
      schema: '5521999999999',
     }
     #swagger.parameters["qnt"] = {
      in: 'query',
      schema: '10',
     }
   */
  const {
    phone,
    qnt
  } = req.query;
  if (!phone) res.status(401).send({
    message: 'Please send the contact number you wish to return the products.'
  });
  try {
    const result = await req.client?.getProducts(phone, qnt);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on get products',
      error: error
    });
  }
}
async function getProductById(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      in: 'query',
      schema: '5521999999999',
     }
     #swagger.parameters["id"] = {
      in: 'query',
      schema: '10',
     }
   */
  const {
    phone,
    id
  } = req.query;
  if (!phone || !id) res.status(401).send({
    message: 'Please send the contact number and productId.'
  });
  try {
    const result = await req.client.getProductById(phone, id);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on get product',
      error: error
    });
  }
}
async function editProduct(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
    #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        options: { type: "object" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                          options: {
                            name: 'New name for product',
                          }
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id,
    options
  } = req.body;
  if (!id || !options) res.status(401).send({
    message: 'productId or options was not informed'
  });
  try {
    const result = await req.client.editProduct(id, options);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on edit product.',
      error: error
    });
  }
}
async function delProducts(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id
  } = req.body;
  if (!id) res.status(401).send({
    message: 'products Id was not informed'
  });
  try {
    const result = await req.client.delProducts(id);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on delete product.',
      error: error
    });
  }
}
async function changeProductImage(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        base64: { type: "string" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                          base64: '<base64_string>'
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id,
    base64
  } = req.body;
  if (!id || !base64) res.status(401).send({
    message: 'productId and base64 was not informed'
  });
  try {
    const result = await req.client.changeProductImage(id, base64);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on change product image.',
      error: error
    });
  }
}
async function addProduct(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        image: { type: "string" },
                        description: { type: "string" },
                        price: { type: "string" },
                        url: { type: "string" },
                        retailerId: { type: "string" },
                        currency: { type: "string" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          name: 'Product name',
                          image: '<base64_string>',
                          description: 'Description for your product',
                          price: '8890',
                          url: 'http://link_for_your_product.com',
                          retailerId: 'SKU001',
                          currency: 'BRL',
                        }
                    },
                }
            }
        }
    }
   */
  const {
    name,
    image,
    description,
    price,
    url,
    retailerId,
    currency = 'BRL'
  } = req.body;
  if (!name || !image || !price) res.status(401).send({
    message: 'name, price and image was not informed'
  });
  try {
    const result = await req.client.createProduct(name, image, description, price, false, url, retailerId, currency);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error',
      message: 'Error on add product.',
      error: error
    });
  }
}
async function addProductImage(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        base64: { type: "string" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                          base64: '<base64_string>'
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id,
    base64
  } = req.body;
  if (!id || !base64) res.status(401).send({
    message: 'productId and base64 was not informed'
  });
  try {
    const result = await req.client.addProductImage(id, base64);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on add product image.',
      error: error
    });
  }
}
async function removeProductImage(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        index: { type: "number" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                          index: 1
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id,
    index
  } = req.body;
  if (!id || !index) res.status(401).send({
    message: 'productId and index image was not informed'
  });
  try {
    const result = await req.client.removeProductImage(id, index);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on remove product image.',
      error: error
    });
  }
}
async function getCollections(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
     #swagger.parameters["qnt"] = {
      schema: '10'
     }
     #swagger.parameters["max"] = {
      schema: '10'
     }
   */
  const {
    phone,
    qnt,
    max
  } = req.query;
  if (!phone) res.status(401).send({
    message: 'phone was not informed'
  });
  try {
    const result = await req.client.getCollections(phone, qnt, max);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on get collections.',
      error: error
    });
  }
}
async function createCollection(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        products: { type: "array" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          name: 'Collection name',
                          products: ['<id_product1>', '<id_product2>'],
                        }
                    },
                }
            }
        }
    }
   */
  const {
    name,
    products
  } = req.body;
  if (!name || !products) res.status(401).send({
    message: 'name or products was not informed'
  });
  try {
    const result = await req.client.createCollection(name, products);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on create collection.',
      error: error
    });
  }
}
async function editCollection(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        products: { type: "array" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                          options: {
                            name: 'New name for collection',
                          }
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id,
    options
  } = req.body;
  if (!id || !options) res.status(401).send({
    message: 'id or options was not informed'
  });
  try {
    const result = await req.client.editCollection(id, options);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on edit collection.',
      error: error
    });
  }
}
async function deleteCollection(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id
  } = req.body;
  if (!id) res.status(401).send({
    message: 'id was not informed'
  });
  try {
    const result = await req.client.deleteCollection(id);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on delete collection.',
      error: error
    });
  }
}
async function setProductVisibility(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["obj"] = {
      in: 'body',
      schema: {
        $id: '<id_product>',
        $value: false,
      }
     }
     #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        value: { type: "boolean" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          id: '<product_id>',
                          value: false,
                        }
                    },
                }
            }
        }
    }
   */
  const {
    id,
    value
  } = req.body;
  if (!id || !value) res.status(401).send({
    message: 'product id or value (false, true) was not informed'
  });
  try {
    const result = await req.client.setProductVisibility(id, value);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on set product visibility.',
      error: error
    });
  }
}
async function updateCartEnabled(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
      #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        enabled: { type: "boolean" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          enabled: true,
                        }
                    },
                }
            }
        }
    }
   */
  const {
    enabled
  } = req.body;
  if (!enabled) res.status(401).send({
    message: 'enabled (false, true) was not informed'
  });
  try {
    const result = await req.client.updateCartEnabled(enabled);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on set enabled cart.',
      error: error
    });
  }
}
async function sendLinkCatalog(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
      #swagger.requestBody = {
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                      phones: { type: "array" },
                      message: { type: "string" }
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          phones: ['<array_phone_id'],
                          message: 'Message',
                        }
                    },
                }
            }
        }
    }
   */
  const {
    phones,
    message
  } = req.body;
  if (!phones) res.status(401).send({
    message: 'phones was not informed'
  });
  const results = [];
  try {
    const session = await req.client.getWid();
    const catalogLink = (0, _functions.createCatalogLink)(session);
    for (const phone of phones) {
      const result = await req.client.sendText(phone, `${message} ${catalogLink}`, {
        buttons: [{
          url: catalogLink,
          text: 'Abrir catálogo'
        }]
      });
      results.push({
        phone,
        status: result.id
      });
    }
    res.status(200).json({
      status: 'success',
      response: results
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Error on set enabled cart.',
      error: error
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnVuY3Rpb25zIiwicmVxdWlyZSIsImdldFByb2R1Y3RzIiwicmVxIiwicmVzIiwicGhvbmUiLCJxbnQiLCJxdWVyeSIsInN0YXR1cyIsInNlbmQiLCJtZXNzYWdlIiwicmVzdWx0IiwiY2xpZW50IiwianNvbiIsInJlc3BvbnNlIiwiZXJyb3IiLCJnZXRQcm9kdWN0QnlJZCIsImlkIiwiZWRpdFByb2R1Y3QiLCJvcHRpb25zIiwiYm9keSIsImRlbFByb2R1Y3RzIiwiY2hhbmdlUHJvZHVjdEltYWdlIiwiYmFzZTY0IiwiYWRkUHJvZHVjdCIsIm5hbWUiLCJpbWFnZSIsImRlc2NyaXB0aW9uIiwicHJpY2UiLCJ1cmwiLCJyZXRhaWxlcklkIiwiY3VycmVuY3kiLCJjcmVhdGVQcm9kdWN0IiwiY29uc29sZSIsImxvZyIsImFkZFByb2R1Y3RJbWFnZSIsInJlbW92ZVByb2R1Y3RJbWFnZSIsImluZGV4IiwiZ2V0Q29sbGVjdGlvbnMiLCJtYXgiLCJjcmVhdGVDb2xsZWN0aW9uIiwicHJvZHVjdHMiLCJlZGl0Q29sbGVjdGlvbiIsImRlbGV0ZUNvbGxlY3Rpb24iLCJzZXRQcm9kdWN0VmlzaWJpbGl0eSIsInZhbHVlIiwidXBkYXRlQ2FydEVuYWJsZWQiLCJlbmFibGVkIiwic2VuZExpbmtDYXRhbG9nIiwicGhvbmVzIiwicmVzdWx0cyIsInNlc3Npb24iLCJnZXRXaWQiLCJjYXRhbG9nTGluayIsImNyZWF0ZUNhdGFsb2dMaW5rIiwic2VuZFRleHQiLCJidXR0b25zIiwidGV4dCIsInB1c2giXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9jYXRhbG9nQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyBjcmVhdGVDYXRhbG9nTGluayB9IGZyb20gJy4uL3V0aWwvZnVuY3Rpb25zJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgaW46ICdxdWVyeScsXG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5JyxcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wicW50XCJdID0ge1xuICAgICAgaW46ICdxdWVyeScsXG4gICAgICBzY2hlbWE6ICcxMCcsXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIHFudCB9ID0gcmVxLnF1ZXJ5O1xuICBpZiAoIXBob25lKVxuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6XG4gICAgICAgICdQbGVhc2Ugc2VuZCB0aGUgY29udGFjdCBudW1iZXIgeW91IHdpc2ggdG8gcmV0dXJuIHRoZSBwcm9kdWN0cy4nLFxuICAgIH0pO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxLmNsaWVudD8uZ2V0UHJvZHVjdHMoXG4gICAgICBwaG9uZSBhcyBzdHJpbmcsXG4gICAgICBxbnQgYXMgdW5rbm93biBhcyBudW1iZXJcbiAgICApO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCBwcm9kdWN0cycsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RCeUlkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgaW46ICdxdWVyeScsXG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5JyxcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wiaWRcIl0gPSB7XG4gICAgICBpbjogJ3F1ZXJ5JyxcbiAgICAgIHNjaGVtYTogJzEwJyxcbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgaWQgfSA9IHJlcS5xdWVyeTtcbiAgaWYgKCFwaG9uZSB8fCAhaWQpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ1BsZWFzZSBzZW5kIHRoZSBjb250YWN0IG51bWJlciBhbmQgcHJvZHVjdElkLicsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmdldFByb2R1Y3RCeUlkKFxuICAgICAgcGhvbmUgYXMgc3RyaW5nLFxuICAgICAgaWQgYXMgc3RyaW5nXG4gICAgKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ0Vycm9yJywgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCBwcm9kdWN0JywgZXJyb3I6IGVycm9yIH0pO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdFByb2R1Y3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2F0YWxvZyAmIEJ1c3NpbmVzc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHR5cGU6IFwib2JqZWN0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnPHByb2R1Y3RfaWQ+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdOZXcgbmFtZSBmb3IgcHJvZHVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IGlkLCBvcHRpb25zIH0gPSByZXEuYm9keTtcbiAgaWYgKCFpZCB8fCAhb3B0aW9ucylcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAncHJvZHVjdElkIG9yIG9wdGlvbnMgd2FzIG5vdCBpbmZvcm1lZCcsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmVkaXRQcm9kdWN0KGlkLCBvcHRpb25zKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBlZGl0IHByb2R1Y3QuJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsUHJvZHVjdHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2F0YWxvZyAmIEJ1c3NpbmVzc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICc8cHJvZHVjdF9pZD4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5O1xuICBpZiAoIWlkKVxuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6ICdwcm9kdWN0cyBJZCB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuZGVsUHJvZHVjdHMoaWQpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGRlbGV0ZSBwcm9kdWN0LicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoYW5nZVByb2R1Y3RJbWFnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDYXRhbG9nICYgQnVzc2luZXNzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgIFxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZTY0OiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnPHByb2R1Y3RfaWQ+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZTY0OiAnPGJhc2U2NF9zdHJpbmc+J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgaWQsIGJhc2U2NCB9ID0gcmVxLmJvZHk7XG4gIGlmICghaWQgfHwgIWJhc2U2NClcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAncHJvZHVjdElkIGFuZCBiYXNlNjQgd2FzIG5vdCBpbmZvcm1lZCcsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmNoYW5nZVByb2R1Y3RJbWFnZShpZCwgYmFzZTY0KTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBjaGFuZ2UgcHJvZHVjdCBpbWFnZS4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRQcm9kdWN0KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbGVySWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1Byb2R1Y3QgbmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiAnPGJhc2U2NF9zdHJpbmc+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiBmb3IgeW91ciBwcm9kdWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICc4ODkwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xpbmtfZm9yX3lvdXJfcHJvZHVjdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaWxlcklkOiAnU0tVMDAxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6ICdCUkwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHtcbiAgICBuYW1lLFxuICAgIGltYWdlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIHByaWNlLFxuICAgIHVybCxcbiAgICByZXRhaWxlcklkLFxuICAgIGN1cnJlbmN5ID0gJ0JSTCcsXG4gIH0gPSByZXEuYm9keTtcbiAgaWYgKCFuYW1lIHx8ICFpbWFnZSB8fCAhcHJpY2UpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ25hbWUsIHByaWNlIGFuZCBpbWFnZSB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuY3JlYXRlUHJvZHVjdChcbiAgICAgIG5hbWUsXG4gICAgICBpbWFnZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgcHJpY2UsXG4gICAgICBmYWxzZSxcbiAgICAgIHVybCxcbiAgICAgIHJldGFpbGVySWQsXG4gICAgICBjdXJyZW5jeVxuICAgICk7XG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3VsdCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGFkZCBwcm9kdWN0LicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFByb2R1Y3RJbWFnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDYXRhbG9nICYgQnVzc2luZXNzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlNjQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICc8cHJvZHVjdF9pZD4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlNjQ6ICc8YmFzZTY0X3N0cmluZz4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgKi9cbiAgY29uc3QgeyBpZCwgYmFzZTY0IH0gPSByZXEuYm9keTtcbiAgaWYgKCFpZCB8fCAhYmFzZTY0KVxuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6ICdwcm9kdWN0SWQgYW5kIGJhc2U2NCB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuYWRkUHJvZHVjdEltYWdlKGlkLCBiYXNlNjQpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGFkZCBwcm9kdWN0IGltYWdlLicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVByb2R1Y3RJbWFnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDYXRhbG9nICYgQnVzc2luZXNzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogeyB0eXBlOiBcIm51bWJlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzxwcm9kdWN0X2lkPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgKi9cbiAgY29uc3QgeyBpZCwgaW5kZXggfSA9IHJlcS5ib2R5O1xuICBpZiAoIWlkIHx8ICFpbmRleClcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAncHJvZHVjdElkIGFuZCBpbmRleCBpbWFnZSB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQucmVtb3ZlUHJvZHVjdEltYWdlKGlkLCBpbmRleCk7XG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3VsdCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gcmVtb3ZlIHByb2R1Y3QgaW1hZ2UuJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbnMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2F0YWxvZyAmIEJ1c3NpbmVzc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wicGhvbmVcIl0gPSB7XG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5J1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJxbnRcIl0gPSB7XG4gICAgICBzY2hlbWE6ICcxMCdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wibWF4XCJdID0ge1xuICAgICAgc2NoZW1hOiAnMTAnXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIHFudCwgbWF4IH0gPSByZXEucXVlcnk7XG4gIGlmICghcGhvbmUpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ3Bob25lIHdhcyBub3QgaW5mb3JtZWQnLFxuICAgIH0pO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxLmNsaWVudC5nZXRDb2xsZWN0aW9ucyhcbiAgICAgIHBob25lIGFzIHN0cmluZyxcbiAgICAgIHFudCBhcyBzdHJpbmcsXG4gICAgICBtYXggYXMgc3RyaW5nXG4gICAgKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBnZXQgY29sbGVjdGlvbnMuJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ29sbGVjdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDYXRhbG9nICYgQnVzc2luZXNzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7IHR5cGU6IFwiYXJyYXlcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0NvbGxlY3Rpb24gbmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiBbJzxpZF9wcm9kdWN0MT4nLCAnPGlkX3Byb2R1Y3QyPiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgbmFtZSwgcHJvZHVjdHMgfSA9IHJlcS5ib2R5O1xuICBpZiAoIW5hbWUgfHwgIXByb2R1Y3RzKVxuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6ICduYW1lIG9yIHByb2R1Y3RzIHdhcyBub3QgaW5mb3JtZWQnLFxuICAgIH0pO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxLmNsaWVudC5jcmVhdGVDb2xsZWN0aW9uKG5hbWUsIHByb2R1Y3RzKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBjcmVhdGUgY29sbGVjdGlvbi4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlZGl0Q29sbGVjdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDYXRhbG9nICYgQnVzc2luZXNzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czogeyB0eXBlOiBcImFycmF5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnPHByb2R1Y3RfaWQ+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdOZXcgbmFtZSBmb3IgY29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IGlkLCBvcHRpb25zIH0gPSByZXEuYm9keTtcbiAgaWYgKCFpZCB8fCAhb3B0aW9ucylcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAnaWQgb3Igb3B0aW9ucyB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuZWRpdENvbGxlY3Rpb24oaWQsIG9wdGlvbnMpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGVkaXQgY29sbGVjdGlvbi4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVDb2xsZWN0aW9uKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnPHByb2R1Y3RfaWQ+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IGlkIH0gPSByZXEuYm9keTtcbiAgaWYgKCFpZClcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAnaWQgd2FzIG5vdCBpbmZvcm1lZCcsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmRlbGV0ZUNvbGxlY3Rpb24oaWQpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGRlbGV0ZSBjb2xsZWN0aW9uLicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFByb2R1Y3RWaXNpYmlsaXR5KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcIm9ialwiXSA9IHtcbiAgICAgIGluOiAnYm9keScsXG4gICAgICBzY2hlbWE6IHtcbiAgICAgICAgJGlkOiAnPGlkX3Byb2R1Y3Q+JyxcbiAgICAgICAgJHZhbHVlOiBmYWxzZSxcbiAgICAgIH1cbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnPHByb2R1Y3RfaWQ+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgaWQsIHZhbHVlIH0gPSByZXEuYm9keTtcbiAgaWYgKCFpZCB8fCAhdmFsdWUpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ3Byb2R1Y3QgaWQgb3IgdmFsdWUgKGZhbHNlLCB0cnVlKSB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuc2V0UHJvZHVjdFZpc2liaWxpdHkoaWQsIHZhbHVlKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBzZXQgcHJvZHVjdCB2aXNpYmlsaXR5LicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNhcnRFbmFibGVkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgZW5hYmxlZCB9ID0gcmVxLmJvZHk7XG4gIGlmICghZW5hYmxlZClcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAnZW5hYmxlZCAoZmFsc2UsIHRydWUpIHdhcyBub3QgaW5mb3JtZWQnLFxuICAgIH0pO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxLmNsaWVudC51cGRhdGVDYXJ0RW5hYmxlZChlbmFibGVkKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBzZXQgZW5hYmxlZCBjYXJ0LicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRMaW5rQ2F0YWxvZyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwaG9uZXM6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBcInN0cmluZ1wiIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBob25lczogWyc8YXJyYXlfcGhvbmVfaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ01lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmVzLCBtZXNzYWdlIH0gPSByZXEuYm9keTtcbiAgaWYgKCFwaG9uZXMpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ3Bob25lcyB3YXMgbm90IGluZm9ybWVkJyxcbiAgICB9KTtcbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCByZXEuY2xpZW50LmdldFdpZCgpO1xuICAgIGNvbnN0IGNhdGFsb2dMaW5rID0gY3JlYXRlQ2F0YWxvZ0xpbmsoc2Vzc2lvbik7XG4gICAgZm9yIChjb25zdCBwaG9uZSBvZiBwaG9uZXMpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuc2VuZFRleHQoXG4gICAgICAgIHBob25lLFxuICAgICAgICBgJHttZXNzYWdlfSAke2NhdGFsb2dMaW5rfWAsXG4gICAgICAgIHtcbiAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVybDogY2F0YWxvZ0xpbmssXG4gICAgICAgICAgICAgIHRleHQ6ICdBYnJpciBjYXTDoWxvZ28nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgKHJlc3VsdHMgYXMgYW55KS5wdXNoKHsgcGhvbmUsIHN0YXR1czogcmVzdWx0LmlkIH0pO1xuICAgIH1cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzdWx0cyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2V0IGVuYWJsZWQgY2FydC4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLElBQUFBLFVBQUEsR0FBQUMsT0FBQTtBQWpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS08sZUFBZUMsV0FBV0EsQ0FBQ0MsR0FBWSxFQUFFQyxHQUFhLEVBQUU7RUFDN0Q7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0UsTUFBTTtJQUFFQyxLQUFLO0lBQUVDO0VBQUksQ0FBQyxHQUFHSCxHQUFHLENBQUNJLEtBQUs7RUFDaEMsSUFBSSxDQUFDRixLQUFLLEVBQ1JELEdBQUcsQ0FBQ0ksTUFBTSxD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