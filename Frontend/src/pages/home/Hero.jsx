import React from "react";

function Hero() {
  return (
    <>
      <section
        className={`relative bg-[url(https://images.unsplash.com/photo-1609252509027-3928a66302fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat`}
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-bold md:text-5xl">
              Bali
              <strong className="font-bold text-rose-700">Raja</strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
              Empowering farmers, forging connections, guarding against scams. Together, cultivating trust and prosperity in the fields of India.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
