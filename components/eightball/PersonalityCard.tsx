import Link from "next/link";
import { Card } from "../ui/Card";
import { PersonalityConfig } from "../../lib/config/personalities";
import { cn } from "../../lib/utils/cn";

interface PersonalityCardProps {
  personality: PersonalityConfig;
  className?: string;
}

export default function PersonalityCard({ personality, className }: PersonalityCardProps) {
  return (
    <Link
      href={`/play/${personality.linkname}`}
      className={cn(
        "block !text-white h-48 leading-normal text-center transition-all",
        personality.theme.tailwindHoverClass,
        className
      )}
      aria-label={`Choose ${personality.name} personality`}
      title={`Choose ${personality.name} personality`}
      role="link"
    >
      <Card variant="personality" padding="md" className="h-full">
        <span className="w-auto text-5xl">{personality.theme.icon}</span>
        <h2 className={cn(
          "!text-3xl font-bold",
          personality.tag && "flex items-center justify-center mt-2 mb-1 gap-2"
        )}>
          {personality.name}
          {personality.tag && (
            <mark className="!text-[0.95rem]">{personality.tag}</mark>
          )}
        </h2>
        <p>{personality.description}</p>
      </Card>
    </Link>
  );
}