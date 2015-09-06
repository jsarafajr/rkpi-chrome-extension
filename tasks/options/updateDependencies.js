module.exports = {
	build: {
		options: {
			dependencies: [
				{
					"src": "app/bower/jquery/dist/jquery.min.js",
					"dest": "app/lib/js/jquery.min.js"
			}
			]
		}
	},
	debug: {
		options: {
			dependencies: [
				{
					"src": "app/bower/jquery/dist/jquery.min.js",
					"dest": "app/libs/js/jquery.min.js"
			}
			]
		}
	}
};