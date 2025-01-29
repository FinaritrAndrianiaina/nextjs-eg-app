import container from "@/main";
import SystemEditView from "@/views/systems/system-edit";
import { notFound } from "next/navigation";

export default async function Page() {
  const systemInfo = await container.resolve("systems").getSystemInfo();
  
  if (!systemInfo) {
    notFound();
  }
  return <SystemEditView systemInfo={systemInfo} />;
}
