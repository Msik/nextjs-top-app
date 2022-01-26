import { Htag, Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Hello world</Htag>
      <Button appearance='primary'>Primary</Button>
      <Button appearance='ghost' arrow='right'>Ghost</Button>
    </div>
  );
}
