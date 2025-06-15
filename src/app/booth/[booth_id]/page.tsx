import BoothHelper from '@/lib/booth';

type Props = {
  params: Promise<{ booth_id: string }>;
};

export default async function EachBoothPage({ params }: Props) {
  BoothHelper.load();
  const id = (await params).booth_id;
  const booth = BoothHelper.getBoothById(id);

  if (booth === null) {
    throw new Error(`Booth with id ${id} not found.`);
  }
  return <>This is each booths page in "/booth/{booth.id}".</>;
}

export async function generateStaticParams() {
  BoothHelper.load();
  const data = BoothHelper.getAllBooths();
  return data.map(eachBooth => {
    return { booth_id: eachBooth.id };
  });
}
