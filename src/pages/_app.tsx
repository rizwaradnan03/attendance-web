import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ExceptionLayoutRoutes } from "@/routes/exceptionLayoutRoutes";
import "@/styles/style.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const pathName = usePathname();
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      {ExceptionLayoutRoutes.includes(pathName) ? (
        <Component {...pageProps} />
      ) : (
        <SessionProvider session={session}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </SessionProvider>
      )}
      {/* </QueryClientProvider> */}
    </>
  );
}
