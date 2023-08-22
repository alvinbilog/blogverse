function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5 mb-10">
      <div>
        <h1 className="text-7xl">Daily Blog</h1>
        <h2 className="mt-5 md:mt-8">Welcome to</h2>
        <span className="underline decorate-4 decoration-[#F7AB0A]">
          favourite blog in the Universe
        </span>
      </div>
      <p className="mt-5 md:t-2  text-gray-400 max-w-sm text-right">
        Where words come to life! Dive into a universe of captivating articles,
        engaging stories, and vibrant discussions.
      </p>
    </div>
  );
}

export default Banner;
