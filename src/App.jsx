import { useState } from 'react';
import './App.css'

function App() {
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const getFile = async (e) => {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.file.files[0];

    if (!fileInput) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput);

    try {
      const response = await fetch('https://file.io/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      setLink(result.link);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
      .then(() => setCopied(true))
      .catch(err => console.error('Error copying text: ', err));
  };

  return (
    <div className='w-full h-screen bg-white flex justify-center items-center flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Simple File Sharing</h1>
      <form className='h-[200px] min-w-[320px] flex justify-center items-center flex-col gap-5 bg-gray-400 rounded-lg' onSubmit={getFile}>

        <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Upload file</label>
        <input id="picture" name='file' type="file" class="flex h-10 w-[50%s] rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />

        <button
          type='submit'
          className="bg-[#292929] text-xs border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 hover:border-[#fff] cursor-pointer transition"
        >
          Upload
        </button>
      </form>
      <div className='flex flex-col justify-center items-center'>
        {link && (
          <div className='w-[300px] flex justify-center items-center border border-black rounded-md'>
             <a className='p-3' href={link}><span className='font-bold'>{link}</span> </a>
             <button className='text-xs' onClick={copyToClipboard}>Copy Link</button>
             
          </div>
        )}
        {copied && (
              <span>Link copied!</span>
             )}
      </div>
    </div>
  )
}

export default App