import { resource_type } from './outpost_mapping';

type OutpostResourceEntry = {
    id: number,
    subtype?: number
};

/**
 * Sort outpost resource summary rows using the same custom ordering as the
 * existing average-cost list, with subtype as the tie-breaker.
 */
export const compareOutpostResourceEntries = (a: OutpostResourceEntry, b: OutpostResourceEntry) => {
    const order_difference = resource_type[a.id].custom_order - resource_type[b.id].custom_order;
    if (order_difference !== 0) {
        return order_difference;
    }

    const subtype_difference = (a.subtype ?? -1) - (b.subtype ?? -1);
    if (subtype_difference !== 0) {
        return subtype_difference;
    }

    return a.id - b.id;
};
