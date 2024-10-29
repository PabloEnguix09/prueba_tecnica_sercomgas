import React from 'react';

interface Props {
	keys: string[];
}

function formatKey(key: string): string {
	return key.toLocaleUpperCase().split('_').join(' ');
}

export default function CustomThead(props: Props) {
	return (
		<thead className="table-dark">
			<tr className="text-center">
				{props.keys.map((key) => (
					<th key={key}>{formatKey(key)}</th>
				))}
			</tr>
		</thead>
	);
}
