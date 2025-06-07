import styles from './BoothCard.module.scss';
import Link from 'next/link';
import BoothHelper from "@/lib/booth";
import { Booth } from "@/types/booth";

export type BoothCardVariation = 'default' | 'small';

export default function BoothCard({ data, variation = 'default' }: { data: Booth, variation?: BoothCardVariation }) {
    const {
        name
    } = data;
    const url = BoothHelper.generateBoothUrl(data);

    if (variation === 'default') {
        return (
            <>
                <div className="container">
                    <div className={styles.title}>
                        <Link href={url}><h5 className="title-name">{name}</h5></Link>
                    </div>
                </div>
            </>
        )
    } else if (variation === 'small') {
        return (
            <>
                <div className="container">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                    </div>
                </div>
            </>
        )
    }
}