import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DataPrivPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Data Privacy Page</h1>
        <Button onClick={() => navigate('/')}>Home </Button>
      </div>
    </>
  );
};

export default DataPrivPage;
