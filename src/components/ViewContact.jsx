import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../services/ContactServices";
import Spinner from "./Spinner";

function ViewContact() {
  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {}
  });

  useEffect(() => {
    const fetchSingleData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactServices.getContact(contactId);
        let groupResponse = await ContactServices.getGroupName(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    };
    fetchSingleData();
  }, []);

  let { loading, contact, errorMessage, group } = state;

  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          {/* first row */}
          <div className="row">
            <div className="col">
              <h3>View Contact</h3>
              <p className="fst-italic">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus alias animi ullam explicabo. Deleniti at, hic vel
                nam exercitationem facere repellat tempora ut provident
                distinctio blanditiis quis laborum ullam maxime?
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={contact.photo}
                      alt=""
                      className="contact-image"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name : <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile : <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email :{" "}
                        <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company :{" "}
                        <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title :{" "}
                        <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group :{" "}
                        <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                    <Link to={"/contact/list"} className="btn btn-success mt-3">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
        </>
      )}
    </>
  );
}

export default ViewContact;
