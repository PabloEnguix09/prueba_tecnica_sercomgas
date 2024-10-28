import React from 'react';
import { Option } from '../types/types';
import { convertMarketerToOption } from '../services/utils';

const mockData = [
	{
		value: 1,
		label: 'Coca Cola',
	},
	{
		value: 2,
		label: 'Pepsi',
	},
	{
		value: 3,
		label: 'Fanta',
	},
];

const operationOptions = [
	{
		value: 'Compra',
		label: 'Compra',
	},
	{
		value: 'Venta',
		label: 'Venta',
	},
];

export default function NewOperation() {
	const [marketer_id, setMarketerId] = React.useState(NaN);
	const [client_id, setClientId] = React.useState(NaN);
	const [type, setType] = React.useState('');
	const [amount, setAmount] = React.useState(NaN);
	const [price, setPrice] = React.useState(NaN);

	const emptyFieldErrorMsg = 'Este campo no puede estar vacío';

	const marketers: Option[] = localStorage.getItem('marketers')
		? convertMarketerToOption(JSON.parse(localStorage.getItem('marketers')!))
		: mockData;

	const toggleErrorMsg = (element: HTMLElement, data: string | number) => {
		if (typeof data === 'string') {
			if (data === '') {
				element.classList.add('is-invalid');
				element.classList.remove('is-valid');
			} else {
				element.classList.remove('is-invalid');
				element.classList.add('is-valid');
			}
		} else if (typeof data === 'number') {
			if (isNaN(data)) {
				element.classList.add('is-invalid');
				element.classList.remove('is-valid');
			} else {
				element.classList.remove('is-invalid');
				element.classList.add('is-valid');
			}
		}
	};

	React.useEffect(() => {
		const marketer_id_element = document.getElementById('marketer_id')!;
		const client_id_element = document.getElementById('client_id')!;
		if (marketer_id === client_id) {
			const marketer_id_error = document.getElementById('marketer_id_error')!;
			const client_id_error = document.getElementById('client_id_error')!;

			marketer_id_element.classList.add('is-invalid');
			client_id_element.classList.add('is-invalid');

			marketer_id_error.innerHTML = 'No se puede seleccionar el mismo cliente como proveedor';
			client_id_error.innerHTML = 'No se puede seleccionar el mismo proveedor como cliente';
		} else {
			if (!isNaN(marketer_id)) toggleErrorMsg(marketer_id_element, marketer_id);
			if (!isNaN(client_id)) toggleErrorMsg(client_id_element, client_id);
		}
	}, [marketer_id, client_id]);

	React.useEffect(() => {
		const type_element = document.getElementById('type')!;

		if (type !== '' && !type_element.classList.contains('is-valid')) toggleErrorMsg(type_element, type);
	}, [type]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number>>) => {
		toggleErrorMsg(event.target, parseInt(event.target.value));
		setState(parseInt(event.target.value));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (isNaN(marketer_id)) {
			toggleErrorMsg(document.getElementById('marketer_id')!, marketer_id);
			document.getElementById('marketer_id_error')!.innerHTML = emptyFieldErrorMsg;
		}

		if (isNaN(client_id)) {
			toggleErrorMsg(document.getElementById('client_id')!, client_id);
			document.getElementById('client_id_error')!.innerHTML = emptyFieldErrorMsg;
		}

		if (type === '') toggleErrorMsg(document.getElementById('type')!, type);
		if (isNaN(amount)) toggleErrorMsg(document.getElementById('amount')!, amount);
		if (isNaN(price)) toggleErrorMsg(document.getElementById('price')!, price);

		if (!isNaN(marketer_id) && !isNaN(client_id) && marketer_id !== client_id && type !== '' && !isNaN(amount) && !isNaN(price)) {
			try {
				const response = await fetch('http://localhost:8080/operations', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						marketer_id,
						client_id,
						type,
						amount,
						price,
					}),
				});

				if (response.ok) {
					window.location.href = '/';
				}
			} catch (error) {
				console.log(error);
				document.getElementById('error_message')!.innerHTML =
					'Ha ocurrido un error al crear la nueva operación. Por favor, inténtelo más tarde o póngase en conctacto con un administrador';
			}
		}
	};

	return (
		<div className="NewOperation">
			<h1 className="text-center my-3">Nueva operación</h1>
			<form className="row g-4 m-5 flex-column align-items-center needs-validation" noValidate onSubmit={(e) => handleSubmit(e)}>
				<div className="d-flex col-6 justify-content-between flex-wrap">
					<label htmlFor="provider">Nombre del proveedor</label>
					<select
						name="provider"
						id="marketer_id"
						className="form-select w-75 col-12"
						onChange={(e) => setMarketerId(parseInt(e.target.value))}
						required
						defaultValue={''}
					>
						<option disabled value="">
							Proveedor
						</option>
						{marketers.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="invalid-feedback text-end" id="marketer_id_error">
						{emptyFieldErrorMsg}
					</div>
				</div>

				<div className="d-flex col-6 justify-content-between flex-wrap">
					<label htmlFor="client">Nombre del cliente</label>
					<select
						name="client"
						id="client_id"
						className="form-select w-75 col-12"
						onChange={(e) => setClientId(parseInt(e.target.value))}
						required
						defaultValue={''}
					>
						<option disabled value="">
							Cliente
						</option>
						{marketers.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="invalid-feedback text-end" id="client_id_error">
						{emptyFieldErrorMsg}
					</div>
				</div>

				<div className="d-flex col-6 justify-content-between flex-wrap">
					<label htmlFor="type">Tipo de operación</label>

					<select name="type" id="type" className="form-select w-75 col-12" required onChange={(e) => setType(e.target.value)} value={type}>
						<option disabled value="">
							Tipo de operación
						</option>
						{operationOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="invalid-feedback text-end" id="type_error">
						{emptyFieldErrorMsg}
					</div>
				</div>

				<div className="d-flex col-6 justify-content-between gap-5">
					<div className="input-group h-50">
						<input
							type="text"
							className="form-control"
							id="amount"
							placeholder="Cantidad de gas"
							onChange={(e) => handleInputChange(e, setAmount)}
							value={isNaN(amount) ? '' : amount}
							required
						/>
						<span className="input-group-text">L</span>
						<div className="invalid-feedback" id="amount_error">
							{emptyFieldErrorMsg}
						</div>
					</div>

					<div className="input-group h-50">
						<input
							type="text"
							className="form-control"
							placeholder="Precio total"
							id="price"
							onChange={(e) => handleInputChange(e, setPrice)}
							value={isNaN(price) ? '' : price}
							required
						/>
						<span className="input-group-text">€</span>
						<div className="invalid-feedback" id="price_error">
							{emptyFieldErrorMsg}
						</div>
					</div>
				</div>

				<input type="submit" className="btn btn-primary col-6" value="Crear operación" />
				<span id="error_message" className="p-0 text-danger text-center col-6"></span>
			</form>
		</div>
	);
}
