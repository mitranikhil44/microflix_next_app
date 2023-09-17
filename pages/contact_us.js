import React, { useState } from "react";

function Contact() {
    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {name, email, contact, message};
        const url = `https://microflix-next-app.vercel.app/api/postcontact`

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log("Success: ", data);
            setName("");
            setEmail("");
            setContact("");
            setMessage("");
        }).catch((error)=>{
            console.error("Error: ", error);
        })

    }

    const handleChange = (data) =>{
        if (data.target.name == "name") {
            setName(data.target.value)
        }
        else if (data.target.name == "email") {
            setEmail(data.target.value)
        }
        else if (data.target.name == "contact") {
            setContact(data.target.value)
        }
        else if (data.target.name == "message") {
            setMessage(data.target.value)
        }
    }

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [message, setMessage] = useState();
    return (
        <form onSubmit={handleSubmit} className="border rounded-lg w-full flex items-center justify-center my-12">
            <div className="shadow rounded py-12 lg:px-28 px-8">
                <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-100">Let’s chat and get a quote!</p>
                <div className="md:flex items-center mt-12">
                    <div className="md:w-72 flex flex-col">
                        <label htmlFor="name" className="text-base font-semibold leading-none text-gray-100">Name <span className="text-red-600">*</span></label>
                        <input tabIndex={0} id="name" name="name" type="name" value={name} onChange={handleChange} className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 "/>
                    </div>
                    <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label htmlFor="email" className="text-base font-semibold leading-none text-gray-100">Email Address <span className="text-red-600">*</span></label>
                        <input tabIndex={0} id="email" name="email" type="email" value={email} onChange={handleChange} className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" />
                    </div>
                </div>
                <div className="md:flex items-center mt-8">
                    <div className="md:w-72 flex flex-col">
                        <label htmlFor="contact" className="text-base font-semibold leading-none text-gray-100">Contact No. <span className="text-sm">(optional)</span></label>
                        <input tabIndex={0} id="contact" name="contact" role="input" type="text" value={contact} onChange={handleChange} className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "/>
                    </div>
                </div>
                <div>
                    <div className="w-full flex flex-col mt-8">
                        <label htmlFor='message' className="text-base font-semibold leading-none text-gray-100">Message <span className="text-red-600">*</span></label>
                        <textarea tabIndex={0} id="message" name="message" role="textbox" type="textarea" value={message} onChange={handleChange} className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" />
                    </div>
                </div>
                {/* <p className="text-xs leading-3 text-gray-600 mt-4">By clicking submit you agree to our terms of service, privacy policy and how we use data as stated</p> */}
                <div className="flex items-center justify-center w-full">
                    <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">SUBMIT</button>
                </div>
            </div>
        </form>
    );
}

export default Contact;
