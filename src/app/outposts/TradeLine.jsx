

import mathHelper from '../util/math.js';
import { resource_type } from './outpost_mapping.js';

import Image from 'next/image'
import rightArrow from '@images/icons/right_arrow_white.svg';


export default function Outposts({ deal, borderBottom }) {
    try {

        const cost_item = resource_type[deal.CostResourceID];
        const cost_label = cost_item.label;
        const cost_img = deal.CostResourceIDSub ? cost_item.subtypes[deal.CostResourceIDSub].img : cost_item.img;
        const cost_amount = mathHelper.createDecimal(deal.CostValue);
        const cost_display = cost_amount.greaterThan(1e4) ? cost_amount.toExponential(2) : mathHelper.round(cost_amount).toString();

        const reward_item = resource_type[deal.BoughtResourceID];
        const reward_label = reward_item.label;
        const reward_img = deal.BoughtResourceIDSub ? reward_item.subtypes[deal.BoughtResourceIDSub].img : reward_item.img;
        const reward_amount = mathHelper.createDecimal(deal.BoughtValue);
        const reward_display = reward_amount.greaterThan(1e4) ? reward_amount.toExponential(2) : mathHelper.round(reward_amount).toString();
    }
    catch (err) {
        const cost_item = resource_type[deal.CostResourceID];
        const cost_label = cost_item.label;
        const cost_img = deal.CostResourceIDSub ? cost_item.subtypes.CostResourceIDSub.img : cost_item.img;
        const cost_amount = mathHelper.createDecimal(deal.CostValue);
        const cost_display = cost_amount.greaterThan(1e4) ? cost_amount.toExponential(2) : mathHelper.round(cost_amount).toString();

        const reward_item = resource_type[deal.BoughtResourceID];
        const reward_label = reward_item.label;
        let tempy = reward_item.subtypes;
        const cost_img2 = deal.BoughtResourceIDSub ? reward_item.subtypes[deal.BoughtResourceIDSub] : reward_item.img;

        console.log(err);
    }

    const cost_item = resource_type[deal.CostResourceID];
    const cost_label = deal.CostResourceIDSub ? cost_item.subtypes[deal.CostResourceIDSub].label : cost_item.label;
    const cost_img = deal.CostResourceIDSub ? cost_item.subtypes[deal.CostResourceIDSub].img : cost_item.img;
    const cost_amount = mathHelper.createDecimal(deal.CostValue);
    const cost_display = cost_amount.greaterThan(1e4) ? cost_amount.toExponential(2) : mathHelper.round(cost_amount).toString();

    const reward_item = resource_type[deal.BoughtResourceID];
    const reward_label = deal.BoughtResourceIDSub ? reward_item.subtypes[deal.BoughtResourceIDSub].label : reward_item.label;
    const reward_img = deal.BoughtResourceIDSub ? reward_item.subtypes[deal.BoughtResourceIDSub].img : reward_item.img;
    const reward_amount = mathHelper.createDecimal(deal.BoughtValue);
    const reward_display = reward_amount.greaterThan(1e4) ? reward_amount.toExponential(2) : mathHelper.round(reward_amount).toString();

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

            {/* Cost side */}
            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                <Image
                    alt='on hover I in a cirlce icon, shows more information on hover'
                    fill
                    src={cost_img}
                    unoptimized={true}
                />
                <div style={{ position: 'absolute', left: '44px', top: '0px', width: '64px' }}>
                    {cost_label}
                </div>
                <div style={{ position: 'absolute', left: '44px', bottom: '0px', width: '64px' }}>
                    {cost_display}
                </div>
            </div>

            <div style={{ height: '32px', width: '32px', position: 'relative', margin: '0 0 0 72px' }}>
                <Image
                    alt='arrow point to the left'
                    src={rightArrow}
                    fill
                    unoptimized
                />
            </div>


            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                <Image
                    alt='on hover I in a cirlce icon, shows more information on hover'
                    fill
                    src={reward_img}
                    unoptimized={true}
                />
                <div style={{ position: 'absolute', left: '44px', top: '0px', width: '64px' }}>
                    {reward_label}
                </div>
                <div style={{ position: 'absolute', left: '44px', bottom: '0px', width: '64px' }}>
                    {reward_display}
                </div>
            </div>
        </div>
    )
}