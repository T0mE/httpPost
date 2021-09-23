import { IClient } from './client';
import { Label } from './label';

export interface Order {
  id: number;
  label: Label;
  client: IClient;
  number: number;
  klasad: number;
  scheduler: number;
  spec: number;
}
