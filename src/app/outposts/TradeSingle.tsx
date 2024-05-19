import mathHelper from '../util/math';
import { resource_type } from './outpost_mapping';

import Image from 'next/image'
import rightArrow from '@images/icons/right_arrow_white.svg';

export default function Outposts({ deal, borderBottom }) {
    const cost_item = resource_type[deal.id];
    const cost_label = deal.subtype ? cost_item.subtypes[deal.subtype].label : cost_item.label;
    const cost_img = deal.subtype ? cost_item.subtypes[deal.subtype].img : cost_item.img;
    const cost_amount = mathHelper.createDecimal(deal.cost);
    const cost_display = cost_amount.greaterThan(1e4) ? cost_amount.toExponential(2) : mathHelper.round(cost_amount).toString();

    return (
        <div style={{
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            minHeight: '44px',
            width: '276px',
            backgroundColor: 'rgba(255,255,255, 0.07)',
            borderTop: '1px solid white',
            borderLeft: '1px solid white',
            borderRight: '1px solid white',
            borderBottom: borderBottom ? '1px solid white' : '',

        }}>
            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                <Image
                    alt='on hover I in a cirlce icon, shows more information on hover'
                    fill
                    src={cost_img}
                    unoptimized={true}
                />
                <div style={{ position: 'absolute', left: '44px', top: '0px', width: '66px' }}>
                    {cost_label}
                </div>
                <div style={{ position: 'absolute', left: '44px', bottom: '0px', width: '66px' }}>
                    {cost_display}
                </div>
            </div>
        </div>
    )
}