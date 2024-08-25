import { CONFIG_APPTITLE } from "@/config";
import Head from "next/head";

export default function Page() {
  const historyBackPage = () => {
    history.back();
  };

  return (
    <>
    <Head>
        <title>{CONFIG_APPTITLE + "No Access"}</title>
    </Head>
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen">
        <div className="w-full lg:w-3/4 lg:mr-4 rounded-sm border p-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-1/2 flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-black text-title-xl mb-4">
              Maaf Anda Tidak Memiliki Akses!
            </h1>
            <button
              className="text-white bg-graydark hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={historyBackPage}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
