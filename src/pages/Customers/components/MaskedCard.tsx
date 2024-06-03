import { maskCard } from '@/utils/maskCard';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface IProps {
  cardNumber: string;
}

const MaskedCard = ({ cardNumber }: IProps) => {
  const [show, setShow] = useState(false);

  return cardNumber ? (
    <div className='d-flex flex-nowrap gap-1'>
      {show ? cardNumber : maskCard(cardNumber)}
      {show ? (
        <Eye
          role='button'
          onClick={() => {
            setShow(false);
          }}
        />
      ) : (
        <EyeOff
          role='button'
          onClick={() => {
            setShow(true);
          }}
        />
      )}
    </div>
  ) : null;
};

export default MaskedCard;
