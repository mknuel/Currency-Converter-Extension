const list = document.getElementById("currency_from");
const list2 = document.getElementById("currency_to");
const result = document.getElementById("result");
const input = document.getElementById("amount");
const submit = document.getElementById("submit");
let settings = {
	from: "",
	to: "",
	amount: 0,
};

list.addEventListener("change", handleChange);
list2.addEventListener("change", handleChange);
input.addEventListener("change", handleChange);
submit.addEventListener("click", handleSubmit);

async function getCurrency() {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "8b3d33bf65msh8d4b11b1316112dp1c1ab7jsn5f46d6d70ad2",
			"X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
		},
	};

	const res = await fetch(
		"https://currency-exchange.p.rapidapi.com/listquotes",
		options
	);

	const currencies = await res.json();
	console.log(currencies);
	appendCurrency(currencies);
}

function handleChange(e) {
	console.log(e);
	settings = {
		...settings,
		[e.target.name]: e.target.value,
	};

	console.log(settings);
}

async function handleSubmit(e) {
	e.preventDefault();

	return await convertCurrency();
}
function appendCurrency(currencies) {
	list.innerHTML = currencies.map(
		(currency) => `<option value="${currency}">${currency}</option>`
	);
	list2.innerHTML = currencies.map(
		(currency) => `<option value="${currency}">${currency}</option>`
	);

	list.setAttribute("default", currencies[0]);
	list2.setAttribute("default", currencies[1]);
	settings.from = currencies[0];
	settings.to = currencies[1];
}

getCurrency();

async function convertCurrency() {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "8b3d33bf65msh8d4b11b1316112dp1c1ab7jsn5f46d6d70ad2",
			"X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
		},
	};

	const res = await fetch(
		`https://currency-exchange.p.rapidapi.com/exchange?from=${settings.from}&to=${settings.to}&q=${settings.amount}`,
		options
	);
	const value = await res.json();
	console.log(value);
	result.innerText = value;
}
