const Navbar = () => {
  const handleGithubClick = () => {
    window.open('https://github.com/harmansingh79', '_blank');
  };
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer  flex justify-between px-4 py-5 items-center h-14 mycontainer">
        <div className="cursor-pointer logo font-bold text-2xl">
          <span className='text-green-500'> &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
          </li>
        </ul> */}

        <button onClick={handleGithubClick} className="flex gap-1 cursor-pointer border items-center border-slate-900 rounded-full px-2 py-1 justify-center hover:bg-slate-700 ring-white ring-1">
            {/* <lord-icon className='w-[30px] h-[35px]'
              src="https://cdn.lordicon.com/acgiczyg.json"
              trigger="hover"
              stroke="bold">
            </lord-icon> */}
          <img className='invert' height={30} width={30} src="icons/github.svg" alt="github logo" />
          <span className="font-bold">Github
          </span>
        </button>
      </div>
    </nav>

  )
}

export default Navbar
