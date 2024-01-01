import {ItemModes, TransportItem} from "./index";

export interface Line extends TransportItem {
    type: 'line', // required
    id: string,
    name: string,
    mode: ItemModes,
    subMode?: ItemModes,
    color?: string;
    routes?: string[],
    operator?: string,
}
