
export type ItemHeader = {
	key: string;
	value: string;
	active: boolean;
};

export const headersDefault: ItemHeader[] = [
  { active: true, key: 'Accept', value: '*/*' },
  { active: true, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
  { active: true, key: 'User-Agent', value: 'Tsuki' }
];

export default function Headers() {
  return (
    <div>
    <h2>Heades</h2>
    <p>Add or edit your headers for the request</p>
</div>
  )
}
