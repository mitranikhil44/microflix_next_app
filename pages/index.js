
export default function Home() {
  return (
    <main>
      <div className='text-center'>
        <h1 className="text-2xl my-4">Coder Bugs</h1>
        <p>A blog for coder by a coder</p>

        <div className="blogs py-6 text-start">
          <h4 className="text-base font-semibold my-4">How to learn JavaScript 2023</h4>
            <p>Javascirpt is used to design logic for the web</p>
          <h4 className="text-base font-semibold my-4">How to learn Python 2023</h4>
            <p>Python is used to build programes for the software & web.</p>
          <h4 className="text-base font-semibold my-4">How to learn Next Js 2023</h4>
            <p>Javascirpt is a framework of React Js, it's used to build awesome web applications.</p>
        </div>
      </div>
    </main>
  )
}
