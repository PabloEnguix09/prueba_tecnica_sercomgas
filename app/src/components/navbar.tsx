import React from 'react';

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-dark container-fluid px-3 sticky-top">
			<a href="/" className="navbar-brand">
				<img src="./logo.png" alt="Sercomgas logo" height={50} />
			</a>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active text-white" aria-current="page" href="/">
							Inicio
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active text-white" aria-current="page" href="/new_operation">
							Nueva operación
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
