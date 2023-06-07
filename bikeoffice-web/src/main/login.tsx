import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Avatar, Button, Card, CardActions, CircularProgress } from "@mui/material";
import { Form, required, TextInput, useTranslate, useLogin, useNotify } from "react-admin";
import Box from "@mui/material/Box";

const Login = () => {
	useEffect(() => {
		document.body.style.margin = "0";
		return () => {
			document.body.style.margin = "";
		};
	}, []);

	const [loading, setLoading] = useState(false);
	const translate = useTranslate();

	const notify = useNotify();
	const login = useLogin();
	const location = useLocation();

	const handleSubmit = (auth: FormValues) => {
		setLoading(true);
		login(auth, location.state ? (location.state as any).nextPathname : "/").catch((error: Error) => {
			setLoading(false);
			notify(typeof error === "string" ? error : typeof error === "undefined" || !error.message ? "ra.auth.sign_in_error" : error.message, {
				type: "error",
				messageArgs: { _: typeof error === "string" ? error : error && error.message ? error.message : undefined },
			});
		});
	};

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
					alignItems: "center",
					justifyContent: "flex-start",
					background: "url(https://source.unsplash.com/random/?bike)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}>
				<Card sx={{ minWidth: 300, marginTop: "6em" }}>
					<Box
						sx={{
							margin: "1em",
							display: "flex",
							justifyContent: "center",
						}}>
						<Avatar sx={{ bgcolor: "white", width: "150px", height: "150px" }}>
							<img src="/api/assets/logo.png" alt="logo" style={{ width: "100%" }} />
						</Avatar>
					</Box>
					<Box
						sx={{
							marginTop: "1em",
							display: "flex",
							justifyContent: "center",
							color: theme => theme.palette.grey[500],
						}}></Box>
					<Box sx={{ padding: "0 1em 1em 1em" }}>
						<Box sx={{ marginTop: "1em" }}>
							<TextInput autoFocus source="username" label={translate("ra.auth.username")} disabled={loading} validate={required()} fullWidth />
						</Box>
						<Box sx={{ marginTop: "1em" }}>
							<TextInput source="password" label={translate("ra.auth.password")} type="password" disabled={loading} validate={required()} fullWidth />
						</Box>
					</Box>
					<CardActions sx={{ padding: "0 1em 1em 1em" }}>
						<Button
							variant="contained"
							type="submit"
							disabled={loading}
							fullWidth
							sx={{ color: "var(--text-hover-color)", backgroundColor: "var(--primary-color)", ":hover": { backgroundColor: "var(--tertiary-color)" } }}>
							{loading && <CircularProgress size={25} thickness={2} />}
							{translate("ra.auth.sign_in")}
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Form>
	);
};

Login.propTypes = {
	authProvider: PropTypes.func,
	previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
	username?: string;
	password?: string;
}
