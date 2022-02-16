const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render ('products', { products, toThousand })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id= req.params.id;
		const filtrado = products.find (product =>{
			return product.id == id
		})
		res.render('detail', {product: filtrado, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render ('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const newProduct = {
			id: products.length + 1,
			name: req.body.name,
			price: req.body.price,
			image: req.file.filename
		};
		products.push (newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, {encoding: 'utf-8'}))
		res.redirect ('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id= req.params.id;
		const productToedit = products.find (product =>{
			return product.id == id;
	});
	res.render('product-edit-form', { product: productToedit, toThousand })
	},

	//Update - Method to update
	update: (req, res) => {

		products.forEach((element) => {
			if (element.id == req.params.id){
				element.name = req.body.name;
				element.description = req.body.description;
				element.price = req.body.price;
				element.discount = req.body.discount;
				element.category = req.body.category;
			}
		})
		const productJSON = JSON.stringify(products);
		fs.writeFileSync (productsFilePath, productJSON);
		res.redirect ('/products/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id= req.params.id;
		productToDelete = products.filter (product => { return product.id != id });
		res.redirect ('/products');	
		}
};

module.exports = controller;