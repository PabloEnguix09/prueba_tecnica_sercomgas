import React from 'react';

interface Props<T extends object> {
	data: T[];
}

export default function CustomTbody<T extends object>(props: Props<T>) {
	return (
		<tbody>
			{props.data.map((element: object) => (
				<tr className="text-center" key={element !== undefined ? `operation_${Object.values(element)[0]}` : ''}>
					{Object.entries(element).map((value) => (
						<td key={value[0]}>
							{value[0] === 'fecha'
								? new Date(value[1]).toLocaleDateString('es-ES', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
								  })
								: value[1]}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}
