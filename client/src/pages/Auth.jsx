import { useState } from "react";
import { useDispatch } from "react-redux";
import { SignIn, SignUp } from "../hooks/userSlice";

export const Auth = () => {
	const [username, setusername] = useState();
	const [password, setpassword] = useState();
	const [id, setid] = useState();
	const dispatch = useDispatch();

	const [signpassword, setsignpassword] = useState();
	const [signid, setsignid] = useState();

	const createAccount = async () => {
		dispatch(SignUp({ username, id, password }));
	};
	const signToAccount = async () => {
		dispatch(SignIn({ id: signid, password: signpassword }));
	};
	return (
		<>
			<div className="sign">
				<h1>Crear cuenta</h1>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						type="text"
						placeholder="Nombre"
						onChange={(e) => setusername(e.target.value)}
					/>
					<input
						type="text"
						placeholder="ID"
						onChange={(e) => setid(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Contraseña"
						onChange={(e) => setpassword(e.target.value)}
					/>
					{username && password && id && (
						<button
							type="submit"
							className="button"
							onClick={createAccount}
						>
							Crear Cuenta
						</button>
					)}
				</form>
				<h1>Iniciar Sesión</h1>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						type="text"
						placeholder="ID"
						onChange={(e) => setsignid(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Contraseña"
						onChange={(e) => setsignpassword(e.target.value)}
					/>
					{signid && signpassword && (
						<button
							type="submit"
							className="button"
							onClick={signToAccount}
						>
							Iniciar Sesión
						</button>
					)}
				</form>
			</div>
		</>
	);
};
