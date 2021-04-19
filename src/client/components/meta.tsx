import Head from "next/head";

export default function Meta({ title }: { title?: string }) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="#009eff" />
            <meta name="robots" content="follow" />
            <meta name="theme-color" content="#000000" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="" />
            <meta property="og:site_name" content="" />
            <meta property="og:keywords" content="" />
            <meta property="og:locale" content="en-US" />
            <meta property="og:title" content="" />
            <meta property="og:description" content="" />
            <meta property="og:image" content="" />
            <title>Swype{title ? ` | ${title}` : ""}</title>
            <link rel="shortcut icon" href="/fav.png" type="image/x-icon" />
        </Head>
    );
}
