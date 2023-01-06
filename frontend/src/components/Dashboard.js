import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { QueuedTasks } from "./QueuedTasks";
import { ActiveTasks } from "./DashActive";
import { WorkerStatus } from "./DashStatus";
import { ScheduledTasks } from "./ScheduledTasks";
import NavToggle from "./NavToggle";

export const Dashboard = () => {
  const [workers, setWorkers] = useState(true);
  const [active, setActive] = useState(true);
  const [future, setFuture] = useState(true);
  const [queue, setQueue] = useState(true);

  return (
    <div>
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Celery Stats</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavToggle
              active={workers}
              setActive={setWorkers}
              text={"Workers"}
            />
            <NavToggle
              active={active}
              setActive={setActive}
              text={"Active Tasks"}
            />
            <NavToggle
              active={future}
              setActive={setFuture}
              text={"Future Tasks"}
            />
            <NavToggle
              active={queue}
              setActive={setQueue}
              text={"Queue Backlog"}
            />
          </Nav>
        </Navbar>

      </div>
      {workers && (
        <div>
          <h2 className="text-center">Workers</h2>
          <WorkerStatus />
        </div>
      )}
      {active && (
        <div>
          <h2 className="text-center">Active Tasks</h2>
          <ActiveTasks />
        </div>
      )}
      {future && (
        <div>
          <h2 className="text-center">Future Tasks</h2>
          <ScheduledTasks />
        </div>
      )}
      {queue && (
        <div>
          <h2 className="text-center">Queue Backlog</h2>
          <QueuedTasks />
        </div>
      )}
    </div>
  );
};
