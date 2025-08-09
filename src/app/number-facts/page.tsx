export default function NumberFacts() {
  return (
    <>
      <header className="mt-10">
        <h1 className="text-center ">Number Facts 0</h1>
      </header>

      <main className="mx-auto max-w-2xl mt-10">
        <section className="bg-gradient-to-b from-gray-200 to-gray-300 w-full h-36 p-5">
          <div className="flex text-6xl gap-0.5 leading-none text-white" title="Number" style={{
            fontFamily: "monospace"
          }}>
            <span className="py-5 px-2.5 rounded-l-xl" style={{
              background: `linear-gradient(180deg, 
                #FFD700 0%, 
                #FFA500 40%, 
                #FF8C00 60%, 
                #FF4500 80%, 
                #8B0000 100%)`,
              boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.6), inset 0 -2px 6px rgba(0, 0, 0, 0.5)',
            }}>0</span>
            <span className="py-5 px-2.5" style={{
              background: `linear-gradient(180deg, 
                #FFD700 0%, 
                #FFA500 40%, 
                #FF8C00 60%, 
                #FF4500 80%, 
                #8B0000 100%)`,
              boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.6), inset 0 -2px 6px rgba(0, 0, 0, 0.5)',
            }}>0</span>
            <span className="py-5 px-2.5 rounded-r-xl" style={{
              background: `linear-gradient(180deg, 
                #FFD700 0%, 
                #FFA500 40%, 
                #FF8C00 60%, 
                #FF4500 80%, 
                #8B0000 100%)`,
              boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.6), inset 0 -2px 6px rgba(0, 0, 0, 0.5)',
            }}>1</span>
          </div>
        </section>
      </main>
    </>
  )
}  