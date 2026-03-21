import mathHelper from '../util/math';
import { resource_type } from './outpost_mapping';

import Image from 'next/image'

const formatTradeValue = (value) => {
    const amount = mathHelper.createDecimal(value);
    return amount.greaterThan(1e4) ? amount.toExponential(2) : mathHelper.round(amount).toString();
};

/**
 * Displays a grouped outpost trade cost range for a single resource.
 */
export default function TradeRangeSingle({ deal, borderBottom }) {
    const cost_item = resource_type[deal.id];
    const cost_label = deal.subtype ? cost_item.subtypes[deal.subtype].label : cost_item.label;
    const cost_img = deal.subtype ? cost_item.subtypes[deal.subtype].img : cost_item.img;
    const min_cost = mathHelper.createDecimal(deal.minCost);
    const max_cost = mathHelper.createDecimal(deal.maxCost);
    const range_display = min_cost.equals(max_cost)
        ? formatTradeValue(min_cost)
        : `${formatTradeValue(min_cost)} - ${formatTradeValue(max_cost)}`;

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
                    alt={`in game representation of ${cost_label}`}
                    fill
                    src={cost_img}
                    unoptimized={true}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px', width: '100%' }}>
                <div>
                    {cost_label}
                </div>
                <div>
                    {range_display}
                </div>
            </div>
        </div>
    )
}
