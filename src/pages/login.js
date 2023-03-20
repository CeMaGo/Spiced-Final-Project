import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Layout from '../../styles/Layout.module.css';

function Login() {
	return (
		<Layout>
			<Head>
				<title>Login</title>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10 ">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
					<p className=" w-3/4 mx-auto text-gray-400">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
					</p>
				</div>
				{/* form */}
				<form className="flex flex-col gap-5">
					<div className="input-group">
						<input type="email" name="email" placeholder="Email" />
					</div>
					<div className="input-group">
						<input type="password" name="password" placeholder="Password" />
					</div>
					{/* login buttons */}
					<div className="input-button">
						<button type="submit">Login</button>
						<div className="input-button">
							<button type="submit">Sign In with Google</button>
						</div>
						<div className="input-button">
							<button type="submit">Sign in with github</button>
						</div>
					</div>
				</form>
				{/* bottom */}
				<p className="text-gray-400 text-center ">
					No account yet?{' '}
					<Link href={'/register'} className="text-blue-700">
						Sign Up
					</Link>
				</p>
			</section>
		</Layout>
	);
}

export default Login;
