import Sidebar from "@/components/Sidebar/SideBar";
import { MainLayoutsProps } from "@/lib/interface/layouts/mainLayoutInterface";

export default function MainLayouts({ children }: MainLayoutsProps) {
  return (
    <>
      <section className="main flex">
        <div className="sidebarWrapper w-[15%]">
          <Sidebar />
        </div>

        <div className="content_Right w-[85%] px-3 bg-black">{children}</div>
      </section>
    </>
  );
}
