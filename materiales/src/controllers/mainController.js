const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visited= products.filter(product=>{
			return product.category == 'visited'
		})
		const oferta= products.filter(product=>{
			return product.category == 'in-sale'
		})
		res.render('index',{visited, inSale: oferta, toThousand})
	},
	//search: (req, res) => {
	//	res.render()
	//},
};

module.exports = controller;
