import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider activeChain={activeChain}>
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;
