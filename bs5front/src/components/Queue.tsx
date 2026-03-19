import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

type TaskProp = {
  name?: string;
  total?: number;
};

type QueueProp = {
  name?: string;
  tasks?: Array<TaskProp>;
};

type QueueCardProps = {
  title?: string;
  queues?: Array<QueueProp>;
};

function QueueCard({ title, queues }: QueueCardProps) {
  return (
    <Card className="m-3" >
      <Card.Header >{title}</Card.Header>
      <Card.Body>
        {/* <Card.Text className="small"> */}
        {queues?.map((queue: QueueProp) => {
          return (
            <Card.Text>
              <h6 className="text-center">Priority {queue.name}</h6>
              <ListGroup.Item>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="text-start">Task</h6>
                  <h6 className="text-end">Count</h6>
                </div>

                {queue.tasks?.map((task: TaskProp) => {
                  return (
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-start me-3">{task.name}</span>
                      <span className="text-end ms-3">{task.total}</span>
                    </div>
                  );
                })}
              </ListGroup.Item>
            </Card.Text>
          );
        })}
        {/* </Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default QueueCard;
