import { getThaiDate } from '../date-format';

type LogLevel = 'ERROR' | 'LOG' | 'WARN';

const COLORS: { [key in 'reset' | LogLevel]: string } = {
  reset: '\x1b[0m',
  ERROR: '\x1b[31m',
  WARN: '\x1b[33m',
  LOG: '\x1b[36m',
} as const;

const ICONS: { [key in LogLevel]: string } = {
  ERROR: '🤬',
  WARN: '🫣',
  LOG: '😁',
} as const;

export class Logger {
  constructor(private readonly tag: string) {}

  private formatMessage(level: LogLevel, ...params: unknown[]) {
    const timestamp = getThaiDate().toLocaleString('en-US', {
      dateStyle: 'medium',
      hour12: false,
      timeStyle: 'medium',
      timeZone: 'Asia/Bangkok',
    });

    const message = params
      .map((param) => {
        try {
          return typeof param === 'object' ? JSON.stringify(param, null, 0) : param;
        } catch (error) {
          return `[Unserializable Object: ${error}]`;
        }
      })
      .join(' ')
      .replace(/\n/g, '');

    return message.length > 0
      ? `${ICONS[level]} ${COLORS[level]}[${level}] [${this.tag}] ${COLORS['reset']}[${timestamp}] ${message}`
      : '\n';
  }

  error(...params: unknown[]) {
    console.error(this.formatMessage('ERROR', ...params));
  }

  log(...params: unknown[]) {
    console.error(this.formatMessage('LOG', ...params));
  }

  warn(...params: unknown[]) {
    console.warn(this.formatMessage('WARN', ...params));
  }
}
