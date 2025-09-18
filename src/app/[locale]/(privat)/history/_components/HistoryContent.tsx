import HistoryList from './HistoryList';

type RequestRecord = {
  id: string;
  method: string;
  url: string;
  statusCode: number | null;
  latency: number | null;
  requestSize: number | null;
  responseSize: number | null;
  errorDetails: string | null;
  requestTimestamp: string;
};

export default async function HistoryContent({ requests }: { requests: RequestRecord[] }) {
  return <HistoryList requests={requests} />;
}
