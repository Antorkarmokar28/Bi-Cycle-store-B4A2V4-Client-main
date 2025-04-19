const AboutUs = () => {
  return (
    <div
      className="w-full h-[500px] bg-no-repeat bg-cover bg-center relative z-0 font-inter bg-[url('assets/images/Bicycle-Banner.png')]"
    >
      <div className="container mx-auto absolute top-40 left-40">
        <h3 className="text-white text-3xl font-black text-center mb-6">
          About Us | Rideology
        </h3>
        <p className="text-sm leading-6 text-white text-center">
          Welcome to Rideology — where passion meets pedals! At Rideology, we
          believe cycling is more than just a mode of transport — it’s a
          lifestyle, a journey, and a statement of freedom. Whether you're a
          seasoned cyclist, a weekend adventurer, or someone just discovering
          the joy of riding, we’re here to fuel your journey with the best
          bicycles, accessories, and riding essentials.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
