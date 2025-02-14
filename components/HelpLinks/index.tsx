import Link from "next/link";

const HelpLinks: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 items-end p-6">
      <Link
        href="/help"
        className="text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 "
      >
        AJUDA
      </Link>
      <Link
        href={"/refunds"}
        className="text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2"
      >
        REEMBOLSOS
      </Link>
      <Link
        href={"/shipping"}
        className="text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2"
      >
        ENTREGAS E FRETE
      </Link>
      <Link
        href={"returns"}
        className="text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2"
      >
        TROCAS E DEVOLUÇÕES
      </Link>
    </div>
  );
};

export default HelpLinks;
