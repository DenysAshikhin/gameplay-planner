import Ad_Comp from '../util/ads_component';
import Contagion from './page_content';

export async function generateMetadata() {
    return {
        title: 'Contagion - Gameplay Planner',
        description: 'Contagion - Helps you plan your contagion ( grasshopper) placements in contagion feature of farming!',
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function Page() {
    return (
        <>
            <Ad_Comp/>
            <Contagion/>
        </>
    );
}
