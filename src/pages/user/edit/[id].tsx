import ErrorRenderingPage from "@/components/error/ErrorRenderingPage";
import { IsLoading } from "@/components/loader/IsLoading";
import { findByIdUser } from "@/lib/api/user/findById";
import { updateUser } from "@/lib/api/user/update";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// interface UserProfileInterface {

// }

export default function UserProfile() {
  const fileInputRef = useRef(null);
  const { query, isReady } = useRouter();
  const id = query.id;

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => findByIdUser({ id: id as string }),
    enabled: isReady && !!id,
  });

  useEffect(() => {
    if (dataUser) {
      setName(dataUser.data.name);
      setEmail(dataUser.data.email);
    }
  }, [dataUser]);

  if (isLoadingUser) return <IsLoading />;

  if (isErrorUser)
    return <ErrorRenderingPage errorMessage={errorUser.message} />;

  const handleInputImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };
  if (!isReady || !id) return <IsLoading />;

  return (
    <>
      <div className="px-6.5 py-4 rounded-sm border shadow-10 border-stroke bg-white dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row mb-10">
          <div className="flex flex-col items-center lg:w-1/4 mb-6 lg:mb-0">
            <div className="rounded-full p-3">
              <Image
                src={"/images/icon/sad.png"}
                width={100}
                height={100}
                alt="User Image"
              />
              <div className="pt-5">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleInputImage()}
                >
                  {dataUser?.data?.image ? "Edit" : "Add"} Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }} // Sembunyikan input file
                  onChange={handleFileChange}
                  accept="image/*" // Hanya menerima file gambar
                />
              </div>
            </div>
          </div>
          <div className="grid gap-6 w-full lg:pl-8">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan Nama Pengguna"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
