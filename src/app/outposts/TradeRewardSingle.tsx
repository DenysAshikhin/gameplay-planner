import mathHelper from '../util/math';
import { resource_type } from './outpost_mapping';

import Image from 'next/image'

const formatTradeValue = (value) => {
    const amount = mathHelper.createDecimal(value);
    return amount.greaterThan(1e4) ? amount.toExponential(2) : mathHelper.round(amount).toString();
};

/**
 * Displays a grouped outpost trade average reward for a single resource.
 */
export default function TradeRewardSingle({ deal, borderBottom }) {
    const reward_item = resource_type[deal.id];
    const reward_label = deal.subtype ? reward_item.subtypes[deal.subtype].label : reward_item.label;
    const reward_img = deal.subtype ? reward_item.subtypes[deal.subtype].img : reward_item.img;
    const reward_display = formatTradeValue(deal.reward);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '44px',
            width: '276px',
            backgroundColor: 'rgba(255,255,255, 0.07)',
            borderTop: '1px solid white',
            borderLeft: '1px solid white',
            borderRight: '1px solid white',
            borderBottom: borderBottom ? '1px solid white' : '',
            paddingRight: '8px'
        }}>
            <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
                <Image
                    alt={`in game representation of ${reward_label}`}
                    fill
                    src={reward_img}
                    unoptimized={true}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px', width: '100%' }}>
                <div>
                    {reward_label}
                </div>
                <div>
                    {reward_display}
                </div>
            </div>
        </div>
    )
}
