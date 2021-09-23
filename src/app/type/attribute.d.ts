export interface Attribute {
    idArt: number,
    attr: number,
    name: string,
    required: boolean,
    client: number
}

export interface AttributeFromForm {
    [key: string]: AttributeFromFormGroup
}

export interface AttributeFromFormGroup {
    [key: string]: string;
}
