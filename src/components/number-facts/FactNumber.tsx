const gradients: Record<string, string> = {
  '0': 'linear-gradient(to top, #0077ff 0%, #3399ff 25%, #66bbff 50%, #3399ff 75%, #0077ff 100%)', // bright metallic blue
  '1': 'linear-gradient(180deg, #fff500 0%, #ffd800 40%, #ffeb3b 60%, #fff176 80%, #fffa8b 100%)', // bright gold yellow
  '2': 'linear-gradient(180deg, #00ffd5 0%, #00e6b8 40%, #00cca0 60%, #00b38a 80%, #009973 100%)', // vivid teal/aqua
  '3': 'linear-gradient(180deg, #33ff33 0%, #55ff55 40%, #77ff77 60%, #99ff99 80%, #bbffbb 100%)', // neon bright green
  '4': 'linear-gradient(180deg, #ff66bb 0%, #ff85c1 40%, #ff9aca 60%, #ffadd0 80%, #ffc1d7 100%)', // hot pink neon
  '5': 'linear-gradient(180deg, #a366ff 0%, #b37aff 40%, #c08eff 60%, #cc9eff 80%, #d9b2ff 100%)', // bright purple
  '6': 'linear-gradient(180deg, #ff8b6f 0%, #ff9b83 40%, #ffaa97 60%, #ffbaa8 80%, #ffcabd 100%)', // fiery coral
  '7': 'linear-gradient(180deg, red 0%, orange 20%, yellow 40%, green 60%, blue 80%, violet 100%)', // full rainbow
  '8': 'linear-gradient(180deg, #fff933 0%, #f9ff66 40%, #e9ff8a 60%, #dbffb1 80%, #d1ffc8 100%)', // bright pale gold
  '9': 'linear-gradient(180deg, #ff9900 0%, #ffb733 40%, #ffcc66 60%, #ffd999 80%, #ffe6cc 100%)', // bright orange
}



/**
 * A 3-digit number display with a bright, glowing effect and a
 * rainbow-colored gradient for each digit.
 *
 * @param number - The 3-digit number to display. If longer than 3
 *   digits, an error is thrown.
 * @returns A JSX element displaying the 3-digit number in a
 *   colorful, glowing display.
 */
export default function FactNumber({ number }: { number: string }) {
  number = number.padStart(3, '0')

  if (number.length > 3) {
    throw new Error('Number is too long')
  }

  return (
    <div className="flex text-6xl gap-0.5 leading-none font-bold text-center text-white text-shadow-black/30 text-shadow-lg" title={number}>
      {number.split('').map((digit, index) => (
        <span
          key={index}
          className={`py-4 w-14 ${index === 0 ? 'rounded-l-xl' : ''} ${index === number.length - 1 ? 'rounded-r-xl' : ''}`}
          style={{
            background: gradients[digit] ?? gradients['0'],
            boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.6), inset 0 -2px 6px rgba(0, 0, 0, 0.5)',
            overflowWrap: "break-word",
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          {digit}
        </span>
      ))}
    </div>
  )
}
