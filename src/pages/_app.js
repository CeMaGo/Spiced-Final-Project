import {SessionProvider} from 'next-auth/react';

import '@/styles/global.css';
// import {GlobalStyle} from '../styles';

export default function App({Component, pageProps}) {
	//   pageProps: { session, ...pageProps },
	// })
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />;
		</SessionProvider>
	);
}

// export default function App({Component, pageProps: {session, ...pageProps}}) {
// 	return (
// 		<>
// 			<GlobalStyle />
// 			<SessionProvider session={session}>
// 				<Component {...pageProps} />
// 			</SessionProvider>
// 		</>
// 	);
// }
