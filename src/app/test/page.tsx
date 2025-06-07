import { notFound } from "next/navigation";
import ProductOrDevEnv from "@/lib/ProductOrDevEnv";

export default function TestPage() {
    // 本番環境では、このページは表示されない
    if (ProductOrDevEnv.isProductEnv()) {
        notFound();
    }
    return (
        <>
            <h1>This is test page.</h1>
        </>
    )
}