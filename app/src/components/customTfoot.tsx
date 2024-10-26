import React from 'react';

function goToCreateOperation() {
	window.location.href = '/new_operation';
}

export default function CustomTfoot() {
	return (
		<tfoot>
			<tr>
				<td colSpan={100}>
					<button
						className="btn btn-primary"
						onClick={goToCreateOperation}
					>
						Crear operación
					</button>
				</td>
			</tr>
		</tfoot>
	);
}
