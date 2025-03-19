import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <Button onClick={() => navigate('/about')}>About</Button>
      </div>
    </>
  );
}

export default Home;
