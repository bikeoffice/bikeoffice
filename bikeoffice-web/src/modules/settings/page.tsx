export const SettingsPage = () => {
	return (
		<section aria-label="Settings">
			<h1>Información de la Empresa</h1>
			<article>
				<input type="file" accept="image/*" />
				<img src="https://via.placeholder.com/150" alt="Logo" />
				<div>
					<div>
						<label htmlFor="name">Nombre</label>
						<br />
						<input type="text" id="name" />
					</div>
					<div>
						<label htmlFor="cif">CIF</label>
						<br />
						<input type="text" id="cif" />
					</div>
					<div>
						<label htmlFor="tel">Teléfono</label>
						<br />
						<input type="text" id="tel" />
					</div>
				</div>
				<div>
					<div>
						<label htmlFor="email">Email</label>
						<br />
						<input type="email" id="email" />
					</div>
					<form>
						<label htmlFor="password">Nueva Contraseña</label>
						<br />
						<input type="password" id="password" />
						<br />
						<br />
						<label htmlFor="password">Repetir Contraseña</label>
						<br />
						<input type="password" id="password" />
						<br />
						<button type="submit">Cambiar Contraseña</button>
					</form>
				</div>
			</article>
			<div className="separator"></div>
			<article>
				<h2>Dirección</h2>
				<div>
					<div>
						<label htmlFor="address">Dirección</label>
						<br />
						<input type="text" id="address" />
					</div>
					<div>
						<label htmlFor="city">Localidad</label>
						<br />
						<input type="text" id="city" />
					</div>
					<div>
						<label htmlFor="web">Web</label>
						<br />
						<input type="text" id="web" />
					</div>
				</div>
			</article>
			<div className="separator"></div>
			<article>
				<h2>Colores</h2>
				<div>
					<div>
						<div></div>
						<input type="text" id="primary" />
						<br />
						<label htmlFor="primary">Color Primario</label>
					</div>
					<div>
						<div></div>
						<input type="text" id="secondary-color" />
						<br />
						<label htmlFor="secondary-color">Color Secundario</label>
					</div>
					<div>
						<div></div>
						<input type="text" id="terciary-color" />
						<br />
						<label htmlFor="terciary-color">Color Terciario</label>
					</div>
					<div>
						<div></div>
						<input type="text" id="alert-color" />
						<br />
						<label htmlFor="alert-color">Color Alert</label>
					</div>
					<div>
						<div></div>
						<input type="text" id="text-hover-color" />
						<br />
						<label htmlFor="text-hover-color">Color Texto Resaltado</label>
					</div>
					<div>
						<div></div>
						<input type="text" id="text-color" />
						<br />
						<label htmlFor="text-color">Color Texto</label>
					</div>
				</div>
			</article>
		</section>
	);
};
