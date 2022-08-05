module.exports = {

	//main-page
	'home': 					{ 	path: '/', 								dir: '/home' , header: { fixedTheme: 'transparent', main: true }},

	'login':					{	path: '/login',							dir: '/login'									   				},
	'signup':					{	path: '/signup',						dir: '/signup'									   				},
	'profile':					{	path: '/profile',						dir: '/profile'	,	private: true								},
	'balance':					{	path: '/user-balance',					dir: '/profile/balance'									   		},

	'adminProfile':				{	path: '/admin-profile',					dir: '/adminProfile'									   		},
	'createProduct': 			{	path: '/create-product',				dir: '/adminProfile/createProduct'								},
	'editProduct': 				{	path: '/edit-product',					dir: '/adminProfile/editProduct'								},
	'editSection': 				{	path: '/edit-section',					dir: '/adminProfile/editSection'								},
};