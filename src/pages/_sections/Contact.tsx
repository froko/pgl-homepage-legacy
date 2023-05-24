import { useState } from 'preact/hooks';
import Button from 'src/components/button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
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

    const url = 'https://pgl-api.vercel.app/api/contact';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(formData)
    };

    fetch(url, requestOptions).then(() => setThankYou(true));
  };

  const formStyle =
    'w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none';

  return (
    <section id="contact" className="bg-slate-300">
      <div className="container">
        <article>
          <h1>Kontakt</h1>
          <p>
            Nutze das untenstehende Formular um direkt mit uns in Kontakt zu treten. Gerne darfst du uns auch eine
            E-Mail an <a href="mailto:info@pgl.ch">info@pgl.ch</a> senden.
          </p>
          <form className="-mx-2 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="mb-2 w-full px-2 md:w-1/2">
                <label htmlFor="name">Name*</label>
                <input id="name" name="name" type="text" required className={formStyle} onChange={handleChange} />
              </div>
              <div className="mb-2 w-full px-2 md:w-1/2">
                <label htmlFor="email">Email*</label>
                <input id="email" name="email" type="text" required className={formStyle} onChange={handleChange} />
              </div>
              <div className="mb-2 w-full px-2">
                <label htmlFor="message">Nachricht*</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mt-4 ml-2">
                {thankYou ? (
                  <span>Vielen Dank für deine Nachricht!</span>
                ) : (
                  <Button type="submit" loading={loading}>
                    Senden
                  </Button>
                )}
              </div>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
};

export default Contact;
