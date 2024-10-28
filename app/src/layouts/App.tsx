import React, { useEffect } from 'react';
import CustomTable from '../components/customTable';
import { Marketer, OperationTable } from '../types/types';
import { useLocalStorage } from '../services/useLocalStorage';
import { list } from '../services/routes';
import { convertOperationData } from '../services/utils';

const mockMarketers: Marketer[] = [
	{
		id: 1,
		name: 'Coca Cola',
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 2,
		name: 'Pepsi',
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 3,
		name: 'Fanta',
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const mockOperations: OperationTable[] = [
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
	{
		id: 3,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-02',
	},
	{
		id: 4,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-03',
	},
	{
		id: 5,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-04',
	},
	{
		id: 6,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-05',
	},
	{
		id: 7,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-06',
	},
	{
		id: 8,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-07',
	},
	{
		id: 9,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-08',
	},
	{
		id: 10,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-09',
	},
	{
		id: 11,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-10',
	},
	{
		id: 12,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-11',
	},
	{
		id: 13,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-12',
	},
	{
		id: 14,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-13',
	},
	{
		id: 15,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-14',
	},
	{
		id: 16,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-15',
	},
	{
		id: 17,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-16',
	},
	{
		id: 18,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-17',
	},
	{
		id: 19,
		proveedor: 'Coca Cola',
		cliente: 'Coca Cola',
		litros_de_gas: 100,
		precio_total: 100,
		operacion: 'Compra',
		fecha: '2022-01-17',
	},
];

function App() {
	const [marketers, setMarketers] = useLocalStorage<Marketer[]>('marketers', mockMarketers);
	const [operations, setOperations] = useLocalStorage<OperationTable[]>('operations', mockOperations);

	const initialSetup = async () => {
		const serverOperations = await list('operations');
		const serverMarketers = await list('marketers');
		setMarketers(serverMarketers);

		const tableOperations = convertOperationData(serverOperations, marketers);

		setOperations(tableOperations);
	};

	useEffect(() => {
		initialSetup();
	}, []);

	return (
		<div className="App container">
			<h1 className="text-center my-3">Operaciones</h1>
			<CustomTable key={'OperationTable'} data={operations} />
		</div>
	);
}

export default App;
