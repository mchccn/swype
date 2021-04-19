import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/style.css";
import "../styles/tailwind.css";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                {process.env.NODE_ENV === "development" ? (
                    <link rel="stylesheet" href="https://unpkg.com/tailwindcss@%5E2/dist/tailwind.min.css" />
                ) : (
                    <link rel="stylesheet" href="/tailwind.css" />
                )}
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
