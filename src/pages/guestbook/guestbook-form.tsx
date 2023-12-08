import Button from '@pgl/components/button';
import { useState } from 'preact/hooks';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const GuestbookForm = (props: { reload: () => void }) => {
  const [formData, updateFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  const handleChange = (e: any) => {
    const fieldName: 'name' | 'email' | 'message' = e.target.name;
    const fieldValue = e.target.value;
    formData[fieldName] = fieldValue;
    updateFormData(formData);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = 'https://pgl-api.vercel.app/api/guestbook';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(formData)
    };

    fetch(url, requestOptions).then(() => {
      setLoading(false);
      setThankYou(true);
      props.reload();
    });
  };

  const formStyle =
    'w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none';

  return (
    <form className="w-full bg-slate-200 p-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap">
        {!thankYou && (
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="name">Name*</label>
            <input id="name" name="name" type="text" required className={formStyle} onChange={handleChange} />
          </div>
        )}
        {!thankYou && (
          <div className="mb-2 w-full px-2 md:w-1/2">
            <label htmlFor="email">Email*</label>
            <input id="email" name="email" type="text" required className={formStyle} onChange={handleChange} />
          </div>
        )}
        {!thankYou && (
          <div className="mb-2 w-full px-2">
            <label htmlFor="message">Nachricht*</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className={formStyle}
              onChange={handleChange}
            ></textarea>
          </div>
        )}
        {thankYou ? (
          <span>Vielen Dank für deine Nachricht!</span>
        ) : (
          <div className="ml-2 mt-4">
            <Button type="submit" loading={loading}>
              Senden
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
