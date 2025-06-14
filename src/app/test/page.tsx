import { notFound } from "next/navigation";
import EnvManager from "@/lib/EnvManager";

export default function TestPage() {
    // 本番環境では、このページは表示されない
    if (EnvManager.isProductEnv()) {
        notFound();
    }
    return (
        <>
            <h1>This is test page.</h1>
        </>
    )
}