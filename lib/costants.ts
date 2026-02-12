export enum EnvName {
    DEV = 'dev'
}

export interface EnvConfig {
    account: string
    region: string
    connection: string
}


export const envConfig: Record<EnvName, EnvConfig> = {
    [EnvName.DEV]: {
        account: '698719916932',
        region: 'us-west-2',
        connection: 'arn:aws:codeconnections:us-west-2:698719916932:connection/a054cc90-7e5e-4839-a763-a0dd331f4198'
    }
}
