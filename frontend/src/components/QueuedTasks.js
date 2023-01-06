import React from "react";
import { Panel, Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadQueue } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import { PanelLoader } from "./PanelLoader";
import { ErrorLoader } from "./ErrorLoader";
export const QueuedTasks = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["celery","queue"],
    () => loadQueue(),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    }
  );

  if (isLoading) return <PanelLoader />;

  if (error) return <ErrorLoader />;

  let data_tree = {};

  Object.keys(data).forEach((key) => {
    let q = key.split("\u0006\u0016");
    console.log(q);
    const prio = typeof q[1] === "undefined" ? 0 : q[1];
    if (!(q[0] in data_tree)) {
      data_tree[q[0]] = {};
    }
    data_tree[q[0]][prio] = data[key];
  });
  console.log(data_tree);
  return (
    <ErrorBoundary>
      <p className="text-center">
        {" "}
        <Label bsStyle={isFetching ? "info" : "default"}>
          Auto Refresh: {isFetching ? "Refreshing" : "Waiting (10s)"}
        </Label>
      </p>
      <div className="flex-container">
        {Object.keys(data_tree).map((key) => {
          return (
            <>
              <Panel style={{ width: "400px", margin: "5px" }}>
                <Panel.Heading>
                  <h4 className="text-center">{key}</h4>
                </Panel.Heading>
                <Panel.Body>
                  {Object.keys(data_tree[key]).map((prio) => {
                    return (
                      <>
                        <h4 className="text-center">Priority {prio}</h4>
                        {data_tree[key][prio].map((task) => {
                          return (
                            <p>
                              {task["name"]} <div className="pull-right">{task["total"]}</div>
                            </p>
                          );
                        })}
                        <hr />
                      </>
                    );
                  })}
                </Panel.Body>
              </Panel>
            </>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};
