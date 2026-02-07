import React from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords)
    console.log(passwords)
  }


  useEffect(() => {
    getPasswords()
  }, [])

  const showPassword = () => {
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/show.png"
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/hide.png"
      passwordRef.current.type = "text"
    }

  }

  const savePassword = async() => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      //after clicking on edit, the input fields will be filled by that entries and we can delete that id
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id:form.id}) })

      //after deleting the old id, assigning a new id using uuidv4 now to the new edited entries
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      setform({ site: "", username: "", password: "" })
      toast.success('Changes made successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.warning('Cannot be saved')
    }
  }

  const editPassword = (id) => {
    setform({...passwordArray.filter(item => item.id === id)[0],id:id})// because we know ids are unique and this function return an array, we are accessing 0th index value here
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }


  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      let res =await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id}) })
    }
    toast.success('Deletion Successful', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('Copied to the clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="text-black md:mycontainer md:mx-30 md:p-10">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-600 text-center text-lg'>Your Own Password Manager</p>

        <div className="flex flex-col py-4 gap-7 w-full">
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className=" border border-green-500 text-black rounded-full p-4 py-1" type="text" name="site" id="site" />

          <div className="flex w-full gap-6">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="border border-green-500 text-black rounded-full p-4 py-1 w-3/4" type="text" name="username" id="username" />

            <div className="relative w-1/2">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="border border-green-500 text-black text-sm md:text-base rounded-full p-4 py-1 w-full" type="password" name="password" id="password" />
              <span className='absolute right-3 top-1.25 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={25} src="icons/show.png" alt="" />
              </span>
            </div>

          </div>

          <button onClick={savePassword} className='text-black font-semibold  flex justify-center items-center m-auto gap-2 bg-green-500 hover:bg-green-400 px-4 py-2 rounded-full w-fit border-2 border-green-900'><lord-icon
            src="https://cdn.lordicon.com/zvjfabig.json"
            trigger="hover"
            stroke="bold">
          </lord-icon>Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-3'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-2xl overflow-hidden mb-10">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-green-300 text-center w-32'>
                    <div className='flex items-center justify-center gap-2'>
                      <a href={item.site} target="_blank">{item.site}</a>
                      <img onClick={() => copyText(item.site)} width={20} height={20} className='icon-copy cursor-pointer' src="icons/copy.svg" alt="" />
                    </div>
                  </td>

                  <td className='py-2 border border-green-300 text-center w-32'>
                    <div className='flex items-center justify-center gap-2'>
                      <a href={item.site} target="_blank">{item.username}</a>
                      <img onClick={() => copyText(item.username)} width={20} height={20} className='icon-copy cursor-pointer' src="icons/copy.svg" alt="" />
                    </div>
                  </td>

                  <td className='py-2 border border-green-300 text-center w-32'>
                    <div className='flex items-center justify-center gap-2'>
                      <a href={item.site} target="_blank">{"*".repeat(item.password.length)}</a>
                      <img onClick={() => copyText(item.password)} width={20} height={20} className='icon-copy cursor-pointer' src="icons/copy.svg" alt="" />
                    </div>
                  </td>

                  <td className='py-2 border border-green-300 text-center w-32'>
                    <span className='cursor-pointer' onClick={() => editPassword(item.id)}>
                      <lord-icon className='w-4.25 md:w-6.25 mx-2'
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#000000,secondary:#08a88a">
                      </lord-icon>
                    </span>

                    <span className='cursor-pointer' onClick={() => deletePassword(item.id)}>
                      <lord-icon className='w-4.25 md:w-6.25 mx-2'
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#000000,secondary:#08a88a">
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
