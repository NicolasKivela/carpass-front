export interface Organization {
    id: number,
    name: string,
    type: string,
}

export interface Organizations {
    organizations: Organization[];
}