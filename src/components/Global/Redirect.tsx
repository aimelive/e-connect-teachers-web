import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ to }: { to: string }) => {
  const nav = useNavigate();
  useEffect(() => nav(to || "/"), [nav]);
  return <></>;
};

export default Redirect;
