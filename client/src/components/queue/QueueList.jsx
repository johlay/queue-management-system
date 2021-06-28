import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../modules/config";

class QueueList extends React.Component {
  state = {
    loading: true,
    queuelist: [],
  };

  componentDidMount() {
    axios
      .get(config.API_HOST + "/queues", {
        headers: { Authorization: "Bearer " + config.getToken() },
      })
      .then((res) => {
        console.log("Got response!", res);
        if (res.data.status === "success") {
          const queues = res.data.data.queues;
          this.setState({
            loading: false,
            queuelist: queues,
          });
        }
      });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="component-Roomlist">
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="text-center">
              <h1>Queue List</h1>
              <p className="lead">Choose which school-class you belong to</p>
            </div>

            <ol className="list-group">
              {this.state.queuelist.map((queue, index) => (
                <li className="list-group-item" key={index}>
                  <Link to={"/queue/" + queue.name}>{queue.name}</Link>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    );
  }
}

export default QueueList;
