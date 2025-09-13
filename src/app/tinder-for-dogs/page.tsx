
type Dog = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export default async function Home() {
  const response = await fetch('http://localhost:3000/tinder-for-dogs/api/get-dog');
  const rawData: Dog[] = await response.json();
  const data: Dog = rawData[0];

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Tinder for Dogs</h1>

      <div className="relative h-[90vh] aspect-[9/16] rounded-xl overflow-hidden shadow-lg">
        {/* Blurred background */}
        <img
          src={data.url}
          alt="Dog background"
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
        />

        {/* Foreground image */}
        <img
          src={data.url}
          alt="Dog"
          className="absolute z-10 w-full shadow-lg m-auto top-0 bottom-0 left-0 right-0"
        />

        {/* Optional overlay text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">Dog Name</h2>
          <p className="text-md">Dog Breed</p>
          <p className="text-md">Dog Age</p>
        </div>
      </div>
    </main>
  );
}
