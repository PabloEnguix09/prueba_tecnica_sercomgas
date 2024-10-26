import React from 'react';

interface Props {
	keys: string[];
}

export default function CustomThead(props: Props) {
	return (
		<thead className="table-dark">
			<tr>
				{props.keys.map((key) => (
					<th key={key}>{key.toLocaleUpperCase()}</th>
				))}
			</tr>
		</thead>
	);
}
