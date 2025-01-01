export interface Message {
    id: number;
    content: string;
    sender: string;
    receiver: string;
    timestamp: string; // Date au format ISO
    processed: boolean;
  }
  