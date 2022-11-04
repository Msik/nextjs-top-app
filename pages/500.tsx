import { withLayout } from '../layout/Layout';
import { Htag } from '../components/Htag/Htag';

function Error500(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Ошибка 500</Htag>
    </div>
  );
}

export default withLayout(Error500);
