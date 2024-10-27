import React from 'react';
import '../css/NewOperation.css';

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
	const [errorMsg, setErrorMsg] = React.useState('');

	React.useEffect(() => {
		const marketer_id_element = document.getElementById('marketer_id')!;
		const client_id_element = document.getElementById('client_id')!;
		if (marketer_id === client_id) {
			const marketer_id_error = document.getElementById('marketer_id_error')!;
			const client_id_error = document.getElementById('client_id_error')!;

			marketer_id_element.classList.remove('is-valid');
			client_id_element.classList.remove('is-valid');

			marketer_id_element.classList.add('is-invalid');
			client_id_element.classList.add('is-invalid');

			marketer_id_error.innerHTML = 'No se puede seleccionar el mismo cliente como proveedor';
			client_id_error.innerHTML = 'No se puede seleccionar el mismo proveedor como cliente';
		} else {
			if (marketer_id_element.classList.contains('is-invalid')) {
				marketer_id_element.classList.remove('is-invalid');
				client_id_element.classList.remove('is-invalid');
			}
			if (!isNaN(marketer_id)) {
				marketer_id_element.classList.add('is-valid');
			}
			if (!isNaN(client_id)) {
				client_id_element.classList.add('is-valid');
			}

			setErrorMsg('');
		}
	}, [marketer_id, client_id]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number>>) => {
		setErrorMsg('');

		if (event.target instanceof HTMLInputElement && (parseInt(event.target.value) < 0 || isNaN(parseInt(event.target.value)))) {
			setErrorMsg(`El valor de "${event.target.placeholder}" no puede estar vacío`);
		}

		setState(parseInt(event.target.value));
	};

	return (
		<div className="NewOperation">
			<h1 className="text-center my-3">Nueva operación</h1>
			<form method="POST" className="row g-4 m-5 flex-column align-items-center needs-validation" noValidate action="submit">
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
						{mockData.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="invalid-feedback text-end" id="marketer_id_error">
						El campo no puede estar vacío
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
						{mockData.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="invalid-feedback text-end" id="client_id_error">
						El campo no puede estar vacío
					</div>
				</div>

				<div className="d-flex col-6 justify-content-between">
					<label htmlFor="type">Tipo de operación</label>

					<select name="type" id="type" className="form-select w-75" required onChange={(e) => setType(e.target.value)} value={type}>
						<option disabled value="">
							Tipo de operación
						</option>
						{operationOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="invalid-feedback text-end" id="type_id_error">
						El campo no puede estar vacío
					</div>
				</div>

				<div className="d-flex col-6 justify-content-between gap-5">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Cantidad de gas"
							onChange={(e) => handleInputChange(e, setAmount)}
							value={isNaN(amount) ? '' : amount}
							required
						/>
						<span className="input-group-text">L</span>
					</div>

					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Precio total"
							onChange={(e) => handleInputChange(e, setPrice)}
							value={isNaN(price) ? '' : price}
							required
						/>
						<span className="input-group-text">€</span>
					</div>
				</div>

				<button type="submit" className="btn btn-primary col-6" onClick={(e) => e?.preventDefault()}>
					Crear operación
				</button>
				<span id="error-message" className="p-0 text-danger text-center col-6">
					{errorMsg}
				</span>
			</form>
		</div>
	);
}
