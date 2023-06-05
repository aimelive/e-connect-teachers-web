import { Link } from "react-router-dom";
import image from "../assets/not-found.png";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <img src={image} alt="#" width={200} height={200} />
      <p>The page you're looking for not found!</p>
      <Link to="/" className="bg-primary text-white px-6 py-2 rounded">
        Go to Home
      </Link>
    </div>
  );
};

export default Page404;
