import BoothHelper from '@/lib/booth';

// type Props = {
//     params: { booth_id: string };
// };

// TODO: ↓ビルドを通すためにanyを使っている。消すべき
export default async function EachBoothPage({ params }: any /* : Props */) {
    const helper = new BoothHelper;

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
    );
}


export async function generateStaticParams() {
    const helper = new BoothHelper();

    helper.load();
    const data = helper.getAllBooths();
    return data.map(eachBooth => {
        return { booth_id: eachBooth.id }
    });
}