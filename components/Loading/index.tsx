import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flew-row items-center justify-center gap-2">
      <p className="text-3xl font-medium">Carregando</p>
      <Loader className="animate-spin size-5" />
    </div>
  );
}
