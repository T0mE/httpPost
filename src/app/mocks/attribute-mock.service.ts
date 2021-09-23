import { Injectable } from "@angular/core";
import { Attribute } from "../type/attribute";

@Injectable({
    providedIn: 'root'
})
export class AttributeMockService {

    constructor() { }
    attribute: Attribute[] = [
        {
            idArt: 1,
            attr: 1,
            name: 'name',
            required: true,
            client: 1
        },
        {
            idArt: 2,
            attr: 2,
            name: 'surname',
            required: true,
            client: 3
        }
    ]

    attr = (id: string): Promise<Attribute[]> => {
        return Promise.resolve(this.attribute);
    }

}