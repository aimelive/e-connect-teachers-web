import LogoImage from "../../assets/imageLogo.png";

export default function Logo() {
  return (
    <div>
      <img
        src={LogoImage}
        alt=""
        width={120}
        height={100}
        className="mx-auto"
      />
    </div>
  );
}
