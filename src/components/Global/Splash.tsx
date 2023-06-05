import logo from "../../assets/imageLogo.png";

const Splash = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <img
        src={logo}
        alt="splash logo"
        width={200}
        height={200}
        className="animate-bounce"
      />
    </div>
  );
};

export default Splash;
