import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components';
import { useState } from 'react';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(0);

  return (
    <>
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
        <Rating rating={rating} setRating={setRating} isEditable />
        <Rating rating={3} />
      </div>

      <div>
        <Input placeholder='name' />
      </div>
      <br />
      <div>
        <Textarea placeholder='text' />
      </div>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory,
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number,
}
