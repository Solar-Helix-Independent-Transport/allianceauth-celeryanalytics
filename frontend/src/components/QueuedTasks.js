import React from "react";
import { Panel } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadQueue } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import StatusLabel from "./StatusLabel";

export const QueuedTasks = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["celery", "queue"],
    queryFn: () => loadQueue(),
    refetchOnWindowFocus: false,
    refetchInterval: 15000,
  });

  if (isLoading) return <StatusLabel time={"15"} isFetching={isLoading} {...{error }} />;

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
      <StatusLabel time={"15"} {...{ isFetching, error }} />
      <div className="flex-container">
        {Object.keys(data_tree).map((key) => {
          return (
            <>
              <Panel style={{ minWidth: "400px", margin: "5px" }}>
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
                              {task["name"]}{" "}
                              <div className="pull-right">{task["total"]}</div>
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
