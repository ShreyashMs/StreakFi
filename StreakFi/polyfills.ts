import { Buffer } from 'buffer';
import 'react-native-get-random-values';

(global as any).Buffer = Buffer;

(global as any).process = (global as any).process || {};
(global as any).process.env = (global as any).process.env || {};