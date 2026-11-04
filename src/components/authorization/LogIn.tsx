import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthBtn, Input } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { type SignInValues, signInSchema } from "@/schema/auth";

export const LogIn = () => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
		mode: "onBlur",
	});

	const onSubmit = (values: SignInValues) => {
		const error = login(values);
		if (error) setError("root", { message: error });
	};

	return (
		<form
			action="login"
			className="w-full space-y-6 text-(--ink-dim)"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input variant="email" {...register("email")} />
			{errors.email && (
				<p role="alert" className="mt-2 text-sm text-red-400">
					{errors.email.message}
				</p>
			)}
			<Input variant="password" {...register("password")} />
			{errors.password && (
				<p role="alert" className="mt-2 text-sm text-red-400">
					{errors.password.message}
				</p>
			)}
			{errors.root && (
				<p role="alert" className="text-sm text-red-400">
					{errors.root.message}
				</p>
			)}
			<AuthBtn variant="login">SignIn</AuthBtn>
		</form>
	);
};
