import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

  // const ref = useRef()
  // const passwordRef = useRef()
  const host = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [showPassword, setShowPassword] = useState(false);


  const getPasswords = async () => {
    try {
      // console.log("Fetching from server...");
      let req = await fetch(`${host}/`)

      if (!req.ok) {
        console.error("Server error:", req.status);
        return;
      }

      let passwords = await req.json()
      // console.log("Data received from DB:", passwords)
      setPasswordArray(passwords)
    } catch (error) {
      console.error("Could not connect to backend:", error);
    }
  }

  useEffect(() => {
    // console.log("useEffect triggered - Fetching data...");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPasswords()
  }, [])

  const togglePasswordVisibility = () => {
    // Just flip the boolean
    setShowPassword(!showPassword);
  }



  const savePassword = async () => {
    if (form.site.length > 5 && form.username.length > 3 && form.password.length > 5) {

      // if any such id exist delete it
      await fetch(`${host}/`, { 
        method: "DELETE", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ id: form.id }) 
      })

      const newPassword = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newPassword]);
      
      await fetch(`${host}/`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(newPassword) 
      })
      
      setForm({ site: "", username: "", password: "" });
      alert('Password Saved Successfully!')
    }


    } else {
      alert('Password not saved!\nUsername length should be greater than 3\nWebsite length should be greater than 5\nPassword length should be greater than 5')
    }
    // const newPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    //   setPasswordArray(newPasswords);
    //   localStorage.setItem("passwords", JSON.stringify(newPasswords));
    //   setForm({ site: "", username: "", password: "" });
  }

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password ?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      let res = await fetch(`${host}/`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      console.log(res);
    }
  }

  const editPassword = (id) => {
    setForm({...passwordArray.filter(i => i.id === id)[0], id: id})
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const copyText = (Text) => {
    navigator.clipboard.writeText(Text)
  }




  return (
    <>


      <div className="absolute inset-0 -z-10 min-[1px]:max-[345px]:h-220 min-[539px]:max-[541px]:h-190 min-[359px]:max-[361px]:h-200 min-[370px]:max-[376px]:h-180 min-[380px]:max-[391px]:h-212 h-full min-[1279px]:max-[1281px]:h-225 min-[1282px]:max-[10000px]:h-215 w-full bg-green-200 bg-size-[14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-180 w-full rounded-full bg-green-400 opacity-20 blur-[100px]">
        </div>
      </div>




      <div className="container mx-auto min-h-[88.2vh] md:min-h-[87vh] lg:min-h-screen max-w-4xl px-5 pt-5 md:pt-10">

        <h1 className='text-xl font-bold text-center'>Password-Manager</h1>
        <p className='text-green-800 text-lg text-center'>Your own Password Manager</p>

        <div className='text-black flex items-center flex-col p-5'>


          <input required value={form.site} onChange={handleChange} className='border-green-500 border-2 w-full md:w-full text-black px-4 py-1 rounded-full' placeholder='Enter Website URL' type="url" name='site' id='site' />


          <div className='md:flex not-md:flex-col w-full justify-between gap-7'>
            <input required value={form.username} onChange={handleChange} className='border-2 border-green-500 rounded-full w-full px-4 py-1 my-5' type="text" placeholder='Enter username' name='username' id='username' />


            {/* show hide password */}

            <div className='relative md:my-5'>

              <input required value={form.password} onChange={handleChange} className='border-2 border-green-500 rounded-full md:w-50 not-md:w-full px-4 py-1' type={showPassword ? "text" : "password"} placeholder='Enter password' name='password' id='password' />
              <span onClick={togglePasswordVisibility} className='absolute right-2 top-1 rounded-full hover:cursor-pointer'>
                {showPassword ? <img src='/eye-close.png' /> : <img src='/eye-open.png' />}
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center hover:cursor-pointer hover:border rounded-full px-5 py-2 mt-5 w-fit bg-green-500'>
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json" trigger="hover" stroke="bold" colors="primary:#00c951,secondary:#000000">
            </lord-icon>
            Save password</button>
        </div>


        {/* Table to show Passwords usernames and website  */}


        <div className="passwords text-center ">

          <h1 className='font-bold my-2'>Your passwords</h1>


          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <div className="overflow-x-auto overflow-y-auto no-scrollbar not-md:max-h-60 md:max-h-100 w-full border-2 border-green-800 rounded-lg">
              <table className="table-auto w-full overflow-y-visible">
                <thead className='bg-green-800 text-white'>
                  <tr>
                    <th className='py-2 border-white border-2'>Website</th>
                    <th className='py-2 border-white border-2'>Username</th>
                    <th className='py-2 border-white border-2'>Password</th>
                    <th className='py-2 border-white border-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-green-400'>
                  {passwordArray.map((item, index) => {
                    return <tr key={index}>
                      <td className=' text-center py-2 px-2 border-2 border-white'>
                        <div className='not-md:text-start md:flex items-center justify-center'>

                          <a href={item.site} target='_blank'>{item.site}</a>

                          <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                            <img className='md:px-2 px-0.5 w-7 md:w-10' src="/copy.png" alt="" />
                          </div>

                        </div>
                      </td>

                      <td className=' text-center py-2 px-2 border-2 border-white'>

                        <div className='md:flex not-md:text-start items-center justify-center'>

                          <span>{item.username}</span>

                          <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                            <img className='md:px-2 px-0.5 md:w-10 w-7' src="/copy.png" alt="" />
                          </div>

                        </div>
                        
                      </td>

                      <td className='text-center py-2 px-2 border-2 border-white'>

                        <div className='md:flex not-md:text-start items-center justify-center'>

                          <span>{"*".repeat(item.password.length)}</span>

                        </div>

                      </td>

                      <td className='text-center py-2 px-2 border-2 border-white'>

                        <div className='flex items-center justify-center'>

                          <img onClick={() => { editPassword(item.id) }} className='cursor-pointer' src="/edit.png" alt="" />
                          <img onClick={() => { deletePassword(item.id) }} className='cursor-pointer' src="/delete.png" alt="" />

                        </div>

                      </td>
                    </tr>
                  })}

                </tbody>
              </table>
            </div>}
        </div>
      </div>


    </>
  )
}

export default Manager


