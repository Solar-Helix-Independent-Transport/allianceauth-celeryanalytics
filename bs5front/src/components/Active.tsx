import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

type TaskProp = {
  name?: string;
  args?: number;
  kwargs?: number;
};

type ActiveCardProps = {
  title?: string;
  queues?: Array<TaskProp>;
};

function ActiveCard({ title, queues }: ActiveCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="m-3" >
      <Card.Header className="bg-Primary">{title} </Card.Header>
      <Card.Body>
        <Button className="w-100" size="sm" onClick={() => setOpen(!open)}>Show Details</Button>
        {/* <Card.Text className="small"> */}
        {queues?.map((task: TaskProp) => {
          return (
            <ListGroup.Item>
              <div className="d-flex flex-column align-items-center">
                <span className="text-start">{task.name} </span>
               

                <Collapse in={open}>
                  <div id="example-collapse-text text-start">
                    <p className="m-0 ms-1">Args: {task.args}</p>
                    <p className="m-0 ms-1">Kwargs: {task.kwargs}</p>
                  </div>
                </Collapse>

                {/* <span className="text-end ms-3">{task.total}</span> */}
              </div>
            </ListGroup.Item>
          );
        })}
        {/* </Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default ActiveCard;
