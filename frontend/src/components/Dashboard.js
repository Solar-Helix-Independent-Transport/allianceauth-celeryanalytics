import React from "react";
import { QueuedTasks } from "./QueuedTasks"
import { ActiveTasks } from "./DashActive"
import { WorkerStatus } from "./DashStatus";
import { ScheduledTasks } from "./ScheduledTasks";

export const Dashboard = () => {
  return <>
    <h2 className="text-center">Celery Status</h2>
    <WorkerStatus/>
    <h2 className="text-center">Active Tasks</h2>
    <ActiveTasks/>
    <h2 className="text-center">Future Tasks</h2>
    <ScheduledTasks/>
    <h2 className="text-center">Queue Backlog</h2>
    <QueuedTasks/>

  </>
};
