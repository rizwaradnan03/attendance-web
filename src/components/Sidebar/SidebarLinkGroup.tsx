import { ReactNode, useState } from "react";

interface SidebarLinkGroupInterface {
  children: (handleClick: () => void, open?: boolean) => ReactNode;
  activeCondition?: boolean;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupInterface) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
