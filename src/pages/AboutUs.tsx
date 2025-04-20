const AboutUs = () => {
  return (
    <div className="bg-white">
      <div className="w-full h-[400px] bg-no-repeat bg-fixed bg-cover bg-center relative z-0 font-inter bg-[url('assets/images/about-us.jpg')]">
      <div className="bg-gradient-to-tr from-[#62c9b2] to-[#00000040] absolute left-0 w-full h-full"></div>
        <div className="container mx-auto flex flex-col justify-center relative top-16 md:top-30 p-4 z-10">
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
      <div className="container mx-auto bg-white mb-20 mt-20">
        <h3 className="text-3xl font-semibold mb-2 border-l-4 border-primary px-4"><span className="text-primary font-inter font-bold">Our </span>Story</h3>
        <p className="mb-6">
          Founded with a love for cycling and a mission to make quality bikes
          accessible to everyone, Rideology started as a small garage project.
          Today, we serve riders across the country, offering a wide selection
          of bicycles for every kind of journey — from smooth city rides to
          rugged mountain adventures.
        </p>
        <h3 className="text-3xl font-semibold mb-2 border-l-4 border-primary px-4">Why Ride with Us?</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>🚴‍♂️ Curated collection of top-quality bicycles</li>
          <li>💸 Affordable pricing with exclusive online deals</li>
          <li>🛠️ Expert advice and product guides</li>
          <li>📦 Fast, reliable delivery right to your doorstep</li>
          <li>🤝 A growing community of passionate riders</li>
        </ul>

        <h3 className="text-3xl font-semibold mb-2 border-l-4 border-primary px-4">Our Promise</h3>
        <p className="mb-6">
          At Rideology, your riding experience is our top priority. Whether
          you're a casual commuter, a weekend warrior, or a competitive cyclist,
          we’re here to support your journey with the best products and service.
        </p>

        <h3 className="text-3xl font-semibold mb-2 border-l-4 border-primary px-4">
          Join the Rideology Movement!
        </h3>
        <p>
          Follow us on social media, share your ride stories, and connect with
          fellow cycling enthusiasts. Let’s ride smarter, healthier, and happier
          — together.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
