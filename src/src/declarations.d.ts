import 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number | undefined;
    }
}

declare module 'leaflet' {
    export * from 'leaflet';
}