import { FactOrFalseProvider } from "@/components/fact-or-false/FactOrFalseContext";
import MainGameplay from "@/components/fact-or-false/MainGameplay";

export default function FactOrFalse() {
  return (
    <>
      <FactOrFalseProvider>
        <MainGameplay />
      </FactOrFalseProvider>
    </>
  );
}