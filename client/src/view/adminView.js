import React from "react";

/**
 * Handles the admin view
 * @returns the admin view.
 */
const AdminView = ({
  setApplication,
  setStatus,
  updateApplication,
  state,
  content,
}) => {
  return (
    <div className="App">
      <h1>{content.admintitle}</h1>

      {state != null && state.success != null && (
        <div id="message" className={state.success ? "bg-green" : "bg-red"}>
          {state.msg}
        </div>
      )}

      <form
        onSubmit={e => {
          updateApplication(e);
        }}
      >
        <div className="form-group">
          {state && state.applications && !state.applications.error && (
            <select
              id="application"
              name="application"
              defaultValue={0}
              onChange={ev => {
                setApplication(ev);
              }}
            >
              <option key={0} disabled value={0}>
                choose application
              </option>
              {state.applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.id}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="form-group">
          {state !== null && state.applicationId && (
            <div
              className={`application-data ${
                state.applications.find(
                  app => parseInt(state.applicationId) === app.id
                ).status
              }`}
            >
              <div className="application-competence">
                <table>
                  {state.applications
                    .find(app => parseInt(state.applicationId) === app.id)
                    .competence.map(comp => {
                      return (
                        <tr>
                          <td key={comp.toString()}>{comp.competence}</td>
                          <td>{comp.duration}</td>
                        </tr>
                      );
                    })}
                </table>
                <table>
                  {state.applications
                    .find(app => parseInt(state.applicationId) === app.id)
                    .availability.map(avail => {
                      return (
                        <tr>
                          <td key={avail.toString()}>{avail.from}</td>
                          <td>{avail.to}</td>
                        </tr>
                      );
                    })}
                </table>
              </div>
              <select
                id="status"
                name="status"
                defaultValue={0}
                onChange={ev => {
                  setStatus(ev);
                }}
              >
                <option key={0} disabled value={0}>
                  choose status
                </option>
                {state.status.map(stat => (
                  <option key={stat.id} value={stat.id}>
                    {stat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="form-group">
          <button type="submit" id="send">
            {content.adminbutton}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AdminView;
