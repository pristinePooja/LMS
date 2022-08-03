import { IsActiveMatchOptions } from '@angular/router';

export interface PristineNavigationItem
{
    id?: string;
    title?: string;
    subtitle?: string;
    type:
        | 'aside'
        | 'basic'
        | 'collapsable'
        | 'divider'
        | 'group'
        | 'spacer';
    hidden?: (item: PristineNavigationItem) => boolean;
    active?: boolean;
    disabled?: boolean;
    tooltip?: string;
    link?: string;
    externalLink?: boolean;
    target?:
        | '_blank'
        | '_self'
        | '_parent'
        | '_top'
        | string;
    exactMatch?: boolean;
    url?:string;
    isActiveMatchOptions?: IsActiveMatchOptions;
    function?: (item: PristineNavigationItem) => void;
    classes?: {
        title?: string;
        subtitle?: string;
        icon?: string;
        wrapper?: string;
    };
    icon?: string;
    badge?: {
        title?: string;
        classes?: string;
    };
    children?: PristineNavigationItem[];
    meta?: any;
}

export type PristineVerticalNavigationAppearance =
    | 'default'
    | 'compact'
    | 'dense'
    | 'thin';

export type PristineVerticalNavigationMode =
    | 'over'
    | 'side';

export type PristineVerticalNavigationPosition =
    | 'left'
    | 'right';
