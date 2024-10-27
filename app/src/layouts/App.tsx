import React from 'react';
import '../css/App.css';
import CustomTable from '../components/customTable';
import { OperationTable } from '../types/types';

const mockData: OperationTable[] = [
	{
		id: 1,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-01',
	},
	{
		id: 2,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-01',
	},
];

function App() {
	return (
		<div className="App container">
			<h1 className="text-center my-3">Operaciones</h1>
			<CustomTable key={'OperationTable'} data={mockData} />
		</div>
	);
}

export default App;
