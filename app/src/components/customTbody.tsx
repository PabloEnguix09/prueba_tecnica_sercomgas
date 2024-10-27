import React, { useEffect } from 'react';

interface Props<T extends object> {
	data: T[];
}

function generateList<T extends object>(data: T[], currentPage: number, limit: number): JSX.Element[] {
	const list: JSX.Element[] = [];
	const maxCells = currentPage * limit - data.length < 0 ? currentPage * limit : data.length;
	for (let i = (currentPage - 1) * limit; i < maxCells; i++) {
		const e = data[i];
		const newElement = (
			<tr className="text-center" key={e !== undefined ? `operation_${Object.values(e)[0]}` : ''}>
				{Object.entries(e).map((value) => (
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
		);
		list.push(newElement);
	}
	return list;
}

export default function CustomTbody<T extends object>(props: Props<T>) {
	const [currentPage, setCurrentPage] = React.useState(1);
	const limit = 10;
	const [isAtTheEnd, setIsAtTheEnd] = React.useState(false);

	useEffect(() => {
		setIsAtTheEnd(currentPage * limit >= props.data.length);
	}, [currentPage]);

	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>, currentPage: number, newPage: number) => {
		if (newPage <= 0 || (isAtTheEnd && newPage > currentPage)) {
			event.preventDefault();
		} else {
			setCurrentPage(newPage);
		}
	};

	return (
		<tbody>
			{generateList(props.data, currentPage, limit)}
			<tr>
				<td colSpan={100}>
					<ul className="pagination justify-content-center m-0">
						<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} id="previos">
							<button className="page-link" onClick={(e) => handlePageChange(e, currentPage, currentPage - 1)}>
								&laquo;
							</button>
						</li>
						<li className="page-item">
							<span className="page-link">Página {currentPage}</span>
						</li>
						<li className={`page-item ${isAtTheEnd ? 'disabled' : ''}`}>
							<button
								className={`page-link ${isAtTheEnd ? 'disabled' : ''}`}
								onClick={(e) => handlePageChange(e, currentPage, currentPage + 1)}
							>
								&raquo;
							</button>
						</li>
					</ul>
				</td>
			</tr>
		</tbody>
	);
}
