import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

type WorkerCardProps = {
  title?: string;
  texts?: Array<Array<string>>;
  cardVariant?:
    | "success"
    | "danger";
};

function WorkerCard({
  title,
  texts,
  cardVariant,
}: WorkerCardProps) {
  return (
    <Card 
      className="m-3" 
      border={cardVariant} 
      style={{minWidth: "350px"}}
    > 
        <Card.Header className='text-bg-success'>
          {title}
        </Card.Header>
      <Card.Body>
      <Card.Text className='small'>
        {
          texts?.map(
            (text: Array<String>) => {
              return <ListGroup.Item >
                <div className='d-flex align-items-center justify-content-between'>
                  <span className='text-start'>{text[0]}</span>
                  <span className='text-end'>{text[1]}</span>
                </div>
              </ListGroup.Item>
            }
          )
        }
      </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WorkerCard;