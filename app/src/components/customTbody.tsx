import React from 'react';

interface Props<T extends object> {
	data: T[];
}

export default function CustomTbody<T extends object>(props: Props<T>) {
	return (
		<tbody>
			{props.data.map((element: object) => (
				<tr
					key={
						element !== undefined
							? `operation_${Object.values(element)[0]}`
							: ''
					}
				>
					{Object.entries(element).map((value) => (
						<td key={value[0]}>{value[1]}</td>
					))}
				</tr>
			))}
		</tbody>
	);
}
