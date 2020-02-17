import { Entity, model, property } from '@loopback/repository';

@model()
export class Person extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property.array('string', {
    required: true,
    itemType: 'string',
    jsonSchema: {
      type: 'string',
      minLength: 10,
      maxLength: 10,
      // This uniqueItems will be added as part of items, which does not help.
      uniqueItems: true,
    },
  })
  mobiles1: string[];

  @property.array('string', {
    required: true,
    itemType: 'string',
    jsonSchema: {
      type: 'string',
      minLength: 10,
      maxLength: 10,
    },
    // This uniqueItems is ignored which generates wrong schema.
    uniqueItems: true,
  })
  mobiles2: string[];

  // Below syntax generates correct schema, however, during `npm run migrate` generates error.
  @property({
    type: 'array',
    required: true,
    jsonSchema: {
      items: {
        type: 'string',
        minLength: 10,
        maxLength: 10,
      },
      uniqueItems: true,
    }
  })
  mobiles3: string[];


  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
