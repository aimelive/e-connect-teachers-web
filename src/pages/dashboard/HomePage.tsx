import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1 className="font-bold text-lg text-brand mb-4">Dashboard</h1>
      <div className="grid grid-cols-5 gap-4">
        {new Array(5)
          .fill({ count: 45, text: "Teachers" })
          .map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow flex items-center justify-center flex-col space-y-4 p-8 rounded-lg"
              >
                <img src="/icons/home/teachers.svg" alt="#" />
                <span className="text-xl font-bold">{item.count}</span>
                <span>{item.text}</span>
              </div>
            );
          })}
      </div>
      <h1 className="font-bold text-lg text-brand my-4">Today's classes</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="my-2">Morning</p>
          <div>
            {new Array(5).fill(0).map((_, index) => {
              return (
                <div
                  className="bg-white p-2 px-3 rounded flex items-center space-x-3 mb-3"
                  key={index}
                >
                  <div className="bg-primary p-2 rounded shadow-xl">
                    <img src="/icons/home/teachers.svg" alt="#" />
                  </div>
                  <div className="flex-grow">
                    <p>Mathematics</p>
                    <p>Doan Leap Classes</p>
                    <p>Tr. Peter and Ass. Aime Irad</p>
                  </div>
                  <p className="bg-brand bg-opacity-30 p-2 py-1 rounded text-xs text-white">
                    12:00 - 30:00
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end text-brand hover:text-primary underline">
            <Link to="/dashboard/time-table" className="">
              Show All
            </Link>
          </div>
        </div>
        <div>
          <p className="my-2">Afternoon</p>
          <div>
            {new Array(5).fill(0).map((_, index) => {
              return (
                <div
                  className="bg-white p-2 px-3 rounded flex items-center space-x-3 mb-3"
                  key={index}
                >
                  <div className="bg-primary p-2 rounded shadow-xl">
                    <img src="/icons/home/teachers.svg" alt="#" />
                  </div>
                  <div className="flex-grow">
                    <p>Mathematics</p>
                    <p>Doan Leap Classes</p>
                    <p>Tr. Peter and Ass. Aime Irad</p>
                  </div>
                  <p className="bg-brand bg-opacity-30 p-2 py-1 rounded text-xs text-white">
                    12:00 - 30:00
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end text-brand hover:text-primary underline">
            <Link to="/dashboard/time-table" className="">
              Show All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
