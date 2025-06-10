import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  goTo?: string;
  label?: string;
}

const BackButton = ({ goTo, label = 'Back' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (goTo) {
      navigate(goTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button onClick={handleClick} variant="ghost">
      <>
        {'<  '}
        {label}
      </>
    </Button>
  );
};

export default BackButton;
