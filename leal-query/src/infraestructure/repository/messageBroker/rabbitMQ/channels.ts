import { Queues } from './queues';

const channels = [
  { name: 'client', type: 'CONSUMER', handleName: 'add_points', queue: Queues.add_points },
  { name: 'client', type: 'CONSUMER', handleName: 'exchange', queue: Queues.exchange },
  { name: 'client', type: 'PROVIDER', queue: Queues.exchange },
  { name: 'client', type: 'PROVIDER', queue: Queues.exchange_fail },
  { name: 'client', type: 'PROVIDER', queue: Queues.exchange_success },
];

export default channels;
