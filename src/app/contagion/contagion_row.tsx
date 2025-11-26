import ContagionLine, { ContagionWeights } from '@app/contagion/contagion_line';
import SaveGameData, { ContagionData } from '@app/SaveGameData';
import { Dispatch, SetStateAction } from 'react';

interface ContagionRowProps {
    data: SaveGameData
    contagion: ContagionData & { gh_amount?: number },
    nextContagion: ContagionData & { gh_amount?: number },
    setContagionWeights: Dispatch<SetStateAction<ContagionWeights>>,
    extra_gh_id: number,
    excess_gh: number,
}

/**
 * contagionRow provides the core implementation for the contagionRow routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by contagionRow.
 */
export default function contagionRow({
                                         data,
                                         contagion,
                                         nextContagion,
                                         setContagionWeights,
                                         extra_gh_id,
                                         excess_gh,
                                     }: ContagionRowProps) {
    return (
        <div
            key={contagion.ID}
            style={{
                display: 'flex',
                // flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                minHeight: '128px',
                width: '100%',
                borderTop: '1px solid white',
                borderLeft: '1px solid white',
                borderRight: '1px solid white',
                borderBottom: '1px solid white',
                marginTop: '12px',
                boxSizing: 'border-box',
            }}
        >
            <div style={{ width: '49%', height: '100%' }}>
                <ContagionLine
                    data={data}
                    extra_gh={extra_gh_id === contagion.ID ? excess_gh : 0}
                    gh_amount={contagion.gh_amount ?? 0}
                    setContagionWeights={setContagionWeights}
                    key={contagion.ID}
                    contagion={contagion}
                />
            </div>
            <div style={{ width: '49%', height: '100%' }}>
                {!!nextContagion && (
                    <ContagionLine
                        data={data}
                        extra_gh={extra_gh_id === nextContagion.ID ? excess_gh : 0}
                        gh_amount={nextContagion.gh_amount ?? 0}
                        setContagionWeights={setContagionWeights}
                        key={nextContagion.ID}
                        contagion={nextContagion}
                    />
                )}
            </div>
        </div>);
}
