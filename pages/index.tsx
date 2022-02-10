import { Htag, Button, P, Tag, Rating } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Hello world</Htag>
      <Button appearance='primary'>Primary</Button>
      <Button appearance='ghost' arrow='right'>Ghost</Button>

      <div>
        <P size='s'>small</P>
        <P size='m'>medium</P>
        <P size='l'>large</P>
      </div>

      <div>
        <Tag size='s' color='red'>Some tag</Tag>
        <Tag size='m' color='gray'>Some tag</Tag>
        <Tag size='m' color='primary'>Some tag</Tag>
        <Tag size='s' color='ghost' href='#'>Some tag</Tag>
      </div>

      <div>
        <Rating rating={4} />
      </div>
    </div>
  );
}
