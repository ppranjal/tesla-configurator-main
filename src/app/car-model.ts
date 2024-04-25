export interface CarModels {
    code: string;
    description: string;
    colors: [];
}

export interface CarColors {
    code: string;
    description: string;
    price: number;
}

export interface CarConfig {
    configs: config
    towHitch: boolean;
    yoke: boolean;
}


export interface config {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;

}