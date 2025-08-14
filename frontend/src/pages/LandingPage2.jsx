import '../App.css';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center bg-gray-50">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mt-8 mb-6">
        Welcome to Your Global Connect Platform
      </h1>

      {/* Fullscreen Image */}
      <div className="w-full">
        <img
          alt="Global Connect Logo"
          src="https://global-connect.fr/wp-content/uploads/2022/03/logo-noir-bleu.png"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LandingPage;
