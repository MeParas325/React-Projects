import Navbar from "./components/Navbar"
import Model from "./components/Modal"
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "./config/fireabase"
import { HiOutlineClipboardList, HiOutlineUserCircle } from "react-icons/hi"
import {RiEditCircleLine} from "react-icons/ri"
import {IoMdTrash} from "react-icons/io"
import AddAndUpdateContact from "./components/AddAndUpdateContact"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./images/contact.png"

function App() {

  const [contacts, setcontacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setContactId] = useState("");

  const deleteContact = async (id) => {

    try {
      await deleteDoc(doc(db, "contacts", id))
      toast.success("Data deleted successfully.")
    } catch (error) {
      console.log(error)
    }
  }
  

  const onOpen = (value, userName, userEmail, userContactId) => {
    if(value === "edit") {
      setName(userName)
      setEmail(userEmail)
      setContactId(userContactId)
      setIsUpdate(true)
    } 
    else setIsUpdate(false)
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {

    const getContacts = async () => {

      try {
        const contacts = collection(db, "contacts")
        // const contactsSnapshot = await getDocs(contacts)

        onSnapshot(contacts, (snapshot) => {

          const contactList = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
          setcontacts(contactList)

        })

      } catch (error) {

      }

    }

    getContacts();

  }, [])

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />

        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white text-3xl absolute ml-1" />
            <input type="text" className="focus:outline-none flex-grow h-10 border bg-transparent border-white rounded-md text-white pl-9" />
          </div>
          <AiFillPlusCircle onClick={() => onOpen("add")} className="text-white text-5xl cursor-pointer" />
        </div> 
        <div className="mt-4 flex flex-col gap-4">
          {
            contacts.map((contact) => {
              return <div key={contact.id} className="bg-yellow flex justify-between items-center p-2 rounded-lg ">
                <div className="flex gap-2 items-center">
                <HiOutlineUserCircle className="text-orange text-3xl" />
                <div className="font-bold">
                  <h1 className="text-medium">{contact.name}</h1>
                  <p className="text-sm">{contact.email}</p>
                </div>
                </div>
                <div className="flex text-3xl">
                  <RiEditCircleLine className="cursor-pointer"  onClick={() => onOpen("edit", contact.name, contact.email, contact.id)} />
                  <IoMdTrash onClick={() => deleteContact(contact.id)} className="text-orange" />
                </div>
              </div>
            })
          }
        </div>
        {contacts.length == 0 && 
        <div className="flex gap-2 justify-center items-center text-white">
          <div>
            <img className="h-[50px]" src={logo} alt="" />
          </div>
          <h1>Contacts not found</h1>
          </div>}
      </div>
      <ToastContainer position="bottom-center" />
      <AddAndUpdateContact isOpen={isOpen} isUpdate = {isUpdate} username = {isUpdate ? name : ""} useremail = {isUpdate ? email : ""} userContactId = {isUpdate ? id : ""} onClose={onClose} />
    </>
  )
}

export default App
