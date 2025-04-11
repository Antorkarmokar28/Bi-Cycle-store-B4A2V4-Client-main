import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineHighQuality } from "react-icons/md";
const Service = () => {
  return (
    <>
      <div className="container mx-auto bg-white font-inter mt-20 px-4 md:px-8">
        <h3 className="border-l-4 border-primary px-4 text-3xl font-bold mb-6">
          <span className="text-primary">Our</span> Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* fast shipping */}
          <div className="bg-white flex items-center gap-1 rounded-lg shadow-xl border-2 border-primary">
            <div className="pt-9 pb-9 px-2 rounded-l-lg">
              <LiaShippingFastSolid className="text-5xl text-primary top-6" />
            </div>
            <div className="p-2">
              <h4 className="text-lg">Fast & Reliable Delivery</h4>
              <p className="text-xs text-secondary mt-2">
                Get your bike delivered to your doorstep quickly and safely, so
                you can start your adventure without delay!
              </p>
            </div>
          </div>
          {/* secure payment */}
          <div className="bg-white flex items-center gap-1 rounded-lg  shadow-xl border-2 border-primary">
            <div className="pt-9 pb-9 px-2 rounded-l-lg">
              <RiSecurePaymentLine className="text-5xl text-primary top-6" />
            </div>
            <div className="p-2">
              <h4 className="text-lg">Secure Payment</h4>
              <p className="text-xs text-secondary mt-2">
                Shop with confidence using our safe and encrypted payment
                options for a worry-free checkout experience.
              </p>
            </div>
          </div>
          {/* 24/7 support */}
          <div className="bg-white flex items-center gap-1 rounded-lg shadow-xl border-2 border-primary">
            <div className="pt-9 pb-9 px-2 rounded-l-lg">
              <MdSupportAgent className="text-5xl text-primary top-6" />
            </div>
            <div className="p-2">
              <h4 className="text-lg">24/7 Customer Support</h4>
              <p className="text-xs text-secondary mt-2">
                We're always here to help! Get quick assistance anytime, day or
                night.
              </p>
            </div>
          </div>
          {/* quality guarantee */}
          <div className="bg-white flex items-center gap-1 rounded-lg shadow-xl border-2 border-primary">
            <div className="pt-9 pb-9 px-2 rounded-l-lg">
              <MdOutlineHighQuality className="text-5xl text-primary top-6" />
            </div>
            <div className="p-2">
              <h4 className="text-lg">Quality Guarantee</h4>
              <p className="text-xs text-secondary mt-2">
                Experience premium quality you can trust—built for performance,
                comfort, and long-lasting durability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
