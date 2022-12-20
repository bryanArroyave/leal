import { Queues } from './queues';

const channels = [
  { name: 'client', type: 'CONSUMER', handleName: 'exchange_fail', queue: Queues.exchange_fail },
  { name: 'client', type: 'CONSUMER', handleName: 'exchange_success', queue: Queues.exchange_success },
  { name: 'client', type: 'PROVIDER', queue: Queues.config_outdated },
  { name: 'client', type: 'PROVIDER', queue: Queues.exchange },
];

export default channels;
