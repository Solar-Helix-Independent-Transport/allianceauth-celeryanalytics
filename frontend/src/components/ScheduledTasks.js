import React from "react";
import { Panel } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadETAs } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import StatusLabel from "./StatusLabel";
export const ScheduledTasks = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["celery", "eta"],
    queryFn: () => loadETAs(),
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

  if (isLoading) return <StatusLabel time={"30"} isFetching={isLoading} {...{error }} />;

  return (
    <ErrorBoundary>
      <StatusLabel time={"30"} {...{ isFetching, error }} />
      <div className="flex-container">
        {Object.keys(data).map((key) => {
          return (
            <>
              <Panel style={{ width: "400px", margin: "5px" }}>
                <Panel.Heading>
                  <h4 className="text-center">{key}</h4>
                </Panel.Heading>
                <Panel.Body>
                  {Object.keys(data[key]).map((prio) => {
                    return (
                      <>
                        <h4 className="text-center">Priority {prio}</h4>
                        {Object.keys(data[key][prio]).map((task) => {
                          return (
                            <p>
                              {task}{" "}
                              <div className="pull-right">
                                {data[key][prio][task]}
                              </div>
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
