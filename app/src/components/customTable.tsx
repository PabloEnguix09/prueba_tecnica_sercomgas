import React from 'react';
import CustomTbody from './customTbody';
import CustomTfoot from './customTfoot';
import CustomThead from './customThead';
import { OperationTable } from '../types/types';

interface Props {
	data: OperationTable[];
}

export default function CustomTable(props: Props) {
	const keys = Object.keys(props.data[0]);
	return (
		<table className="table table-responsive table-striped table-hover table-bordered">
			<CustomThead keys={keys} />
			<CustomTbody data={props.data} />
			<CustomTfoot />
		</table>
	);
}
