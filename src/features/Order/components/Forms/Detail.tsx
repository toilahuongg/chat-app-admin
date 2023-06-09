import { Textarea } from '@material-tailwind/react';
import Card from '@src/components/Card';
import { useOrderStore } from '../../store';

const DetailOrder = () => {
  const { order, setDetail } = useOrderStore((state) => state);
  return (
    <Card>
      <Card.Section title="Thông tin">
        <Textarea label="Chú thích" rows={5} value={order.detail} onChange={(e) => setDetail(e.currentTarget.value)} />
      </Card.Section>
    </Card>
  );
};

export default DetailOrder;
