import { Htag, Button, P } from '../components';

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
    </div>
  );
}
