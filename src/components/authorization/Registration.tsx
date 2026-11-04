import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthBtn, Input } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { type SignUpValues, signUpSchema } from "@/schema/auth";

export const Registration = () => {
	const { register } = useAuth();
	const {
		register: registerField,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		mode: "onBlur",
	});

	return (
		<form
			action="signup"
			className="w-full space-y-6 text-(--ink-dim)"
			onSubmit={handleSubmit(register)}
		>
			<section className="flex w-full items-center gap-3">
				<div>
					<Input variant="name" {...registerField("name")} />
					{errors.name && (
						<p role="alert" className="mt-2 text-sm text-red-400">
							{errors.name.message}
						</p>
					)}
				</div>
				<div>
					<Input variant="lastname" {...registerField("lastname")} />
					{errors.lastname && (
						<p role="alert" className="mt-2 text-sm text-red-400">
							{errors.lastname.message}
						</p>
					)}
				</div>
			</section>

			<Input variant="email" {...registerField("email")} />
			{errors.email && (
				<p role="alert" className="mt-2 text-sm text-red-400">
					{errors.email.message}
				</p>
			)}
			<Input variant="password" {...registerField("password")} />
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

			<AuthBtn variant="registration">SignUp</AuthBtn>
		</form>
	);
};
