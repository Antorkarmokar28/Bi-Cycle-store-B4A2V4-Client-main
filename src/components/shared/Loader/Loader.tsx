const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* spinning wheel (bike-inspired) */}
        <div className="w-16 h-16 border-4 border-[#04821f] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#04821f] font-semibold text-lg">
          Loading your ride...
        </p>
      </div>
    </div>
  );
};

export default Loader;
