import { useEffect, useState } from 'preact/hooks';
import { GuestbookForm } from './_guestbook-form';

export const GuestbookEntries = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  const getEntries = async () => {
    const response = await fetch('https://pgl-api.vercel.app/api/guestbook');
    const guestbookEntries = await response.json();
    setEntries(guestbookEntries);
  };

  useEffect(() => {
    getEntries().then(() => setLoading(false));
  }, []);

  return (
    <>
      <GuestbookForm reload={getEntries} />
      {loading ? (
        <ul>
          <li>
            <div className="mt-4 h-10 w-full animate-pulse bg-slate-200"></div>
          </li>
          <li>
            <div className="mt-4 h-10 w-full animate-pulse bg-slate-200"></div>
          </li>
          <li>
            <div className="mt-4 h-10 w-full animate-pulse bg-slate-200"></div>
          </li>
        </ul>
      ) : (
        <ul>
          {entries.map((e: any) => (
            <li key={e.id}>
              <b>{e.name}</b> schrieb am{' '}
              {new Date(e.createdAt).toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              :<br />
              <div dangerouslySetInnerHTML={{ __html: e.message.replace('\n', '<br />') }}></div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
