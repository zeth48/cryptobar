var axios = require('axios')
var path = 'https://api.coinmarketcap.com/v1/ticker/'

axios.get(path)
.then(function(response){
	response.data.map(record => {
		const editedRecord = {
			'name' : record.name,
			'price' : record.price_usd
		}
	if(editedRecord.name == 'Bitcoin'){
		console.log(editedRecord)
	}	
})
}
)
.catch(function (error){
	console.log(error)
}
);