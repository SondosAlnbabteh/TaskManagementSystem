function Home(){

return(
    <div>
        <section
  key="2"
  className="py-24 flex items-center min-h-screen justify-center bg-white"
>
  <div className="mx-auto max-w-[43rem]">
    <div className="text-center">
      <p className="text-lg font-medium leading-8 text-indigo-600/95">
        Introducing Design Data Platform
      </p>
      <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
        Distribute your brand from design to code
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-400">
        Specify helps you unify your brand identity by collecting, storing and distributing design tokens and assets — automatically.
      </p>
    </div>
    <div className="mt-6 flex items-center justify-center gap-4">
      <a
        className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        href="#"
      >
        Get started for free
      </a>
      <a
        className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
        href="#"
      >
        {' '}Request a demo{' '}
      </a>
    </div>
  </div>
</section>
    </div>
);
}
export default Home;