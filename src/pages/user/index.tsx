import ErrorRenderingPage from "@/components/error/ErrorRenderingPage";
import { IsLoading } from "@/components/loader/IsLoading";
import { findAllUser } from "@/lib/api/user/findAll";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface UserDataInterface {
  id: string;
  name: string;
  email: string;
  is_deleted: string;
}

export default function User() {
  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: findAllUser,
  });

  if (isLoadingUser) return <IsLoading />;

  if (isErrorUser)
    return <ErrorRenderingPage errorMessage={errorUser.message} />;

  return (
    <>
      {/* <Toaster position="bottom-right" /> */}
      <div className="px-6.5 py-4 rounded-sm border shadow-10 border-stroke bg-white dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row mb-10">
          <div className="w-full">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-3 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser.data.map(
                    (item: UserDataInterface, index: number) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={index + 1}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.is_deleted}</td>
                        <td className="px-6 py-4">
                            <Link href={`/user/edit/${item.id}`}>Edit</Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
