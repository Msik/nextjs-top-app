import { withLayout } from '../layout/Layout';
import { Htag } from '../components/Htag/Htag';

export function Error404(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Страница не найдена</Htag>
    </div>
  );
}

export default withLayout(Error404);
