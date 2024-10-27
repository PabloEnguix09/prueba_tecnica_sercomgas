import React from 'react';

interface Props {
	keys: string[];
}

export default function CustomThead(props: Props) {
	return (
		<thead className="table-dark">
			<tr className="text-center">
				{props.keys.map((key) => (
					<th key={key}>{key.toLocaleUpperCase().split('_').join(' ')}</th>
				))}
			</tr>
		</thead>
	);
}
