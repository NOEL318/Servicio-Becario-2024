import { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUserRole, updateUserAuthorization } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

export const Admin = () => {
	const [users, setusers] = useState();
	const { isSucces, user, isLoading } = useSelector((state) => state.Auth);
	useEffect(() => {
		const getData = async () => {
			var data = await getUsers({ id: user._id });
			setusers(data);
		};
		if (user && isSucces) getData();
	}, []);

	const Delete = async (id) => {
		var { data } = await deleteUser({ id });
		if (data.deletedCount == 1) {
			window.alert("OK");
		}
	};

	if (users)
		return (
			<>
				<div className="admin">
					<h1>Panel de Administrador</h1>
					<ul>
						{users.map((usr) => {
							const changeRole = async (newrole) => {
								updateUserRole({ id: usr._id, newrole });
							};
							const changeAuthorization = async (authorized) => {
								var authorization = authorized == "true" ? true : false;
								updateUserAuthorization({ id: usr._id, authorization });
							};
							if (usr._id != user._id)
								return (
									<li key={usr._id}>
										<h4>{usr.username}</h4>
										<div className="side">
											<p>Permisos:</p>

											<select
												name="role"
												id=""
												defaultValue={usr.role}
												onChange={(e) => changeRole(e.target.value)}
											>
												<option value="read">Lectura</option>
												<option value="read-write">Lectura y Escritura</option>
												<option value="admin">Administrador</option>
											</select>
											<button
												onClick={() => Delete(usr._id)}
												className="delete_button"
											>
												<FaTrash size={20} />
											</button>
										</div>
										<div className="side">
											<p>Autorizado:</p>
											<select
												name="authorization"
												id=""
												defaultValue={usr.authorized}
												onChange={(e) => changeAuthorization(e.target.value)}
											>
												<option value="true">Si</option>
												<option value="false">No</option>
											</select>
										</div>
									</li>
								);
						})}
					</ul>
				</div>
			</>
		);
};
