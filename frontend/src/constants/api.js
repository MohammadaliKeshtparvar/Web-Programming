/**
 * API CONSTANTS
 * */

 export default {
    getItems:                              {   endpoint: '/product/getAll',                                       method: 'GET'                      },
    getItemsByPrice:                       {   endpoint: '/product/getAllByPrice',                                method: 'GET'                      },
    getSections:                           {   endpoint: '/category/getAll',                                      method: 'GET'                      },  
    search:                                {   endpoint: '/product/search',                                       method: 'GET'                      },     
    login:                                 {   endpoint: '/user/login',                                           method: 'POST'                     },     
    signup:                                {   endpoint: '/user/add',                                             method: 'POST'                     },     
    incrementMoney:                        {   endpoint: '',                                                      method: 'PUT'                      },
    update:                                {   endpoint: '/user/update',                                          method: 'PUT'                      },
    filterPrice:                           {   endpoint: '/product/searchByPrice',                                method: 'GET'                      },
    buyProduct:                            {   endpoint: '/user/buy',                                             method: 'POST'                     },
};
