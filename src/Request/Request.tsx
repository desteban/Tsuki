import styles from './Styles.module.css';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { ChangeEvent, FormEvent, useState } from 'react';

type TypeHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export default function Request() {
  const [method, setMethod] = useState<TypeHttp>('GET');
  const [url, setUrl] = useState<string>('');

  const ChangeMethod = (evt: ChangeEvent<HTMLSelectElement>) => {
    setMethod(evt.target.value as TypeHttp);
  };

  const ChangeUrl = (evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  };

  const Send = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <main>
      <form
        className={styles.form}
        onSubmit={Send}
      >
        <div className={styles.flex}>
          <select
            name="method"
            id="method"
            value={method}
            onChange={ChangeMethod}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            {/* <option value="HEAD">HEAD</option> */}
            {/* <option value="OPTIONS">OPTIOONS</option>           */}
          </select>

          <Input
            placeholder="http://localhost:8000"
            value={url}
            onChange={ChangeUrl}
          />
        </div>

        <Button className={styles['btn-send']}>Send</Button>
      </form>

      <section>
        {JSON.stringify(
          {
            method,
            url,
          },
          null,
          2,
        )}
      </section>
    </main>
  );
}
