function EmojiRank({ ranking, emoji, description }: { ranking: number, emoji: string, description: string }) {
  return (
    <li className="w-full h-screen flex items-center justify-center flex-col">
      <span className="font-bold text-[6rem] text-shadow-[3px_3px_0_white]" style={{
        WebkitTextStroke: "3px white"
      }}>{ranking}.</span>

      <div className="relative">
        <img
          src="/images/glow.min.svg"
          alt="Glow"
          className="absolute top-0 left-0 -z-10"
          style={{
            animation: "glow 3s ease-in-out infinite"
          }}
        />
        <h2
          className="text-[14rem]"
        >
          {emoji}
        </h2>
      </div>

    </li>
  )
}

export default function MostPopularEmojis() {
  return (
    <main className="mx-auto">
      <ol className="!list-none text-xl space-y-2">
        <EmojiRank ranking={10} emoji="👍" description="Thumbs up" />
        <EmojiRank ranking={9} emoji="👍" description="Thumbs up" />
      </ol>
    </main>
  );
}
