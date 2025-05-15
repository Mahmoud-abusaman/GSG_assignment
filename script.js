document.addEventListener('DOMContentLoaded', () => {
	const searchinput = document.getElementById('searcinput');
	const qoutecontainer = document.getElementById('qoutescontainer');
	const errordiv = document.getElementById('error');

	
	let quotes = [];
	
	async function fetchdata() {
		try {
			const response = await fetch('https://dummyjson.com/quotes');
			
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			quotes = data.quotes;
			renderqoutes(quotes);
		} 
		catch (error) {
			console.error('Error fetching data:', error);
			errordiv.style.display = 'block';
			errordiv.textContent = `Failed to load data: ${error.message}`;
		}
	}
	


	function renderqoutes(quotesparam) {
		qoutecontainer.innerHTML = '';
		
		if (quotesparam.length == 0) {
			qoutecontainer.innerHTML = '<p class="noresults">no quotes found matching your search.</p>';
			return;
		}
		
		quotesparam.forEach(quote => {
			const qoutecard = document.createElement('div');
			qoutecard.className = 'qoutecard';
			
			qoutecard.innerHTML = `
				<h6>${quote.author}</h6>
				<p>${quote.quote}</p> `;
			qoutecontainer.appendChild(qoutecard);
		});
	}



	function filterqoutes(inp) {
		if (!inp) {
			renderqoutes(quotes);
			return;
		}
		
		const filtereddata = quotes.filter(quote => 
			quote.quote.toLowerCase().includes(inp.toLowerCase()) || 
			quote.author.toLowerCase().includes(inp.toLowerCase())
		);
		
		renderqoutes(filtereddata);
	}
	
	searchinput.addEventListener('input', (e) => {
		filterqoutes(e.target.value);
	});
	
	fetchdata();
});