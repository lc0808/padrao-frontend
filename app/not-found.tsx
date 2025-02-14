import Link from "next/link";
import { Button } from "../components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col text-center p-10">
      <h1 className="text-4xl font-bold">Oops! Página não encontrada 😕</h1>
      <p className="text-gray-500 mt-2">
        Parece que você se perdeu... ou essa página foi movida.
      </p>
      <Link href="/" className="mt-4">
        <Button>Voltar para o Início</Button>
      </Link>
    </div>
  );
}
