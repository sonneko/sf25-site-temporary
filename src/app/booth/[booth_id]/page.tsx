import BoothHelper from '@/lib/booth';

type Props = {
    params: { booth_id: string };
};

export default function EachBoothPage({ params }: Props) {
    const helper = new BoothHelper;

    // TODO: 本番環境では、コメントアウトして本番環境用のassetsを読み込む
    helper.checkoutTestEnv();

    helper.load();
    const id = params.booth_id;
    const booth = helper.getBoothById(id);
    if (booth === null) {
        throw new Error(`Booth with id ${id} not found.`)
    }
    return (
        <>
            This is each booths page in "/booth/{booth.id}".
        </>
    )
}


export async function generateStaticParams() {
    const helper = new BoothHelper();

    // TODO: 本番環境では、コメントアウトして本番環境用のassetsを読み込む
    helper.checkoutTestEnv();
    
    helper.load();
    const data = helper.getAllBooths();
    return data.map(eachBooth => {
        return { booth_id: eachBooth.id }
    });
}